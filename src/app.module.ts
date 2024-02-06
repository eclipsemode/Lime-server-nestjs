import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { CookieModule } from './cookie/cookie.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { BranchModule } from './branch/branch.module';
import { CategoryModule } from './category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FsService } from './fs/fs.service';
import { FsModule } from './fs/fs.module';
import { PromoCodeModule } from './promo-code/promo-code.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env.development',
      isGlobal: true,
    }),
    UserModule,
    TokenModule,
    AuthModule,
    CookieModule,
    LoggerModule,
    BranchModule,
    CategoryModule,
    FsModule,
    PromoCodeModule,
  ],
  providers: [LoggerService, FsService],
})
export class AppModule {}
