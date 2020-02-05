import * as dotEnv from 'dotenv';
import configFile from '../config/config.json';
import { Sequelize } from 'sequelize';
import Users from './users';
import { AppModelDescriptor, AppModelsHash } from '../types/generic.types';
import Activities from './activities';

dotEnv.config();
const env: string = process.env.NODE_ENV || 'development';

console.log('####################### NODE_ENV: ', process.env.NODE_ENV, 'models/index.ts');

const config: any = configFile[env];
const models: AppModelsHash = {};
const modelsArray: Array<AppModelDescriptor> = [
  { model: Users, tableName: 'users' },
  { model: Activities, tableName: 'activities' }
];

export const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

modelsArray.forEach((m: AppModelDescriptor) => {
  m.model.init(m.model.attributes, { tableName: m.tableName, sequelize });
  models[m.model.name.toLowerCase()] = m.model;
});

export default models;
