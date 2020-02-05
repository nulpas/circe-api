import * as bcrypt from 'bcryptjs';
import { check } from 'express-validator';
import models from '../models';
import Users from '../models/users';
import { Promise } from 'bluebird';

const users: typeof Users = models.users as typeof Users;

export const usersRules = {
  forRegister: [
    check('name')
      .exists().withMessage('Name required. No parameter name in request')
      .custom((name: string) => !!name).withMessage('Name required'),
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom((email: string) => users.findAndCountAll({ where: { email } }).then((r: any) => {
        if (r.count) {
          return Promise.reject(new Error(''));
        }
      })).withMessage('Email exists'),
    check('password')
      .isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom(
        (confirmPassword: string, { req }) => req.body.password === confirmPassword
      ).withMessage('Passwords are different')
  ],
  forLogin: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom((email) => {
        return users.findOne({ where: { email } }).then((u: any) => {
          if (!!u && !u.active) {
            return Promise.reject(new Error(''));
          }
        });
      }).withMessage('Your user needs to be activated'),
    check('password')
      .custom((password, { req }) => {
        return users.findOne({ where: { email: req.body.email } }).then((u: any) => {
          return (!u) ?
            Promise.reject(new Error('')) :
            bcrypt.compare(password, u.password).then((r: boolean) => {
              if (!r) {
                return Promise.reject(new Error(''));
              }
            });
        });
      }).withMessage('Invalid email or password')
  ],
  forUserActive: [
    check('active').exists().withMessage('Active status is required')
  ]
};
