import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductSizeEntity } from './productSize.entity';
import { Transform } from 'class-transformer';

export class ProductEntity {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Product id',
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: false,
    description: 'Is pizza product?',
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true';
  })
  isPizza: boolean;

  @ApiProperty({
    isArray: true,
    type: () => ProductSizeEntity,
    description: 'Product sizes if exists',
    example: [
      {
        id: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
        name: '32 inch',
        price: '300',
        sku: 'string',
      },
    ],
  })
  @IsArray()
  productSize: ProductSizeEntity[];

  @ApiProperty({ example: 'Filadelfiya', description: 'Name of product' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 5,
    description: 'Rating of product',
    required: false,
  })
  @IsInt()
  @IsOptional()
  rating: number;

  @ApiProperty({
    example: 'Rice, nori, tuna, masago',
    description: 'Description of product',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'image.jpg',
    description: 'Image name',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 2, description: 'order of product', required: false })
  @IsInt()
  @IsOptional()
  orderIndex: number;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Category id',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: '2024-02-02T18:31:33.721Z',
    description: 'Product created date',
    readOnly: true,
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;
}
