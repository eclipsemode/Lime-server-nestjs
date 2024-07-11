import { PromoCodeEntity } from '../entities/promo-code.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { PromoCodeType } from '@api/promo-code/types/promo-code.type';

export class PromoCodeGetAllResDto {
  @ApiProperty({
    example: 6,
    description: 'Number of orders',
  })
  @IsInt()
  _count: number;

  @ApiProperty({
    example: [
      {
        id: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
        code: 'test',
        type: PromoCodeType.RUB,
        discount: '100',
        limit: 0,
        createdAt: new Date(),
      },
    ],
    description: 'All Promocodes',
    isArray: true,
    type: () => PromoCodeEntity,
  })
  @IsArray()
  list: PromoCodeEntity[];
}
