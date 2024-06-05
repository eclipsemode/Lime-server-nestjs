import { Injectable, NotFoundException } from '@nestjs/common';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from './entities/token.entity';
import { DbService } from '@services/db/db.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbService: DbService,
  ) {}
  async generate(generateTokenDto: GenerateTokenDto) {
    const accessToken = await this.jwtService.signAsync(generateTokenDto, {
      secret: process.env.SECRET_KEY_ACCESS,
      expiresIn: '5m',
    });
    const refreshToken = await this.jwtService.signAsync(generateTokenDto, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token: string): Promise<TokenEntity> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY_ACCESS,
    });
  }

  async verifyRefreshToken(token: string): Promise<TokenEntity> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY_REFRESH,
    });
  }

  async saveToken(userId: string, tokenNew: string, tokenOld?: string) {
    if (tokenOld) {
      const foundToken = await this.dbService.token.findFirst({
        where: {
          refreshToken: tokenOld,
        },
      });

      if (foundToken) {
        return this.dbService.token.update({
          where: {
            userId,
            refreshToken: tokenOld,
          },
          data: {
            refreshToken: tokenNew,
          },
        });
      }
    }

    return this.dbService.token.create({
      data: {
        userId,
        refreshToken: tokenNew,
      },
    });
  }

  async removeToken(userId: string, refreshToken: string) {
    const foundToken = await this.dbService.token.findUnique({
      where: {
        refreshToken,
      },
    });

    if (!foundToken) {
      return;
    }

    return this.dbService.token.delete({
      where: {
        refreshToken,
        userId,
      },
    });
  }
}
