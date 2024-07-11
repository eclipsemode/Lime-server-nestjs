import { OrderEntity } from '@api/order/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetAllOrdersDto extends OrderEntity {
  @ApiProperty({
    example: 6,
    description: 'Number of orders',
  })
  @IsInt()
  _count: number;
}
