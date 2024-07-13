import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UserDateOfBirthEntity {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Date of birth id',
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Profile id',
    readOnly: true,
  })
  @IsString()
  profileId: string;

  @ApiProperty({ required: false, description: "User's date of birth" })
  @IsDate()
  date: Date;

  @ApiProperty({
    readOnly: true,
    required: false,
    description: 'Date of create',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    readOnly: true,
    required: false,
    description: 'Date of update',
  })
  @IsDate()
  updatedAt: Date;
}

export interface IUserDateOfBirth extends UserDateOfBirthEntity {}
