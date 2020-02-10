import axiosInstance from '@/services/api';
// eslint-disable-next-line import/no-cycle
import { proxy } from '@/store';
import TaskClass from '@/TaskClass';

export default class TasksApi {
  static async getTasks() {
    await axiosInstance.get('/tasks')
      .then((response: any) => {
        proxy.tasksStore.getTasks(response.data);
      })
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }

  static async addTask(task: TaskClass) {
    await axiosInstance.post('/tasks', task)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          proxy.tasksStore.pushTask(task);
        }
      })
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }

  static async editTask(payload: any) {
    await axiosInstance.put('/tasks', { payload: { task: payload.task, index: payload.index } })
      .then((response: any) => {
        if (response.data.status === 'ok') {
          proxy.tasksStore.setTaskToEdit(payload);
        }
      })
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }

  static async deleteTask(index: number) {
    await axiosInstance.delete('/tasks', { data: { index } })
      .then((response: any) => {
        if (response.data.status === 'ok') {
          proxy.tasksStore.setTaskToDel(index);
        }
      })
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }
}
