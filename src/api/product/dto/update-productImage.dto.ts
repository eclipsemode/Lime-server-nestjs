import { ApiProperty } from '@nestjs/swagger';
import { IsBase64 } from 'class-validator';

export class UpdateProductImageDto {
  @ApiProperty({ type: String, format: 'binary' })
  @IsBase64()
  image: Express.Multer.File;
}
