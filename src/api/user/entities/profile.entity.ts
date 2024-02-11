import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import IProfile from '../types/profile.type';

export class ProfileEntity implements IProfile {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "Profile's id",
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "User's id",
    readOnly: true,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: false,
    description: "User's email",
    example: 'test@email.com',
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false, description: "User's date of birth" })
  @IsDate()
  dateOfBirth: Date;
  @ApiProperty({
    required: false,
    nullable: true,
    example: 'Daniel',
    description: "User's name",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    description: "User's surname",
    example: 'Komnin',
  })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    example: 'Mira street',
    description: "User's street",
  })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    example: '1',
    description: "User's house",
  })
  @IsString()
  @IsOptional()
  house?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    description: "User's floor",
    example: null,
  })
  @IsString()
  @IsOptional()
  floor?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    description: "User's entrance",
    example: null,
  })
  @IsString()
  @IsOptional()
  entrance?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    example: '1',
    description: "User's room",
  })
  @IsString()
  @IsOptional()
  room?: string;

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
