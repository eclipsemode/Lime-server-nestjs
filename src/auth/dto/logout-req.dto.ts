import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutReqDto {
  @ApiProperty({
    example: 'dhn1ji22-s21nj3h12-s21k841s-12sj1i',
    description: "User's id",
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'daskdnlaalndksawindsoada822h1on21ini212131fsdASdd23112',
    description: "User's refresh token",
  })
  @IsString()
  refreshToken: string;
}
