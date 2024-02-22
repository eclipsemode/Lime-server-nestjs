import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
