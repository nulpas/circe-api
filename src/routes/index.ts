import usersRouter from './users.router';
import activitiesRouter from './activities.router';
import { Router } from '../types/generic.types';

export interface SuScheduleRouter {
  [routerName: string]: Router;
}

export default {
  usersRouter,
  activitiesRouter
} as SuScheduleRouter;
