import { Model } from 'sequelize';

/**
 * MODELS
 */

export interface UserModel extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegisterModel extends Model<UserModel> {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginModel extends Model<UserModel> {
  email: string;
}

export interface UserUpdateModel extends Model<UserModel> {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
}

/**
 * RESPONSES
 */

export interface ResponseUser {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export interface ResponseLogin {
  token: string;
}

/**
 * REQUESTS
 */

export interface RequestUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RequestUserLogin {
  id: number;
  email: string;
}
