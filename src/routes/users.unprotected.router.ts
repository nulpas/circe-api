import * as express from 'express';
import { usersRules } from '../rules/users.rules';
import usersService from '../services/users.service';
import { UserRegisterModel, UserLoginModel } from '../types/user.types';
import { Payload, Request, Response, Router } from '../types/generic.types';
import Users from '../models/users';
import commonService from '../services/common.service';
import toBoolean = require('validator/lib/toBoolean');
import CustomError from '../custom.error';

const usersRouterUnprotected: Router = express.Router();

usersRouterUnprotected.post('/register', usersRules.forRegister, (request: Request, response: Response) => {
  const _payloadObject: Payload = commonService.getPayload(request);
  if (_payloadObject.errors) {
    return response.status(_payloadObject.errors[0].code).json(_payloadObject.errors);
  }
  const payload: UserRegisterModel = _payloadObject.payload;
  return usersService.register(payload).then((u: Users | null) => response.json(u));
});

usersRouterUnprotected.post('/login', usersRules.forLogin, (request: Request, response: Response) => {
  const _payloadObject: Payload = commonService.getPayload(request);
  if (_payloadObject.errors) {
    return response.status(_payloadObject.errors[0].code).json(_payloadObject.errors);
  }
  const payload: UserLoginModel = _payloadObject.payload;
  const token = usersService.login(payload);
  return token.then((t: any) => response.json(t));
});

usersRouterUnprotected.get('/check', (request: Request, response: Response) => {
  const _token: string = commonService.getTokenFromHeaders(request.headers) || request.query.token || request.body.token || '';
  return usersService.verifyToken(_token)
    .then((status: boolean) => response.json({ status }))
    .catch((e: CustomError) => response.status(e.code).json(commonService.formatError(e)));
});

export default usersRouterUnprotected;
