import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// TODO: move usertype and requestwithuser into seperate types folder.
export interface JWTUserType {
  id: number;
  iat: number;
  exp: number;
}
// TODO: move usertype and requestwithuser into seperate types folder.
export interface RequestWithUser extends Request {
  user: JWTUserType;
}

export const User = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<RequestWithUser>();

  return req.user;
});
