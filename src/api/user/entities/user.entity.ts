import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMobilePhone,
  IsString,
} from 'class-validator';
import { UserRole } from '../types/user.type';
import IUser from '../types/user.type';

export class UserEntity implements IUser {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "User's id",
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: "User's role",
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: '79180000000', description: "User's phone number" })
  @IsMobilePhone('ru-RU')
  tel: string;

  @ApiProperty({ example: false, description: "User's activation status" })
  @IsBoolean()
  isActivated: boolean;

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