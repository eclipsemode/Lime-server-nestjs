import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { ProfileDto } from './profile.dto';

export class UpdateUserResDto extends UserDto {
  @ApiProperty({ required: false })
  @IsObject()
  profile: ProfileDto;
}
