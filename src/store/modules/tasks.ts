import {
  createModule, mutation, action,
} from 'vuex-class-component';
import TaskClass, { Status } from '@/TaskClass';

const VuexModule = createModule({
  namespaced: 'tasksStore',
  strict: false,
});

export default class TasksStore extends VuexModule {
  completedTasksNumber: number = 372;

  tasks: TaskClass[] = [];

  @mutation setTasks(tasks: any) {
    this.tasks = tasks;
  }

  @mutation addTask(payload: TaskClass) {
    this.tasks.push(payload);
  }

  @mutation deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  @mutation changeTask(payload: any) {
    this.tasks.splice(payload.index, 1, payload.task);
  }

  @mutation onTasksTabLeave() {
    this.tasks.forEach((task) => {
      // eslint-disable-next-line no-param-reassign
      task.animationClass = task.animationClass.replace(Status.initial, '')
        .replace(Status.updated, '')
        .replace(/ {2}/g, ' ').trim();
    });
  }

  @action async getTasks(tasks: any) {
    this.setTasks(tasks);
  }

  @action async pushTask(payload: TaskClass) {
    this.addTask(payload);
  }

  @action async setTaskToDel(index: number) {
    this.deleteTask(index);
  }

  @action async setTaskToEdit(payload: any) {
    this.changeTask(payload);
  }
}
