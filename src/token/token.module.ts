import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DbService } from '../db/db.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [TokenService, JwtService, DbService],
  exports: [TokenService],
})
export class TokenModule {}
