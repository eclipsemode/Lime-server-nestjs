import { OmitType, PartialType } from '@nestjs/swagger';
import { PromoCodeEntity } from '../entities/promo-code.entity';

export class PromoCodeChangeReqDto extends PartialType(
  OmitType(PromoCodeEntity, ['id', 'createdAt']),
) {}
