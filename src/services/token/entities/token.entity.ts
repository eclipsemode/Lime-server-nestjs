import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMobilePhone, IsString } from 'class-validator';
import { UserEntity } from '@api/user/entities/user.entity';
import { UserRole } from '@api/user/types/user.type';

export class TokenEntity {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Token id',
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

  constructor(userData: UserEntity) {
    this.id = userData.id;
    this.role = userData.role;
    this.tel = userData.tel;
  }
}
