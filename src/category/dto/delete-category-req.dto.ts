import { PickType } from '@nestjs/swagger';
import { CategoryEntity } from '../entities/category.entity';

export class DeleteCategoryReqDto extends PickType(CategoryEntity, ['id']) {}
