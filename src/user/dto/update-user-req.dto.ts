import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProfileDto } from './profile.dto';

export class UpdateUserReqDto extends PartialType(ProfileDto) {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;
}
