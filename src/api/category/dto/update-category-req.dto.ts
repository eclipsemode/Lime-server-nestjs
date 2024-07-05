import { CategoryEntity } from '../entities/category.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateCategoryReqDto extends PickType(CategoryEntity, ['name']) {}
