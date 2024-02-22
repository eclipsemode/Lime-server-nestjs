import { OrderEntity } from '@api/order/entities/order.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { OrderProductEntity } from '@api/order/entities/orderProduct.entity';
import { IsArray } from 'class-validator';

export class CreateOrderDto extends OmitType(OrderEntity, [
  'createdAt',
  'id',
  'orderProducts',
]) {
  @ApiProperty({
    example: [
      {
        price: '800',
        sku: '313172',
        amount: '2',
        productSize: '32 inch',
        productId: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
      },
    ],
    description: 'Order products array',
    isArray: true,
    type: Array(
      OmitType(OrderProductEntity, ['id', 'categoryId', 'image', 'orderId']),
    ),
  })
  @IsArray()
  orderProducts: Omit<
    OrderProductEntity,
    'id' | 'categoryId' | 'image' | 'orderId'
  >[];
}
