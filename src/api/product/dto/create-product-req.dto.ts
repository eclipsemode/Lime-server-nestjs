import { OmitType } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';
export class CreateProductReqDto extends OmitType(ProductEntity, [
  'image',
  'id',
  'createdAt',
]) {}
