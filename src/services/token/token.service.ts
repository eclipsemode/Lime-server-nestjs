import { Injectable, NotFoundException } from '@nestjs/common';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from './entities/token.entity';
import { DbService } from '@services/db/db.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbService: DbService,
  ) {}
  async generate(generateTokenDto: GenerateTokenDto) {
    const accessToken = await this.jwtService.signAsync(generateTokenDto, {
      secret: process.env.SECRET_KEY_ACCESS,
      expiresIn: '5m',
    });
    const refreshToken = await this.jwtService.signAsync(generateTokenDto, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyAccessToken(token: string): Promise<TokenEntity> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY_ACCESS,
    });
  }

  verifyRefreshToken(token: string): Promise<TokenEntity> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY_REFRESH,
    });
  }

  async saveToken(userId: string, refreshToken: string) {
    const foundToken = await this.dbService.token.findUnique({
      where: {
        userId,
      },
    });

    if (foundToken) {
      return this.dbService.token.update({
        where: {
          userId,
        },
        data: {
          refreshToken,
        },
      });
    }

    return this.dbService.token.create({
      data: {
        userId,
        refreshToken,
      },
    });
  }

  async removeToken(userId: string, refreshToken: string) {
    const foundToken = await this.dbService.token.findUnique({
      where: {
        refreshToken,
      },
    });

    if (!foundToken) {
      throw new NotFoundException({
        type: 'removeToken',
        description: "Can't remove token, because it doesn't exists",
      });
    }

    return this.dbService.token.delete({
      where: {
        refreshToken,
        userId,
      },
    });
  }
}