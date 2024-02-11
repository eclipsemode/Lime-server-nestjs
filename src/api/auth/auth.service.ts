import {
  BadRequestException,
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as GreenSMS from 'greensms';
import { ConfirmAuthReqDto } from './dto/confirm-auth-req.dto';
import { AuthReqDto } from './dto/auth-req.dto';
import { PrismaClient } from '@prisma/client';
import { LogoutReqDto } from './dto/logout-req.dto';
import { Request } from 'express';
import { DbService } from '@services/db/db.service';
import { UserService } from '@api/user/user.service';
import { TokenService } from '@services/token/token.service';
import { TokenEntity } from '@services/token/entities/token.entity';
import { UserRole } from '@api/user/types/user.type';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DbService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async auth({ tel }: AuthReqDto) {
    let candidate = await this.userService.findUserByPhone(tel);

    if (!candidate) {
      candidate = await this.userService.createUserWithTel(tel);
    }

    // @ts-ignore
    const client = new GreenSMS({
      user: process.env.SMS_SERVICE_LOGIN,
      pass: process.env.SMS_SERVICE_PASSWORD,
    });

    const callVerificationParams = {
      to: candidate.tel,
      language: 'ru',
      tag: 'aaeb96d6-cb0e-46f2-8d09-2cd5c9ea421c',
    };

    const response = await client.call.send(callVerificationParams);

    let confirmation = await this.dbService.confirmation.findFirst({
      where: {
        userId: candidate.id,
      },
    });

    if (!confirmation) {
      confirmation = await this.dbService.confirmation.create({
        data: {
          requestId: response.request_id,
          code: Number(response.code),
          expiresIn: new Date(Date.now() + 60000),
          userId: candidate.id,
        },
      });
    } else {
      confirmation = await this.dbService.confirmation.update({
        where: {
          id: confirmation.id,
        },
        data: {
          requestId: response.request_id,
          code: Number(response.code),
          expiresIn: new Date(Date.now() + 60000),
          isUsed: false,
        },
      });
    }

    return response.request_id;
  }

  async confirm({ code, requestId }: ConfirmAuthReqDto) {
    const foundConfirmation = await this.dbService.confirmation.findUnique({
      where: {
        requestId,
      },
    });

    if (!foundConfirmation) {
      throw new NotFoundException({
        type: 'Confirm',
        description: 'Cannot find confirmation.',
      });
    }

    if (foundConfirmation.isUsed) {
      throw new ForbiddenException({
        type: 'Confirm',
        description: 'The code is already used.',
      });
    }

    if (code !== foundConfirmation.code) {
      throw new BadRequestException({
        type: 'Confirm',
        description: 'Incorrect code.',
      });
    }

    if (Date.now() > foundConfirmation.expiresIn.getTime()) {
      throw new GoneException({
        type: 'Confirm',
        description: 'PromoCode has been expired.',
      });
    }

    await this.dbService.confirmation.update({
      where: {
        requestId,
      },
      data: {
        isUsed: true,
      },
    });

    const foundUser = await this.dbService.user.findUnique({
      where: {
        id: foundConfirmation.userId,
      },
    });

    if (!foundUser) {
      throw new NotFoundException({
        type: 'Confirm',
        description: 'Cannot find user.',
      });
    }

    if (!foundUser.isActivated) {
      await this.dbService.user.update({
        where: {
          id: foundConfirmation.userId,
        },
        data: {
          isActivated: true,
        },
      });
    }

    const userDto = new TokenEntity({
      ...foundUser,
      role: foundUser.role as UserRole,
    });
    const confirmDto = await this.tokenService.generate({ ...userDto });

    await this.tokenService.saveToken(foundUser.id, confirmDto.refreshToken);

    return confirmDto;
  }

  async logout({ userId, refreshToken }: LogoutReqDto) {
    return this.tokenService.removeToken(userId, refreshToken);
  }

  async refresh(request: Request) {
    const refreshToken: string = await request.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException({
        type: 'Refresh',
        description: 'Refresh token error.',
      });
    }

    const validatedTokensData =
      await this.tokenService.verifyRefreshToken(refreshToken);

    const foundToken = await this.dbService.token.findUnique({
      where: {
        refreshToken,
      },
    });

    if (!foundToken || !validatedTokensData) {
      throw new UnauthorizedException({
        type: 'Refresh',
        description: 'Authorization problem.',
      });
    }

    const foundUser = await this.dbService.user.findUnique({
      where: {
        id: validatedTokensData.id,
      },
    });

    const userDto = new TokenEntity({
      ...foundUser,
      role: foundUser.role as UserRole,
    });

    const newTokens = await this.tokenService.generate({ ...userDto });

    await this.tokenService.saveToken(userDto.id, newTokens.refreshToken);

    return newTokens;
  }
}
