import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { ProfileEntity } from '../entities/profile.entity';

export class UpdateUserResDto extends UserEntity {
  @ApiProperty({ required: false })
  @IsObject()
  profile: ProfileEntity;
}
