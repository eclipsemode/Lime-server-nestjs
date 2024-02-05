import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, MinLength } from 'class-validator';

export class BranchEntity {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Branch id',
  })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Armavir', description: 'Name of branch' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: '2024-02-02T18:31:33.721Z',
    description: 'Date when branch created',
  })
  @IsDate()
  createdAt: Date;
}
