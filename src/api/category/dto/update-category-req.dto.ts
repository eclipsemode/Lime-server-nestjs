import { CategoryEntity } from '../entities/category.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBase64, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryReqDto extends PickType(CategoryEntity, ['name']) {
  @ApiProperty({
    example: 'Sushi',
    description: 'Category name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBase64()
  image: File;
}
