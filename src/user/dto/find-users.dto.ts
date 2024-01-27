import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum IUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class FindUsersDto {
  @ApiProperty({ example: 1, description: "User's id" })
  @IsInt()
  id: number;

  @ApiProperty({ required: false, description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, description: "User's date of birth" })
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({
    enum: ['USER', 'ADMIN'],
    default: IUserRole.USER,
    description: "User's role",
  })
  role: IUserRole;

  @ApiProperty({
    required: false,
    example: 'Daniel',
    description: "User's name",
  })
  @IsString()
  name: string;

  @ApiProperty({ required: false, description: "User's surname" })
  @IsString()
  surname: string;

  @ApiProperty({ example: '+79180000000', description: "User's phone number" })
  @IsPhoneNumber('RU')
  tel: string;

  @ApiProperty({
    required: false,
    example: 'Mira street',
    description: "User's street",
  })
  @IsString()
  street: string;

  @ApiProperty({ required: false, example: 1, description: "User's house" })
  @IsInt()
  house: number;

  @ApiProperty({ required: false, description: "User's floor" })
  @IsInt()
  floor: number;

  @ApiProperty({ required: false, description: "User's entrance" })
  @IsInt()
  entrance: number;

  @ApiProperty({ required: false, example: 1, description: "User's room" })
  @IsInt()
  room: number;

  @ApiProperty({ default: false, description: "User's activation status" })
  @IsBoolean()
  isActivated: boolean;

  @ApiProperty({ isArray: true, default: [], required: false })
  @IsArray()
  bonus: string[];

  @ApiProperty({
    readOnly: true,
    required: false,
    description: 'Date of registration',
  })
  @IsDate()
  createdAt: Date;
}
