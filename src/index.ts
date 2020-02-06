import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import * as dotEnv from 'dotenv';
import * as configFile from './config/config.json';
import { sequelize } from './models';
import routes from './routes';
import routesUnprotected from './routes/index.unprotected';
import { tokenGuard } from './middlewares/token-guard';
import { Request, Response } from './types/generic.types';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

dotEnv.config();
const env: string = process.env.NODE_ENV || 'development';
const app: Express = express();
const port: number = 4001;

sequelize.sync()
  .then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.get('/', (request: Request, response: Response) => {
      response.json('Hello World, how are you?');
    });

    Object.keys(routesUnprotected).forEach((e: string) => {
      app.use('/', routesUnprotected[e]);
    });

    if (env === 'development') {
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.load(path.resolve(__dirname, './swagger.yml'))));
    }

    app.use('/healthcheck', (request: Request, response: Response) => {
      const _env: string = process.env.NODE_ENV || 'development';
      const config: any = configFile[_env];
      const sequelizeTest: Sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect
      });
      return sequelizeTest
        .authenticate()
        .then(() => response.sendStatus(200))
        .catch((e) => response.status(500).json(e));
    });

    // ## Activated authentication from here:
    app.use(tokenGuard());

    // ## Loads all routes that need token authentication.
    Object.keys(routes).forEach((e: string) => {
      app.use('/', routes[e]);
    });

    // ## Protected route test
    app.get('/protected', (request: Request, response: Response) => {
      response.json('Protected Hello World');
    });

    app.listen(port, 'localhost', () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error: any) => {
    throw new Error(error);
  });
