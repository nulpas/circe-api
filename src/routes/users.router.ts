import * as express from 'express';
import models from '../models';
import usersService from '../services/users.service';
import { Payload, Request, Response, Router } from '../types/generic.types';
import Users from '../models/users';
import { usersRules } from '../rules/users.rules';
import { UserUpdateModel } from '../types/user.types';
import commonService from '../services/common.service';
import CustomError from '../custom.error';

const usersRouter: Router = express.Router();
const users: typeof Users = models.users as typeof Users;

usersRouter.get('/users', (request: Request, response: Response) => {
  users.findAll()
    .then((u: Array<Users>) => response.json(u))
    .catch((e: Error) => response.status(500).json(commonService.formatError(e)));
});

usersRouter
  .get('/user/:userId', (request: Request, response: Response) => {
    usersService.getUserById(Number(request.params.userId))
      .then((user: Users | null) => response.json(user))
      .catch((e: CustomError) => response.status(e.code).json(commonService.formatError(e)));
  })
  .put('/user/:userId', (request: Request, response: Response) => {
    const _userId: number = Number(request.params.userId);

    return usersService.updateUser(_userId, request.body)
      .then((u: Users | null | undefined) => response.json(u))
      .catch((e: CustomError) => response.status(e.code).json(commonService.formatError(e)));
  });

usersRouter.put('/user/:userId/active', usersRules.forUserActive, (request: Request, response: Response) => {
  const _userId: number = Number(request.params.userId);
  const _payloadObject: Payload = commonService.getPayload(request);
  if (_payloadObject.errors) {
    return response.status(_payloadObject.errors[0].code).json(_payloadObject.errors);
  }
  const payload: UserUpdateModel = _payloadObject.payload;

  return usersService.updateUser(_userId, payload)
    .then((u: Users | null | undefined) => response.json(u))
    .catch((e: CustomError) => response.status(e.code).json(commonService.formatError(e)));
});

export default usersRouter;
