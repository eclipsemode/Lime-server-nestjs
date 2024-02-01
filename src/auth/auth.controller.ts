import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConfirmAuthReqDto } from './dto/confirm-auth-req.dto';
import { AuthReqDto } from './dto/auth-req.dto';
import { AuthResDto } from './dto/auth-res.dto';
import { Request, Response } from 'express';
import { CookieService } from '../cookie/cookie.service';
import { ConfirmAuthResDto } from './dto/confirm-auth-res.dto';
import { LogoutReqDto } from './dto/logout-req.dto';
import { LogoutResDto } from './dto/logout-res.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: AuthResDto,
    description: 'User successfully created.',
  })
  auth(@Body() authDto: AuthReqDto) {
    return this.authService.auth(authDto);
  }

  @Post('confirm')
  @ApiOkResponse({
    type: ConfirmAuthResDto,
    description: 'Code successfully confirmed.',
  })
  async confirm(
    @Body() confirmAuthReqDto: ConfirmAuthReqDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.confirm(confirmAuthReqDto);

    if (refreshToken) {
      await this.cookieService.setToken(
        response,
        'refreshToken',
        refreshToken,
        30 * 24 * 60 * 60 * 1000,
      );
    } else {
      throw new ForbiddenException({
        type: 'Confirm',
        description: 'Cookie set error.',
      });
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('logout')
  @ApiNoContentResponse({
    type: LogoutResDto,
    description: 'Successfully logged out.',
  })
  logout(@Body() logoutReqDto: LogoutReqDto) {
    return this.authService.logout(logoutReqDto);
  }

  @Put('refresh')
  @ApiOkResponse({
    type: ConfirmAuthResDto,
    description: 'Tokens successfully refresh.',
  })
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.refresh(request);

    if (refreshToken) {
      await this.cookieService.setToken(
        response,
        'refreshToken',
        refreshToken,
        30 * 24 * 60 * 60 * 1000,
      );
    } else {
      throw new ForbiddenException({
        type: 'Refresh',
        description: 'Cookie set error.',
      });
    }

    return {
      accessToken,
      refreshToken,
    };
  }
}
