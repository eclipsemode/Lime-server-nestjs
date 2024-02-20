import { ApiProperty, PickType } from '@nestjs/swagger';
import { CategoryEntity } from '../entities/category.entity';
import { IsBase64 } from 'class-validator';
import { Multer } from 'multer';

export class CreateCategoryReqDto extends PickType(CategoryEntity, ['name']) {
  @ApiProperty({ type: String, format: 'binary', required: false })
  image: Express.Multer.File;
}
