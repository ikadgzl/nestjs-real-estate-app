import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { JWTUserType, RequestWithUser } from '../decorators/user.decorator';

export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const token = req.headers.authorization?.split('Bearer ')[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decodedToken as JWTUserType;
    } catch (error) {
      console.log('BURDAN DONDu');

      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
