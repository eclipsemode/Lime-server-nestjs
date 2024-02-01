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
  ApiTags,
} from '@nestjs/swagger';
import { FindUsersResDto } from './dto/find-users-res.dto';
import { FindUserResDto } from './dto/find-user-res.dto';
import { UpdateUserResDto } from './dto/update-user-res.dto';
import { RoleGuard } from './role.guard';
import { Role } from './role.decorator';
import { UserRole } from './interfaces/user.interface';
import { AuthGuard } from '../auth/auth.guard';

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
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    type: UpdateUserResDto,
    description: "User's successfully updated.",
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
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
