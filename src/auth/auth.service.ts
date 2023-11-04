import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { SignInRequest } from './request/sign-in.request';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { JwtTokensResource } from '../tokens/resource/jwt-tokens.resource';
import { SignUpRequest } from './request/sign-up.request';
import { User } from '../users/entities/user.entity';
import { SignOutRequest } from './request/sign-out.request';

@Injectable()
export class AuthService {
  private readonly salt: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
  ) {
    this.salt = Number(configService.get('BCRYPT_SALT'));
  }

  public async signUp(signUpRequest: SignUpRequest): Promise<void> {
    const hashedPassword = await bcrypt.hash(signUpRequest.password, this.salt);

    await this.usersService.create({
      username: signUpRequest.username,
      password: hashedPassword,
    });
  }

  public async signIn({
    username,
    password,
  }: SignInRequest): Promise<
    JwtTokensResource & { id: number; username: string }
  > {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException(`Incorrect email or password`);
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw new UnauthorizedException(`Incorrect email or password`);
    }

    const tokens = await this.tokensService.generateTokensPair({
      username: user.username,
    });

    await this.tokensService.saveToken(tokens.refresh_token, user);

    return { id: user.id, username: user.username, ...tokens };
  }

  public async signOut(
    user: User,
    { refresh_token }: SignOutRequest,
  ): Promise<void> {
    await this.tokensService.removeToken(refresh_token, user);
  }
}
