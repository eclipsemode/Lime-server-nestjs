import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllOrdersDto } from '@api/order/dto/get-all-orders.dto';
import { CreateOrderDto } from '@api/order/dto/create-order-dto';
import { RoleGuard } from '@api/user/role.guard';
import { Role } from '@api/user/role.decorator';
import { UserRole } from '@api/user/types/user.type';
import { AuthGuard } from '@api/auth/auth.guard';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Get all orders, operation is high load',
  })
  @ApiFoundResponse({
    type: GetAllOrdersDto,
    isArray: true,
    description: 'Successfully found',
  })
  getAll() {
    return this.orderService.getAll();
  }

  @Get('user')
  @ApiQuery({
    name: 'userId',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'size',
    type: Number,
    required: false,
  })
  @ApiOperation({
    summary: 'Get all orders by user id',
    description: 'Get all orders, with user id',
  })
  @ApiFoundResponse({
    type: GetAllOrdersDto,
    isArray: true,
    description: 'Successfully found',
  })
  getOrdersByUserId(
    @Query('userId') userId: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.orderService.getOrdersByUserId(userId, page, size);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get order by id',
    description: 'Get one order by id',
  })
  @ApiFoundResponse({
    type: GetAllOrdersDto,
    description: 'Successfully found',
  })
  get(@Param('id') id: string) {
    return this.orderService.get(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Create order',
    description: 'Create order',
  })
  @ApiCreatedResponse({
    type: CreateOrderDto,
    description: 'Order successfully created',
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete order',
    description: 'Delete order',
  })
  @ApiOkResponse({
    type: GetAllOrdersDto,
    description: 'Successfully deleted',
  })
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
