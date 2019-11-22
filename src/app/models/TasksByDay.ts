import { Task } from './Task';
export interface TaskByDay {
  day?: Date;
  tasks?: Task[];
  tasks_successful?: number;
  tasks_canceled?: number;
  tasks_pendent?: number;
  tasks_failed?: number;
}