import usersService from '../services/users.service';
import { NextFunction, Request, RequestHandler, Response } from '../types/generic.types';
import CustomError from '../custom.error';
import commonService from '../services/common.service';

type TokenGuard = () => RequestHandler;

export const tokenGuard: (TokenGuard) = (() => (request: Request, response: Response, next: NextFunction) => {
  const token: string = commonService.getTokenFromHeaders(request.headers) || request.query.token || request.body.token || '';
  usersService.verifyToken(token)
    .then((a: boolean) => {
      if (!a) {
        const error: CustomError = new CustomError('No access', 403, 'Authorization', token, 'header');
        return response.status(error.code).json(commonService.formatError(error));
      }
      next();
    })
    .catch((e: CustomError) => response.status(e.code).json(commonService.formatError(e)));
});
