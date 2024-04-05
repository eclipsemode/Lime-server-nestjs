import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DbService } from '@services/db/db.service';
import { PromoCodeService } from '@api/promo-code/promo-code.service';
import { TokenService } from '@services/token/token.service';
import { BranchService } from '@api/branch/branch.service';
import { UserService } from '@api/user/user.service';
import { ProductService } from '@api/product/product.service';
import { FsService } from '@services/fs/fs.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    DbService,
    PromoCodeService,
    TokenService,
    BranchService,
    UserService,
    ProductService,
    FsService,
  ],
})
export class OrderModule {}
