import * as express from 'express';
import Users from '../models/users';
import Activities from '../models/activities';

/**
 * EXPRESS TYPES
 */

export type Request = express.Request;
export type Response = express.Response;
export type Router = express.Router;
export type RequestHandler = express.RequestHandler;
export type NextFunction = express.NextFunction;

/**
 * SEQUELIZE TYPES
 */

export type AppModels = typeof Users | typeof Activities;
export interface AppModelsHash {
  [modelName: string]: AppModels;
}
export interface AppModelDescriptor {
  model: AppModels;
  tableName: string;
}

/**
 * ERROR TYPES
 */

export interface ApiError {
  code: number;
  location: string;
  msg: string;
  param: string;
  value: string | number | boolean;
}

/**
 * API TYPES
 */

export interface Payload {
  payload: any;
  errors: Array<ApiError> | null;
}
