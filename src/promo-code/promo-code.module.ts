import { Module } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeController } from './promo-code.controller';
import { DbService } from '../db/db.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [PromoCodeController],
  providers: [PromoCodeService, DbService, TokenService],
})
export class PromoCodeModule {}
