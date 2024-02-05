import { CategoryEntity } from '../entities/category.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCategoryReqDto extends PickType(CategoryEntity, ['name']) {
  @ApiProperty({
    example: 'Sushi',
    description: 'Category name',
    required: false,
  })
  @IsString()
  name: string;

  @ApiProperty({ type: String, format: 'binary', required: false })
  image: File;
}
