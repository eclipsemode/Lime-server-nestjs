import { OmitType, PartialType } from '@nestjs/swagger';
import { ProductEntity } from '@api/product/entities/product.entity';

export class UpdateProductReqDto extends PartialType(
  OmitType(ProductEntity, ['image', 'id', 'image', 'orderIndex']),
) {}
