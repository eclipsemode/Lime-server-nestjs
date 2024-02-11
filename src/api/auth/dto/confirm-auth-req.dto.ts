import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ConfirmAuthReqDto {
  @ApiProperty({ example: 1234 })
  @IsInt()
  code: number;

  @ApiProperty({ example: 'das8a2-da29a3-fe1jdnj-42kmka' })
  @IsString()
  requestId: string;
}
