import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  async setToken(
    res: Response,
    key: string,
    data: string,
    maxAge: number = 24 * 60 * 60 * 1000,
  ) {
    res.cookie(key, data, {
      httpOnly: true,
      maxAge,
    });
  }

  removeToken(res: Response, key: string) {
    res.clearCookie(key);
  }
}
