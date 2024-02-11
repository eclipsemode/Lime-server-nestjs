import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class BonusDto {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Bonus id',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: '26',
    description: 'Bonus score',
  })
  @IsString()
  score: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'User id',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Order id',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    example: 'Some description...',
    description: 'Description of bonus',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2024-02-02T18:31:33.721Z',
    description: 'Date when bonus created',
  })
  @IsDate()
  createdAt: Date;
}
