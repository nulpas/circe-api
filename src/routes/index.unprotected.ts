import usersRouterUnprotected from './users.unprotected.router';
import { Router } from '../types/generic.types';

export interface SuScheduleRouterUnprotected {
  [routerUnprotectedName: string]: Router;
}

export default {
  usersRouterUnprotected
} as SuScheduleRouterUnprotected;
