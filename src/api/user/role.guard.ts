import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from './role.decorator';
import { TokenService } from '@services/token/token.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Role, context.getHandler());

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest() as Request;

    if (
      !req.headers.authorization ||
      !req.headers.authorization.includes('Bearer ')
    ) {
      throw new UnauthorizedException({
        type: 'RoleGuard',
        description: `Not authorized.`,
      });
    }

    const accessToken = req.headers.authorization.split(' ').at(1);
    if (!accessToken) {
      throw new UnauthorizedException({
        type: 'RoleGuard',
        description: 'Not authorized.',
      });
    }

    try {
      const validatedTokenData =
        await this.tokenService.verifyAccessToken(accessToken);

      if (validatedTokenData.role !== roles) {
        throw new Error();
      }

      return true;
    } catch {
      throw new NotAcceptableException({
        type: 'RoleGuard',
        description: 'No access to content.',
      });
    }
  }
}
