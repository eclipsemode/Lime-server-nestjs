import { PromoCodeEntity } from '../entities/promo-code.entity';
import { OmitType } from '@nestjs/swagger';
export class PromoCodeCreateReqDto extends OmitType(PromoCodeEntity, [
  'id',
  'createdAt',
]) {}
