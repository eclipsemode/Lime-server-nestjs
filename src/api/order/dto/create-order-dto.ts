import { OrderEntity } from '@api/order/entities/order.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { OrderProductEntity } from '@api/order/entities/orderProduct.entity';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto extends OmitType(OrderEntity, [
  'createdAt',
  'id',
  'orderProducts',
  'clientEmail',
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
  @ValidateNested({ each: true })
  @Type(() =>
    OmitType(OrderProductEntity, ['id', 'categoryId', 'image', 'orderId']),
  )
  @ArrayMinSize(1)
  @IsArray()
  orderProducts: Omit<
    OrderProductEntity,
    'id' | 'categoryId' | 'image' | 'orderId'
  >[];
}
