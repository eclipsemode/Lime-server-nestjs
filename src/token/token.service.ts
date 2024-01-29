import { Injectable } from '@nestjs/common';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  generate(generateTokenDto: GenerateTokenDto) {
    const accessToken = this.jwtService.signAsync(generateTokenDto, {
      secret: process.env.SECRET_KEY_ACCESS,
      expiresIn: '30m',
    });
    const refreshToken = this.jwtService.signAsync(generateTokenDto, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyAccessToken(token: string) {
    const data = this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY_ACCESS,
    });

    return data;
  }

  verifyRefreshToken(token: string) {
    const data = this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY_REFRESH,
    });

    return data;
  }
}
