import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import IOrder, {
  OrderStatus,
  OrderType,
  PaymentType,
} from '@api/order/types/order.type';
import { OrderProductEntity } from '@api/order/entities/orderProduct.entity';
import { Transform, Type } from 'class-transformer';

export class OrderEntity implements IOrder {
  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Order id',
    readOnly: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: [
      {
        id: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
        price: '800',
        image: 'default.jpg',
        sku: '313172',
        amount: '2',
        productSize: '32 inch',
        orderId: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
        productId: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
        categoryId: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
      },
    ],
    description: 'Ordered products',
    isArray: true,
    type: () => OrderProductEntity,
  })
  @IsArray()
  orderProducts: OrderProductEntity[];

  @ApiProperty({
    example: '800',
    description: 'Total price of order products',
  })
  @IsString()
  @IsNotEmpty()
  totalPrice: string;

  @ApiProperty({
    example: '12',
    description: 'Total amount of order products',
  })
  @IsNotEmpty()
  @IsString()
  totalAmount: string;

  @ApiProperty({
    example: OrderType.DELIVERY,
    description: 'Type of delivery',
    enum: OrderType,
  })
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({
    example: 'Daniel',
    description: "Client's name",
  })
  @IsNotEmpty()
  @IsString()
  clientName: string;

  @ApiProperty({
    example: 'Mira street',
    description: "Client's street",
    required: false,
  })
  @IsString()
  @IsOptional()
  clientAddress?: string;

  @ApiProperty({
    example: '1',
    description: "Client's entrance",
    required: false,
  })
  @IsString()
  @IsOptional()
  clientEntrance?: string;

  @ApiProperty({
    example: '1',
    description: "Client's floor",
    required: false,
  })
  @IsString()
  @IsOptional()
  clientFloor?: string;

  @ApiProperty({
    example: '1',
    description: "Client's room",
    required: false,
  })
  @IsString()
  @IsOptional()
  clientRoom?: string;

  @ApiProperty({
    example: '79180000000',
    description: "Client's phone number",
  })
  @IsMobilePhone('ru-RU')
  clientTel: string;

  @ApiProperty({
    example: 'test@mail.ru',
    description: "Client's email",
    required: false,
  })
  @IsEmail()
  @IsOptional()
  clientEmail?: string;

  @ApiProperty({
    example: '2024-02-22T09:34:03.267Z',
    description: 'Order date',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  preOrderDate?: Date;

  @ApiProperty({
    example: '2',
    description: 'Amount of utensils',
  })
  @IsString()
  utensils: string;

  @ApiProperty({
    example: PaymentType.CARD,
    description: 'Type of payment cash or card',
    enum: PaymentType,
  })
  @IsEnum(PaymentType)
  payment: PaymentType;

  @ApiProperty({
    example: 'Some commentary',
    description: 'Commentary from client',
    required: false,
  })
  @IsString()
  @IsOptional()
  commentary?: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Id of promo code which used with order',
    required: false,
  })
  @IsString()
  @IsOptional()
  promoCodeId?: string;

  @ApiProperty({
    example: OrderStatus.new,
    description: 'Status of order',
    default: OrderStatus.new,
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    example: 2030,
    description: 'Chanel number of order',
    required: false,
    default: 2030,
  })
  @IsInt()
  @IsOptional()
  channel?: number;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'User id',
    readOnly: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    example: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
    description: 'Branch id of order',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  branchId: string;

  @ApiProperty({
    example: '2024-02-02T18:31:33.721Z',
    description: 'Category created date',
    readOnly: true,
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;
}
