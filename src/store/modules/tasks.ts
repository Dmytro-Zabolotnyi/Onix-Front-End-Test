import {
  createModule, mutation,
} from 'vuex-class-component';
import moment, { Moment } from 'moment';
import TaskClass, { Status } from '@/TaskClass';

const VuexModule = createModule({
  namespaced: 'tasksStore',
  strict: false,
});

const now: Moment = moment();

const past: Moment = now.clone().subtract(2, 'days');

const future: Moment = now.clone().add(3, 'days');

const format: string = 'DD-MM-YYYY, hh:mm A';

export default class TasksStore extends VuexModule {
  completedTasksNumber: number = 372;

  format: string = format;

  tasks: TaskClass[] = [
    {
      name: 'Eat',
      status: Status.toDo,
      description: 'More powah!',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Sleep',
      status: Status.toDo,
      description: 'It was a good day, time to let it go and have some sleep.',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Rave',
      status: Status.toDo,
      description: 'No time to sleep!',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Repeat',
      status: Status.toDo,
      description: 'Again and again!',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Morning',
      status: Status.inProgress,
      description: 'Wake up!',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Noon',
      status: Status.inProgress,
      description: 'Work till dusk!',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Evening',
      status: Status.inProgress,
      description: "You're a big boy, come up with something.",
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Teeth',
      status: Status.done,
      description: "Your dentist told you to brush your teeth twice a day, didn't he?",
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Hair',
      status: Status.done,
      description: 'Make a creative mess today!',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
    {
      name: 'Shoes',
      status: Status.done,
      description: 'Clean them as if your life depends on it!',
      added: moment(this.getRandomTime().subtract(4, 'days'), this.format).format(this.format),
      deadline: moment(this.getRandomTime(), this.format).format(this.format),
      animationClass: 'task',
    },
  ];

  @mutation addTask(payload: TaskClass) {
    this.deadlineCheck(payload);
    this.tasks.push(payload);
  }

  @mutation deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  @mutation changeTask(payload: any) {
    this.tasks[payload.index].description = payload.description;
    this.tasks[payload.index].animationClass += ` ${payload.animationClass}`;
  }

  @mutation changeTaskStatus(payload: any) {
    let statusUpdated: number = 1;

    for (let i = 0; i < this.tasks.length; i += 1) {
      if (Object.is(payload.taskToUpdate, this.tasks[i])) {
        if (payload.newStatus === 'to-do-tasks') {
          this.tasks[i].status = Status.toDo;
          statusUpdated = 0;
        } else if (payload.newStatus === 'in-progress-tasks') {
          this.tasks[i].status = Status.inProgress;
          statusUpdated = 0;
        } else if (payload.newStatus === 'done-tasks') {
          this.tasks[i].status = Status.done;
          statusUpdated = 0;
        } else statusUpdated = -1;
        break;
      }
    }
    if (statusUpdated > 0) {
      // eslint-disable-next-line no-alert
      alert('Cannot save changes due to task already changed or deleted.');
    } else if (statusUpdated < 0) {
      // eslint-disable-next-line no-alert
      alert('Cannot save changes due to unknown parameter passed.');
    }
  }

  @mutation initDeadlineCheck() {
    this.tasks.forEach((task: TaskClass) => {
      this.deadlineCheck(task);
    });
  }

  // eslint-disable-next-line class-methods-use-this,func-names
  deadlineCheck = function (task: TaskClass) {
    const deadline = moment(task.deadline, format);
    if (deadline < moment()) {
      // eslint-disable-next-line no-param-reassign
      task.animationClass += ` ${Status.error}`;
    } else if (deadline.clone().subtract(24, 'hours') < moment()) {
      // eslint-disable-next-line no-param-reassign
      task.animationClass += ` ${Status.warning}`;
    }
  };

  @mutation onTasksTabLeave() {
    this.tasks.forEach((task) => {
      // eslint-disable-next-line no-param-reassign
      task.animationClass = task.animationClass.replace(Status.initial, '')
        .replace(Status.updated, '')
        .replace(/ {2}/g, ' ').trim();
    });
  }

  @mutation closeTask() {
    this.tasks.splice(0, 1);
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomTime() {
    const futureMillis: number = parseInt(future.format('X'), 10);
    const pastMillis: number = parseInt(past.format('X'), 10);
    const randomMillis = Math.floor(Math.random() * (futureMillis - pastMillis + 1)) + pastMillis;

    return moment.unix(randomMillis);
  }
}
