import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PayloadRequest } from './request/payload.request';
import { JwtTokensResource } from './resource/jwt-tokens.resource';
import { User } from '../users/entities/user.entity';
import { Token } from './entities/token.entity';
import { TokenType } from './enums/token-type.enum';
import { PayloadResource } from './resource/payload-resource';

@Injectable()
export class TokensService {
  private readonly jwtAccessSecret: string;
  private readonly jwtAccessExpiresIn: string;

  private readonly jwtRefreshSecret: string;
  private readonly jwtRefreshExpiresIn: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Token)
    private readonly tokensRepository: Repository<Token>,
  ) {
    this.jwtAccessSecret = configService.get('JWT.ACCESS_SECRET');
    this.jwtAccessExpiresIn = configService.get('JWT.ACCESS_EXPIRES_IN');

    this.jwtRefreshSecret = configService.get('JWT.REFRESH_SECRET');
    this.jwtRefreshExpiresIn = configService.get('JWT.REFRESH_EXPIRES_IN');
  }

  public generateTokensPair(payloadRequest: PayloadRequest): JwtTokensResource {
    const access_token = this.jwtService.sign(payloadRequest, {
      secret: this.jwtAccessSecret,
      expiresIn: this.jwtAccessExpiresIn,
    });

    const refresh_token = this.jwtService.sign(payloadRequest, {
      secret: this.jwtRefreshSecret,
      expiresIn: this.jwtRefreshExpiresIn,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  public async saveToken(refresh_token: string, user: User): Promise<void> {
    const tokenEntity = await this.tokensRepository.create({
      refresh_token,
      user,
    });
    await this.tokensRepository.save(tokenEntity);
  }

  public verifyToken(token: string, tokenType: TokenType): PayloadResource {
    return this.jwtService.verify(token, {
      secret:
        tokenType === TokenType.access
          ? this.jwtAccessSecret
          : this.jwtRefreshSecret,
    });
  }

  public async removeToken(refresh_token: string, user: User): Promise<void> {
    await this.tokensRepository.delete({ refresh_token, user });
  }
}
