import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone } from 'class-validator';

export class AuthReqDto {
  @ApiProperty({ example: '79180000000', description: "User's phone number" })
  @IsMobilePhone('ru-RU', { strictMode: false })
  tel: string;
}
