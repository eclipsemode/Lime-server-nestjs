import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from '../db/db.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService, TokenService],
  exports: [UserService],
})
export class UserModule {}
