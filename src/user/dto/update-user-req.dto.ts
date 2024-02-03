import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProfileEntity } from '../entities/profile.entity';

export class UpdateUserReqDto extends PartialType(ProfileEntity) {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;
}
