import { PromoCodeType } from '../types/promo-code.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class PromoCodeEntity {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "PromoCode's id",
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'test',
    description: 'Code',
  })
  @IsString()
  code: string;

  @ApiProperty({
    enum: PromoCodeType,
    example: PromoCodeType.RUB,
    description: 'PromoCode type',
  })
  @IsEnum(PromoCodeType)
  type: PromoCodeType;

  @ApiProperty({
    example: '100',
    description: 'Discount number',
  })
  @IsString()
  discount: string;

  @ApiProperty({
    example: 5,
    description: 'How much this promoCode can be used',
  })
  @IsInt()
  limit: number;

  @ApiProperty({
    readOnly: true,
    required: false,
    description: 'Date of promoCode',
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;
}
