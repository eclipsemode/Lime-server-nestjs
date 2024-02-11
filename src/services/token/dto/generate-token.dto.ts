import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone } from 'class-validator';
import { UserRole } from '@api/user/types/user.type';

export class GenerateTokenDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  @IsMobilePhone('ru-RU')
  tel: string;
}
