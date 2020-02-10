import {
  createModule, mutation, action,
} from 'vuex-class-component';
import TaskClass, { Status } from '@/TaskClass';
import TasksApi from '@/services/tasks.api';

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
    for (let i = 0; i < this.tasks.length; i += 1) {
      const task = this.tasks[i];
      task.animationClass = this.tasks[i].animationClass.replace(Status.initial, '')
        .replace(Status.updated, '')
        .replace(/ {2}/g, ' ').trim();
      this.tasks.splice(i, 1, task);
    }
  }

  @action async getTasks() {
    this.setTasks(await TasksApi.getTasks().then(response => response));
  }

  @action async pushTask(payload: TaskClass) {
    if (await TasksApi.addTask(payload).then(response => response)) {
      this.addTask(payload);
    }
  }

  @action async setTaskToDel(index: number) {
    if (await TasksApi.deleteTask(index).then(response => response)) {
      this.deleteTask(index);
    }
  }

  @action async setTaskToEdit(payload: any) {
    if (await TasksApi.editTask(payload).then(response => response)) {
      this.changeTask(payload);
    }
  }
}
