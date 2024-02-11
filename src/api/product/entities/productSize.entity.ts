import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductSizeEntity {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    readOnly: true,
    description: 'ProductSize id',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Product id',
    readOnly: true,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    example: '32 inch',
    description: 'ProductSize name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '300',
    description: 'ProductSize price',
  })
  @IsString()
  price: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sku: string;

  @ApiProperty({
    readOnly: true,
    example: '2024-02-02T18:31:33.721Z',
    description: 'ProductSize created date',
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;
}
