import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env.development',
      isGlobal: true,
    }),
    UserModule,
    TokenModule,
    AuthModule,
  ],
})
export class AppModule {}
