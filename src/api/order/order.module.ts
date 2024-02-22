import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DbService } from '@services/db/db.service';
import { PromoCodeService } from '@api/promo-code/promo-code.service';
import { TokenService } from '@services/token/token.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, DbService, PromoCodeService, TokenService],
})
export class OrderModule {}
