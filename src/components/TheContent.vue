<template lang="pug">
  .tabs
    .tab-labels
      .label-container.tasks-label-container
        router-link.link(to='/tasks') Tasks
      .label-container.kanban-label-container
        router-link.link(to='/kanban') Kanban
      .label-container.activity-label-container
        router-link.link(to='/activity') Activity
      .label-container.calendar-label-container
        router-link.link(to='/calendar') Calendar
      .label-container.files-label-container
        router-link.link(to='/files') Files
    .tab-content
      keep-alive
        router-view(v-bind:isTaskClosed="isTaskClosed",
          v-bind:tasks="tasks",
          v-on:change-notification-counter="changeNotificationCounter($event)",
          v-on:task-closed="taskClosed($event)",
          v-on:task-deleted="deleteTask($event)",
          v-on:show-new-task-modal="showNewTaskModal = true",
          v-on:show-task-description="showTaskDescription($event)",
          v-on:change-task-status="(...args)=>changeTaskStatus(args)")
      TheNewTaskModal(v-if="showNewTaskModal",
        v-on:new-task-added="(...args)=>addNewTask(args)",
        v-on:close-new-task-modal="showNewTaskModal = false")
      TheTaskDescriptionModal(v-if="showTaskDescriptionModal",
        v-bind:descriptionTask="descriptionTask",
        v-on:close-task-description-modal="showTaskDescriptionModal = false",
        v-on:description-updated="(...args)=>saveUpdatedDescription(args)")
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import TheNewTaskModal from '@/modals/TheNewTaskModal.vue';
import TheTaskDescriptionModal from '@/modals/TheTaskDescriptionModal.vue';

export interface TaskInterface {
  name: string;
  status: Status;
  description: string;
  deadline: string;
  animationClass: string;
}

export enum Status {
  toDo = 'To Do',
  inProgress = 'In Progress',
  done = 'Done'
}

@Component({
  name: 'TheContent',
  components: { TheNewTaskModal, TheTaskDescriptionModal },
})
export default class TheContent extends Vue {
  @Prop(Boolean) isTaskClosed!:boolean;

  @Watch('tasks.length', { deep: true })
  onTasksLengthChange() {
    this.$emit('change-open-tasks-number', this.tasks.length);
  }

  tasks: TaskInterface[] = [];

  descriptionTask: TaskInterface = {
    name: '',
    status: Status.toDo,
    description: '',
    deadline: TheContent.getRandomTime(),
    animationClass: '',
  };

  showNewTaskModal: boolean = false;

  showTaskDescriptionModal: boolean = false;

  created() {
    this.tasks = [
      {
        name: 'Evening',
        status: Status.inProgress,
        description: "You're a big boy, come up with something.",
        deadline: '11:30 PM',
        animationClass: '',
      },
      {
        name: 'Morning',
        status: Status.inProgress,
        description: 'Wake up!',
        deadline: '11:30 PM',
        animationClass: '',
      },
      {
        name: 'Noon',
        status: Status.inProgress,
        description: 'Work till dusk!',
        deadline: '11:30 PM',
        animationClass: '',
      },
      {
        name: 'Teeth',
        status: Status.done,
        description: "Your dentist told you to brush your teeth twice a day, didn't he?",
        deadline: '11:35 PM',
        animationClass: '',
      },
      {
        name: 'Hair',
        status: Status.done,
        description: 'Make a creative mess today!',
        deadline: '11:35 PM',
        animationClass: '',
      },
      {
        name: 'Shoes',
        status: Status.done,
        description: 'Clean them as if your life depends on it!',
        deadline: '11:35 PM',
        animationClass: '',
      },
      {
        name: 'Eat',
        status: Status.toDo,
        description: 'More powah!',
        deadline: '11:40 PM',
        animationClass: '',
      },
      {
        name: 'Sleep',
        status: Status.toDo,
        description: 'It was a good day, time to let it go and have some sleep.',
        deadline: '11:40 PM',
        animationClass: '',
      },
      {
        name: 'Rave',
        status: Status.toDo,
        description: 'No time to sleep!',
        deadline: '11:40 PM',
        animationClass: '',
      },
      {
        name: 'Repeat',
        status: Status.toDo,
        description: 'Again and again!',
        deadline: '11:40 PM',
        animationClass: '',
      },
    ];

    let i = 0;
    const timer = setInterval(() => {
      if (i < this.tasks.length) {
        this.tasks[i].animationClass = 'task-list-item';
        i += 1;
      } else {
        clearInterval(timer);
      }
    }, 200);
  }

