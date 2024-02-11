import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CategoryEntity {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Category id',
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Sushi',
    description: 'Category name',
  })
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: 'dam2i1d21j.jpg',
    description: 'Category image',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: 1,
    description: 'Category order index',
    required: false,
  })
  @IsInt()
  orderIndex: number;

  @ApiProperty({
    example: '2024-02-02T18:31:33.721Z',
    description: 'Category created date',
    readOnly: true,
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;
}
