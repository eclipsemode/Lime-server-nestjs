import IOrder, {
  OrderStatus,
  OrderType,
  PaymentType,
} from '../../order/types/order.type';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsString,
} from 'class-validator';

export class GetUserOrdersResDto implements IOrder {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Order id',
  })
  @IsString()
  id: string;

  @ApiProperty({ example: '990', description: "Order's price" })
  @IsString()
  totalPrice: string;

  @ApiProperty({ example: '5', description: 'Amount of all products' })
  @IsString()
  totalAmount: string;

  @ApiProperty({
    example: OrderType.DELIVERY,
    enum: OrderType,
    description: 'Type of order - delivery or pickup',
  })
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({ example: 'Daniel', description: "Client's name" })
  @IsString()
  clientName: string;

  @ApiProperty({
    example: 'Lermontova street',
    required: false,
    description: "Client's address",
  })
  @IsString()
  clientAddress?: string;

  @ApiProperty({
    example: '1',
    description: "Client's entrance",
    required: false,
  })
  @IsString()
  clientEntrance?: string;

  @ApiProperty({
    example: '1',
    description: "Client's floor",
    required: false,
  })
  @IsString()
  clientFloor?: string;

  @ApiProperty({
    example: '1',
    description: "Client's room",
    required: false,
  })
  @IsString()
  clientRoom?: string;

  @ApiProperty({
    example: '79180000000',
    description: "Client's phone",
  })
  @IsMobilePhone('ru-RU', { strictMode: false })
  clientTel: string;

  @ApiProperty({
    example: 'mail@mail.ru',
    description: "Client's email",
    required: false,
  })
  @IsEmail()
  clientEmail?: string;

  @ApiProperty({
    example: '2024-02-02T18:31:33.721Z',
    description: 'Order date',
    required: false,
  })
  @IsDate()
  preOrderDate?: Date;

  @ApiProperty({
    example: '4',
    description: 'Amount of utensils',
  })
  @IsString()
  utensils: string;

  @ApiProperty({
    example: PaymentType.CARD,
    description: 'Payment type - cash or card',
  })
  @IsEnum(PaymentType)
  payment: PaymentType;

  @ApiProperty({
    example: 'Some commentary...',
    description: 'Commentary for order',
    required: false,
  })
  @IsString()
  commentary?: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Promo code id if used',
    required: false,
  })
  @IsString()
  promoCodeId?: string;

  @ApiProperty({
    example: OrderStatus.new,
    description: 'Status of current order',
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    example: 2030,
    description: 'Channel of order (to define website or mobile app)',
  })
  @IsInt()
  channel: number;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "User's id",
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: "Branch's id",
  })
  @IsString()
  branchId: string;

  @ApiProperty({
    example: '2024-02-02T18:31:33.721Z',
    description: 'Date when order created',
  })
  @IsDate()
  createdAt: Date;
}
