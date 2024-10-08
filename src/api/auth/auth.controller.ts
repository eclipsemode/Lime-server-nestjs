import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ConfirmAuthReqDto } from './dto/confirm-auth-req.dto';
import { AuthReqDto } from './dto/auth-req.dto';
import { AuthResDto } from './dto/auth-res.dto';
import { Request, response, Response } from 'express';
import { ConfirmAuthResDto } from './dto/confirm-auth-res.dto';
import { LogoutReqDto } from './dto/logout-req.dto';
import { LogoutResDto } from './dto/logout-res.dto';
import { CookieService } from '@services/cookie/cookie.service';

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
  @ApiOperation({
    summary: 'Authorization with phone number',
    description: 'Simple phone authorization with callback',
  })
  auth(@Body() authDto: AuthReqDto) {
    return this.authService.auth(authDto);
  }

  @Post('confirm')
  @ApiOkResponse({
    type: ConfirmAuthResDto,
    description: 'Code successfully confirmed.',
  })
  @ApiOperation({
    summary: 'RequestId with code',
    description: 'Confirm authorization with code',
  })
  async confirm(
    @Body() confirmAuthReqDto: ConfirmAuthReqDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, userId } =
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
      userId,
    };
  }

  @Post('logout/:token')
  @ApiNoContentResponse({
    type: LogoutResDto,
    description: 'Successfully logged out.',
  })
  @ApiOperation({
    summary: 'Logout | Delete refresh token',
    description: 'Logging out with deleting refresh token data from cookies',
  })
  async logout(
    @Body() logoutReqDto: LogoutReqDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('token') token?: string,
  ) {
    let refreshToken = await request.cookies['refreshToken'];

    if (!refreshToken) {
      refreshToken = token;
    }

    if (refreshToken) {
      this.cookieService.removeToken(response, 'refreshToken');
      return this.authService.logout({
        userId: logoutReqDto.userId,
        refreshToken,
      });
    }
    return;
  }

  @Get('refresh/:token')
  @ApiOkResponse({
    type: ConfirmAuthResDto,
    description: 'Tokens successfully refresh.',
  })
  @ApiOperation({
    summary: 'Refresh pair of tokens',
    description: 'Refreshing accessToken and refreshToken',
  })
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('token') token?: string,
  ) {
    let refreshTokenCookie: string = await request.cookies['refreshToken'];

    if (!refreshTokenCookie) {
      refreshTokenCookie = token;
    }

    if (!refreshTokenCookie) {
      return;
    }

    const { accessToken, refreshToken, userId } =
      await this.authService.refresh(refreshTokenCookie);

    if (refreshToken) {
      await this.cookieService.setToken(
        response,
        'refreshToken',
        refreshToken,
        30 * 24 * 60 * 60 * 1000,
      );
    } else {
      return;
    }

    return {
      accessToken,
      refreshToken,
      userId,
    };
  }
}
