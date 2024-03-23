import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export interface IChangeOrderProducts {
  id: string;
  orderIndex: number;
}

export class ChangeOrderReqDto {
  @ApiProperty({
    example: [{ id: 'daldad-dasdf-2dlada-dal2fg', orderIndex: 3 }],
    type: Array,
    description: 'Array of change order products',
  })
  @IsArray()
  orderArr: IChangeOrderProducts[];
}
