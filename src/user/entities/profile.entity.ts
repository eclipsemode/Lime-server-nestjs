import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';
import IProfile from '../types/profile.type';

export class ProfileEntity implements IProfile {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "Profile's id",
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "User's id",
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: false,
    description: "User's email",
    example: 'test@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, description: "User's date of birth" })
  @IsDate()
  dateOfBirth: Date;
  @ApiProperty({
    required: false,
    example: 'Daniel',
    description: "User's name",
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    description: "User's surname",
    example: 'Komnin',
  })
  @IsString()
  surname: string;

  @ApiProperty({
    required: false,
    example: 'Mira street',
    description: "User's street",
  })
  @IsString()
  street: string;

  @ApiProperty({ required: false, example: '1', description: "User's house" })
  @IsString()
  house: string;

  @ApiProperty({ required: false, description: "User's floor", example: null })
  @IsString()
  floor: string;

  @ApiProperty({
    required: false,
    description: "User's entrance",
    example: null,
  })
  @IsString()
  entrance: string;

  @ApiProperty({ required: false, example: '1', description: "User's room" })
  @IsString()
  room: string;

  @ApiProperty({
    readOnly: true,
    required: false,
    description: 'Date of registration',
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
