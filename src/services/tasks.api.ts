import axiosInstance from '@/services/api';
import TaskClass from '@/TaskClass';

export default class TasksApi {
  static getTasks() {
    return axiosInstance.get('/tasks')
      .then(response => response.data)
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }

  static addTask(task: TaskClass) {
    return axiosInstance.post('/tasks', task)
      .then((response: any) => response.data.status === 'ok')
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }

  static editTask(payload: any) {
    return axiosInstance.put('/tasks', { payload: { task: payload.task, index: payload.index } })
      .then((response: any) => response.data.status === 'ok')
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }

  static deleteTask(index: number) {
    return axiosInstance.delete('/tasks', { data: { index } })
      .then((response: any) => response.data.status === 'ok')
      .catch((error: any) => (console.log(`...\n got an error \n...\n${error}`)));
  }
}