  mounted() {
    this.$emit('change-open-tasks-number', this.tasks.length);
  }

  // eslint-disable-next-line class-methods-use-this
  addNewTask(args: string[]) {
    this.tasks.push({
      name: args[0],
      status: Status.toDo,
      description: args[1],
      deadline: TheContent.getRandomTime(),
      animationClass: '',
    });
    this.showNewTaskModal = false;
  }

  showTaskDescription(task: any) {
    if (typeof task === 'number') {
      this.descriptionTask = this.tasks[task];
      this.showTaskDescriptionModal = true;
    } else {
      for (let i = 0; i < this.tasks.length; i += 1) {
        if (Object.is(task, this.tasks[i])) {
          this.descriptionTask = this.tasks[i];
          this.showTaskDescriptionModal = true;
          break;
        }
      }
    }
  }

  saveUpdatedDescription(args: [TaskInterface, string]) {
    let descriptionUpdated: boolean = false;
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (Object.is(args[0], this.tasks[i])) {
        // eslint-disable-next-line prefer-destructuring
        this.tasks[i].description = args[1];
        this.tasks[i].animationClass = 'added-task-list-item';
        descriptionUpdated = true;
        this.showTaskDescriptionModal = false;
        break;
      }
    }
    if (!descriptionUpdated) {
      // eslint-disable-next-line no-alert
      alert('Cannot save changes due to task already changed or deleted.');
    }
  }

  changeTaskStatus(args: [TaskInterface, string]) {
    let statusUpdated: number = 1;

    for (let i = 0; i < this.tasks.length; i += 1) {
      if (Object.is(args[0], this.tasks[i])) {
        if (args[1] === 'to-do-tasks') {
          this.tasks[i].status = Status.toDo;
          statusUpdated = 0;
        } else if (args[1] === 'in-progress-tasks') {
          this.tasks[i].status = Status.inProgress;
          statusUpdated = 0;
        } else if (args[1] === 'done-tasks') {
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

  changeNotificationCounter(index: number) {
    this.$emit('change-notification-counter', index);
  }

  changeOpenTasksNumber(openTasksNumber: number) {
    this.$emit('change-open-tasks-number', openTasksNumber);
  }

  taskClosed() {
    this.tasks.splice(0, 1);
    this.$emit('task-closed');
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  static getRandomTime() {
    const randomMinutes = Math.floor(Math.random() * 1440);
    const hours: any = (Math.floor(randomMinutes / 60) % 12) + 1;
    let minutes: any = Math.floor(randomMinutes % 60);
    const ampm = (randomMinutes < 720) ? 'AM' : 'PM';

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return (`${hours}:${minutes} ${ampm}`);
  }
}
</script>

<style scoped>
  .tab-content {
    display: -webkit-box;
    display: flex;
    height: 100%;
    width: 100%;
    background: #eeebe5;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
  }

  .tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .label-container a {
    display: block;
    font-size: 16px;
    line-height: 19px;
    color: #131313;
    opacity: 0.7;
    box-sizing: border-box;
    height: min-content;
  }

  .label-container a:hover {
    cursor: pointer;
    opacity: 1.0;
  }

  .label-container .router-link-active {
    opacity: 1;
    border-bottom: 2px #FFC200 solid;
    height: 100%;
  }

  /*noinspection CssInvalidPropertyValue*/
  .tab-labels {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    background: #FFFFFF;
    padding-top: 18px;
    min-height: 35px;
  }

  .tab-labels .label-container {
    display: block;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
    user-select: none;
  }

  .tasks-label-container {
    margin-left: 30px;
  }

  .kanban-label-container {
    margin-left: 32px;
  }

  .activity-label-container {
    margin-left: 27px;
  }

  .calendar-label-container {
    margin-left: 31px;
  }

  .files-label-container {
    margin-left: 27px;
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .tab-content {
      box-sizing: border-box;
      padding: 5vw 5vw;
    }

    .tab-labels {
      height: min-content;
      min-height: unset;
      padding-top: 2.5vw;
    }

    .tab-labels .label-container {
      height: 7vw;
    }

    .label-container a {
      font-size: 3.5vw;
      line-height: 4.5vw;
    }

    .tasks-label-container {
      margin-left: 5vw;
    }

    .kanban-label-container, .activity-label-container,
    .calendar-label-container, .files-label-container {
      margin-left: 7vw;
    }

    .label-container .router-link-active {
      border-bottom: 0.435vw #FFC200 solid;
    }
  }
</style>
