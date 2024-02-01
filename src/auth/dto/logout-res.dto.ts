import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class LogoutResDto {
  @ApiProperty({
    example: 'dhn1ji22-s21nj3h12-s21k841s-12sj1i',
    description: "User's id",
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'daskdnlaalndksawindsoada822h1on21ini212131fsdASdd23112',
    description: "User's refresh token",
  })
  @IsString()
  refreshToken: string;

  @ApiProperty({
    example: new Date(Date.now()),
    description: "User's token created date",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: new Date(Date.now()),
    description: "User's token updated date",
  })
  @IsDate()
  updatedAt: Date;
}
