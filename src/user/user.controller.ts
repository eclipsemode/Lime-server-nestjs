import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserReqDto } from './dto/update-user-req.dto';
import { ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindUsersResDto } from './dto/find-users-res.dto';
import { FindUserResDto } from './dto/find-user-res.dto';
import { UpdateUserResDto } from './dto/update-user-res.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
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
  @ApiFoundResponse({
    type: FindUserResDto,
    description: "User's successfully found.",
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: UpdateUserResDto,
    description: "User's successfully updated.",
  })
  update(@Param('id') id: string, @Body() updateUserReqDto: UpdateUserReqDto) {
    return this.userService.update(id, updateUserReqDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: FindUsersResDto,
    description: 'User successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
