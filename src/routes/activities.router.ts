import * as express from 'express';
import { Request, Response, Router } from '../types/generic.types';

const activitiesRouter: Router = express.Router();

activitiesRouter.get('/activities', (request: Request, response: Response) => {
  response.json('Testing separated routes...');
});

export default activitiesRouter;
