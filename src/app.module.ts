import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { CookieModule } from './cookie/cookie.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env.development',
      isGlobal: true,
    }),
    UserModule,
    TokenModule,
    AuthModule,
    CookieModule,
    LoggerModule,
  ],
  providers: [LoggerService],
})
export class AppModule {}
