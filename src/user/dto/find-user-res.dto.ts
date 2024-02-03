import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { ProfileEntity } from '../entities/profile.entity';

export class FindUserResDto extends UserEntity {
  @ApiProperty({ isArray: true, example: [], required: false })
  @IsArray()
  bonus: any[];

  @ApiProperty({ isArray: true, required: false, example: [] })
  @IsArray()
  order: any[];

  @ApiProperty({ required: false, example: null })
  @IsObject()
  profile: ProfileEntity;
}
