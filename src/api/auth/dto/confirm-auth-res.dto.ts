import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfirmAuthResDto {
  @ApiProperty({ example: 'dnj2asdasda2jiq292ji21j12d1213dadd1d1d2adaf2a' })
  @IsString()
  accessToken: string;

  @ApiProperty({ example: 'dnj2asdasda2jiq29dasfg21qd221d21d12f3dadadaf2a' })
  @IsString()
  refreshToken: string;
}
