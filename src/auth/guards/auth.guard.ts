import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokensService } from '../../tokens/tokens.service';
import { TokenType } from '../../tokens/enums/token-type.enum';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokensService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        return false;
      }

      const { username } = this.tokenService.verifyToken(
        token,
        TokenType.access,
      );

      const user = await this.usersService.findByUsername(username);

      if (!user) {
        return false;
      }

      request.user = user;

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
