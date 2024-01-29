import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindUsersResDto } from '../user/dto/find-users-res.dto';
import { ConfirmAuthDto } from './dto/confirm-auth.dto';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({
    type: FindUsersResDto,
    description: 'User successfully created.',
  })
  auth(@Body() authDto: AuthDto) {
    return this.authService.auth(authDto);
  }

  @Post('confirm')
  @ApiOkResponse()
  confirm(@Body() confirmAuthDto: ConfirmAuthDto) {
    return this.authService.confirm(confirmAuthDto);
  }
}
