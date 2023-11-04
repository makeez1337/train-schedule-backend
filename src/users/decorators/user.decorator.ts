import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../entities/user.entity';

export const AuthorizedUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
