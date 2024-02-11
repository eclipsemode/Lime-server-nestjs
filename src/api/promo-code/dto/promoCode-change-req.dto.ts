import { PartialType } from '@nestjs/swagger';
import { PromoCodeEntity } from '../entities/promo-code.entity';

export class PromoCodeChangeReqDto extends PartialType(PromoCodeEntity) {}
