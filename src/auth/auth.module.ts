import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbService } from '../db/db.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, DbService, UserService, TokenService, JwtService],
})
export class AuthModule {}
