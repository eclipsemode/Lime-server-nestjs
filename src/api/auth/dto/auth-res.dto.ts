import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthResDto {
  @ApiProperty({ required: true, example: 'dasdo2-sadd2321-da21-d12f11' })
  @IsString()
  requestId: string;
}
