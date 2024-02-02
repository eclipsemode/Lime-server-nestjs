import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { ProfileDto } from './profile.dto';

export class FindUserResDto extends UserDto {
  @ApiProperty({ isArray: true, example: [], required: false })
  @IsArray()
  bonus: any[];

  @ApiProperty({ isArray: true, required: false, example: [] })
  @IsArray()
  order: any[];

  @ApiProperty({ required: false, example: null })
  @IsObject()
  profile: ProfileDto;
}
