import { ProductEntity } from '@api/product/entities/product.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OrderProductEntity extends OmitType(ProductEntity, [
  'orderIndex',
  'productSize',
  'description',
  'name',
  'isPizza',
]) {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Order id',
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: '300',
    description: 'Product price',
  })
  @IsString()
  price: string;

  @ApiProperty({
    example: 'test.jpg',
    description: 'image of product',
    required: false,
  })
  image?: string;

  @ApiProperty({ example: '121241154', description: 'SKU', required: false })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({
    example: '5',
    description: 'Amount of order product',
  })
  @IsString()
  amount: string;

  @ApiProperty({
    example: '32 inch',
    description: 'Product size in string',
  })
  @IsString()
  productSize: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    readOnly: true,
    description: 'Order id',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    readOnly: true,
    description: 'Product id',
  })
  @IsString()
  productId?: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Category id',
    required: false,
  })
  @IsString()
  @IsOptional()
  categoryId: string;
}
