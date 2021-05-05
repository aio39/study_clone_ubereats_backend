import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

// export function jwtMiddleware(req:Request, res:Response,next:NextFunction){
//     console.log(req.headers)
//     next()
// }

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService, // module에서 export해서 접근 가능.
    private readonly userService: UsersService, // user module에서 export 해줘야 사용 가능
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString()); // headers 값이 array일수도 있어 string으로 확실하게 해준다.
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(decoded['id']);
          req['user'] = user;
        } catch (error) {}
      }
    }

    next();
  }
}
