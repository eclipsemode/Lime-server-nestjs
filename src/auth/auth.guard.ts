import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const accessToken = req.headers.authorization.split(' ').at(1);
    if (!accessToken) {
      throw new UnauthorizedException({
        type: 'AuthGuard',
        description: 'Not authorized.',
      });
    }

    try {
      const validatedTokenData =
        this.tokenService.verifyAccessToken(accessToken);
    } catch {
      throw new UnauthorizedException({
        type: 'AuthGuard',
        description: 'Not authorized.',
      });
    }

    return true;
  }
}
