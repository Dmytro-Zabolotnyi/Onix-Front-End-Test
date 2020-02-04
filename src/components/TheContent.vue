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
        router-view(
          v-on:change-notification-counter="changeNotificationCounter($event)",
          v-on:show-new-task-modal="showNewTaskModal()",
          v-on:show-task-description="(...args)=>showTaskDescription(args)")
      TheModal(
        v-if="showModal",
        v-on:new-task-added="(...args)=>addNewTask(args)",
        v-on:close-modal-window="closeModalWindow()",
        v-bind:isNewTaskModalShowed="isNewTaskModalShowed",
        v-bind:isDescriptionModalShowed="isDescriptionModalShowed",
        v-bind:descriptionTask="descriptionTask",
        v-bind:editable="editable",
        v-on:description-updated="(...args)=>saveUpdatedDescription(args)")
</template>

<script lang="ts">
import {
  Vue, Component,
} from 'vue-property-decorator';
import moment from 'moment';
import { proxy } from '@/store';
import TheModal from '@/modals/TheModal.vue';
import TaskClass, { Status } from '@/TaskClass';

@Component({
  name: 'TheContent',
  components: { TheModal },
})
export default class TheContent extends Vue {
  tasksStore = proxy.tasksStore;

  descriptionTask: TaskClass = {
    name: '',
    status: Status.toDo,
    description: '',
    added: '',
    deadline: '',
    animationClass: '',
  };

  showModal: boolean = false;

  editable: boolean = false;

  isNewTaskModalShowed: boolean = false;

  isDescriptionModalShowed: boolean = false;

  created() {
    this.tasksStore.initDeadlineCheck();

    let i = 0;
    const timer = setInterval(() => {
      if (i < this.tasksStore.tasks.length && this.$route.path === '/tasks') {
        this.tasksStore.tasks[i].animationClass += ` ${Status.initial}`;
        i += 1;
      } else {
        clearInterval(timer);
      }
    }, 200);
  }

  // eslint-disable-next-line class-methods-use-this
  addNewTask(args: string[]) {
    const newTask: TaskClass = {
      name: args[0],
      status: Status.toDo,
      description: args[1],
      added: moment().format(this.tasksStore.format),
      deadline: moment(args[2]).format(this.tasksStore.format),
      animationClass: `task ${Status.updated}`,
    };

    this.tasksStore.addTask(newTask);
    this.isNewTaskModalShowed = false;
    this.showModal = false;
  }

  showNewTaskModal() {
    this.isNewTaskModalShowed = true;
    this.showModal = true;
  }

  showTaskDescription(args: any[]) {
    if (typeof args[0] === 'number') {
      this.descriptionTask = this.tasksStore.tasks[args[0]];
      this.isDescriptionModalShowed = true;
      this.showModal = true;
      if (args[1]) {
        this.editable = true;
      }
    } else {
      for (let i = 0; i < this.tasksStore.tasks.length; i += 1) {
        if (Object.is(args[0], this.tasksStore.tasks[i])) {
          this.descriptionTask = this.tasksStore.tasks[i];
          this.isDescriptionModalShowed = true;
          this.showModal = true;
          if (args[1]) {
            this.editable = true;
          }
          break;
        }
      }
    }
  }

  saveUpdatedDescription(args: [TaskClass, string]) {
    let descriptionUpdated: boolean = false;
    for (let i = 0; i < this.tasksStore.tasks.length; i += 1) {
      if (Object.is(args[0], this.tasksStore.tasks[i])) {
        const payload = {
          description: args[1],
          animationClass: Status.updated,
          index: i,
        };
        this.tasksStore.changeTask(payload);
        descriptionUpdated = true;
        this.isDescriptionModalShowed = false;
        this.showModal = false;
        this.editable = false;
        break;
      }
    }
    if (!descriptionUpdated) {
      // eslint-disable-next-line no-alert
      alert('Cannot save changes due to task already changed or deleted.');
    }
  }

  closeModalWindow() {
    this.showModal = false;
    this.isDescriptionModalShowed = false;
    this.isNewTaskModalShowed = false;
    this.editable = false;
  }

  changeNotificationCounter(index: number) {
    this.$emit('change-notification-counter', index);
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
    padding-top: 30px;
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
