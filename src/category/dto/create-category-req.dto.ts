import { ApiProperty, PickType } from '@nestjs/swagger';
import { CategoryEntity } from '../entities/category.entity';

export class CreateCategoryReqDto extends PickType(CategoryEntity, ['name']) {
  @ApiProperty({ type: String, format: 'binary', required: false })
  image: File;
}
