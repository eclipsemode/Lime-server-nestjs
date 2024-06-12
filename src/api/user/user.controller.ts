import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserReqDto } from './dto/update-user-req.dto';
import {
  ApiBearerAuth,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindUsersResDto } from './dto/find-users-res.dto';
import { FindUserResDto } from './dto/find-user-res.dto';
import { UpdateUserResDto } from './dto/update-user-res.dto';
import { RoleGuard } from './role.guard';
import { Role } from './role.decorator';
import { UserRole } from './types/user.type';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserOrdersResDto } from './dto/get-user-orders-res.dto';
import { GetUserBonusesResDto } from './dto/get-user-bonuses-res.dto';
import { UpdateDateOfBirthResDto } from '@api/user/dto/update-date-of-birth-res.dto';
import { UpdateDateOfBirthReqDto } from '@api/user/dto/update-date-of-birth-req.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiFoundResponse({
    type: FindUsersResDto,
    description: 'Users successfully found.',
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Getting all users with. Only for ADMIN role',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiFoundResponse({
    type: FindUserResDto,
    description: "User's successfully found.",
  })
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get user by id param. Only available for authorized users',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/orders/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiFoundResponse({
    type: GetUserOrdersResDto,
    description: "User's orders successfully found",
    isArray: true,
  })
  @ApiOperation({
    summary: "Get user's orders by id",
    description:
      "Get user's orders by id param. Only available for authorized users",
  })
  getUserOrders(@Param('id') id: string) {
    return this.userService.getUserOrders(id);
  }

  @Get('/bonuses/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiFoundResponse({
    type: GetUserBonusesResDto,
    description: "User's bonuses successfully found",
    isArray: true,
  })
  @ApiOperation({
    summary: "Get user's bonuses by id",
    description:
      "Get user's bonuses by id param. Only available for authorized users",
  })
  getUserBonuses(@Param('id') id: string) {
    return this.userService.getUserBonuses(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    type: UpdateUserResDto,
    description: "User's successfully updated.",
  })
  @ApiOperation({
    summary: 'Update user by id',
    description: 'Update user by id param. Only available for authorized users',
  })
  update(@Param('id') id: string, @Body() updateUserReqDto: UpdateUserReqDto) {
    return this.userService.update(id, updateUserReqDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @Role(UserRole.ADMIN)
  @ApiOkResponse({
    type: FindUsersResDto,
    description: 'User successfully deleted.',
  })
  @ApiOperation({
    summary: 'Remove user by id',
    description: 'Remove user by id param. Only available for ADMIN',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/date')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    type: UpdateDateOfBirthResDto,
    description: 'Date of birth was successfully updated',
  })
  @ApiOperation({
    summary: 'Update date of birth',
    description: 'Update date of birth',
  })
  updateDateOfBirth(
    @Param('id') id: string,
    @Body() updateDateOfBirthReqDto: UpdateDateOfBirthReqDto,
  ) {
    return this.userService.updateDateOfBirth(id, updateDateOfBirthReqDto.date);
  }
}
