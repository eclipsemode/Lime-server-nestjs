import { Module } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeController } from './promo-code.controller';
import { TokenService } from '@services/token/token.service';
import { DbService } from '@services/db/db.service';

@Module({
  controllers: [PromoCodeController],
  providers: [PromoCodeService, DbService, TokenService],
})
export class PromoCodeModule {}
