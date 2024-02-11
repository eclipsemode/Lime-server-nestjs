import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@services/token/token.service';
import { UserService } from '@api/user/user.service';
import { DbService } from '@services/db/db.service';
import { UserModule } from '@api/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, DbService, UserService, TokenService, JwtService],
})
export class AuthModule {}
