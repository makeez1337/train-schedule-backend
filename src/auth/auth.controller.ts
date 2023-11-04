import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInRequest } from './request/sign-in.request';
import { JwtTokensResource } from '../tokens/resource/jwt-tokens.resource';
import { SignUpRequest } from './request/sign-up.request';
import { AuthGuard } from './guards/auth.guard';
import { SignOutRequest } from './request/sign-out.request';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() signUpRequest: SignUpRequest) {
    await this.authService.signUp(signUpRequest);
  }

  @Post('sign-in')
  public async signIn(
    @Body() signInRequest: SignInRequest,
  ): Promise<JwtTokensResource & { id: number; username: string }> {
    return this.authService.signIn(signInRequest);
  }

  @UseGuards(AuthGuard)
  @Delete('sign-out')
  public async signOut(
    @AuthorizedUser() user: User,
    @Body() signOutRequest: SignOutRequest,
  ): Promise<void> {
    await this.authService.signOut(user, signOutRequest);
  }
}
