import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from '@api/user/user.module';
import { TokenModule } from '@services/token/token.module';
import { AuthModule } from '@api/auth/auth.module';
import { CookieModule } from '@services/cookie/cookie.module';
import { LoggerModule } from '@services/logger/logger.module';
import { BranchModule } from '@api/branch/branch.module';
import { CategoryModule } from '@api/category/category.module';
import { FsModule } from '@services/fs/fs.module';
import { PromoCodeModule } from '@api/promo-code/promo-code.module';
import { ProductModule } from '@api/product/product.module';
import { DbModule } from '@services/db/db.module';
import { BonusModule } from '@api/bonus/bonus.module';
import { OrderModule } from '@api/order/order.module';
import { LoggerService } from '@services/logger/logger.service';
import { FsService } from '@services/fs/fs.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static'),
      serveRoot: '',
      renderPath: '*',
      exclude: [],
      serveStaticOptions: {},
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
    ProductModule,
    DbModule,
    BonusModule,
    OrderModule,
  ],
  providers: [LoggerService, FsService],
})
export class AppModule {}
