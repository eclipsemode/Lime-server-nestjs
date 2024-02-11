import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from '@services/db/db.service';
import { TokenService } from '@services/token/token.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService, TokenService],
  exports: [UserService],
})
export class UserModule {}
