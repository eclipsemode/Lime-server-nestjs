import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UserService } from '../user/user.service';
import * as GreenSMS from 'greensms';
import { ConfirmAuthDto } from './dto/confirm-auth.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DbService,
    private readonly userService: UserService,
  ) {}

  async auth({ tel }: AuthDto) {
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
          code: response.code,
          expiresIn: new Date(Date.now() + 60000),
          isUsed: false,
        },
      });
    }

    return response.request_id;
  }

  confirm({ code, requestId }: ConfirmAuthDto) {}
}
