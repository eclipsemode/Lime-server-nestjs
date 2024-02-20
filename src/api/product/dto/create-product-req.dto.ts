import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';
import { IsArray, IsBase64, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ParseNumberPipe } from '@api/product/parseNumber.pipe';
export class CreateProductReqDto extends OmitType(ProductEntity, [
  'image',
  'id',
  'createdAt',
  'rating',
  'orderIndex',
  'productSize',
]) {
  @ApiProperty({ type: String, format: 'binary', required: false })
  @IsBase64()
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    example: 5,
    description: 'Rating of product',
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => {
    const numberPipe = new ParseNumberPipe();
    return numberPipe.transform(value, value);
  })
  rating?: number;

  @ApiProperty({
    example: '["24 inch", "32 inch"]',
    description: 'Array of product sizes',
  })
  @IsArray()
  @Transform(({ value }) => value.split(','))
  productSizes: string[];

  @ApiProperty({
    example: '["240", "320"]',
    description: 'Array of product prices',
  })
  @IsArray()
  @Transform(({ value }) => value.split(','))
  productPrices: string[];

  @ApiProperty({
    example: '["124143", "521952"]',
    description: "Array of product sku's",
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  productSkus: string[];
}
