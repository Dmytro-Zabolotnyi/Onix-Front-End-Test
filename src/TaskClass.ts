export interface TaskInterface {
  name: string;
  status: Status;
  description: string;
  added: string;
  deadline: string;
  animationClass: string;
}

export enum Status {
  toDo = 'to-do',
  inProgress = 'in-progress',
  done = 'done',
  error = 'error',
  warning = 'warning',
  initial = 'initial',
  updated = 'updated',
}

export default class TaskClass implements TaskInterface {
  name = '';

  status = Status.toDo;

  description = '';

  added = '';

  deadline = '';

  animationClass = '';
}
