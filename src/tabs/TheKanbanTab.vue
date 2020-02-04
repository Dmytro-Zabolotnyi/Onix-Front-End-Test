<template lang="pug">
  .kanban-container.container
    .filter-container
      .date-pickers
        datetime.start-date(
          type="datetime",
          input-id="startDate",
          v-model="startDate",
          placeholder="input start date...",
          use12-hour,
          format="dd:MM:yyyy, hh:mm a")
        span.arrows &#8660
        datetime.end-date(
          type="datetime",
          input-id="finishDate"
          v-model="finishDate",
          placeholder="input end date...",
          use12-hour,
          format="dd:MM:yyyy, hh:mm a")
        button.clear-dates-button(v-if="!datesAreEmpty",
          @click="[startDate = '', finishDate = '']") &#128197 Clear
      input.search-input(type="text", v-model="searchName", placeholder="search by task name...")
    .kanban
      .to-do-container
        span.label To do: {{ filteredToDo.length }}
        draggable.to-do-tasks(
          group="draggable",
          v-model="filteredToDo",
          v-bind="dragOptions",
          :move="onMove")
          div(v-for="task in filteredToDo" v-bind:key="task.id",
            @click="showDescription(task)",
            v-bind:class="[styles.toDo, task.animationClass]")
            span.task-name {{ task.name }}
            .task-deadline-container
              span.error(v-if="isDeadlineReached(task.animationClass)",
                v-bind:style="{ backgroundImage: 'url(' + errorSVG + ')' }")
              span.warning(v-else-if="isDeadlineClose(task.animationClass)") &#9888
              .task-deadline.date {{ deadlineDate(task.deadline) }}
              .task-deadline.time {{ deadlineTime(task.deadline) }}
      .in-progress-container
        span.label In progress: {{ filteredInProgress.length }}
        draggable.in-progress-tasks(
          group="draggable",
          v-model="filteredInProgress",
          v-bind="dragOptions",
          :move="onMove")
          div(v-for="task in filteredInProgress" v-bind:key="task.id",
            @click="showDescription(task)",
            v-bind:class="[styles.inProgress, task.animationClass]")
            span.task-name {{ task.name }}
            .task-deadline-container
              span.error(v-if="isDeadlineReached(task.animationClass)",
                v-bind:style="{ backgroundImage: 'url(' + errorSVG + ')' }")
              span.warning(v-else-if="isDeadlineClose(task.animationClass)") &#9888
              .task-deadline.date {{ deadlineDate(task.deadline) }}
              .task-deadline.time {{ deadlineTime(task.deadline) }}
      .done-container
        span.label Done: {{ filteredDone.length }}
        draggable.done-tasks(
          group="draggable",
          v-model="filteredDone",
          v-bind="dragOptions",
          :move="onMove")
          .task(v-for="task in filteredDone" v-bind:key="task.id",
            @click="showDescription(task)",
            v-bind:class="[styles.done, task.animationClass]")
            span.task-name {{ task.name }}
            .task-deadline-container
              .task-deadline.date {{ deadlineDate(task.deadline) }}
              .task-deadline.time {{ deadlineTime(task.deadline) }}
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import moment from 'moment';
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon';
import TaskClass, { Status } from '@/TaskClass';
import { proxy } from '@/store';

Settings.defaultLocale = 'en-gb';

  @Component({
    name: 'TheKanbanTab',
    components: { draggable, Datetime, Settings },
  })
export default class TheKanbanTab extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newValue: any, oldValue: any) {
    if (typeof oldValue === 'undefined' || (newValue.path === '/kanban')) {
      this.tasksToDo = this.getTasks(Status.toDo);
      this.tasksInProgress = this.getTasks(Status.inProgress);
      this.tasksDone = this.getTasks(Status.done);
    }
  }

  @Watch('filtersCleared')
  onFiltersCleared(newValue: boolean) {
    if (newValue) {
      this.tasksToDo = this.getTasks(Status.toDo);
      this.tasksInProgress = this.getTasks(Status.inProgress);
      this.tasksDone = this.getTasks(Status.done);
    }
  }

  tasksToDo: TaskClass[] = this.getTasks(Status.toDo);

  tasksInProgress: TaskClass[] = this.getTasks(Status.inProgress);

  tasksDone: TaskClass[] = this.getTasks(Status.done);

  startDate = '';

  finishDate = '';

  searchName: string = '';

  format: string = proxy.tasksStore.format;

  styles = {
    toDo: Status.toDo,
    inProgress: Status.inProgress,
    done: Status.done,
  };

  errorSVG: string = 'images/Cross_red_circle.svg';

  // eslint-disable-next-line class-methods-use-this
  getTasks(status: string) {
    return proxy.tasksStore.tasks.filter(task => (task.status === status));
  }

  // eslint-disable-next-line class-methods-use-this
  onMove(event: any) {
    if ((event.from.className === 'done-tasks') && (event.to.className === 'to-do-tasks')) {
      return false;
    }

    const relatedElement = event.relatedContext.element;
    const draggedElement = event.draggedContext.element;

    if (event.from.className !== event.to.className) {
      const payload = {
        taskToUpdate: draggedElement,
        newStatus: event.to.className,
      };
      proxy.tasksStore.changeTaskStatus(payload);
    }
    return ((!relatedElement || !relatedElement.fixed) && !draggedElement.fixed);
  }

  // eslint-disable-next-line class-methods-use-this
  isDeadlineReached(animation: string) {
    return animation.includes(Status.error);
  }

  // eslint-disable-next-line class-methods-use-this
  isDeadlineClose(animation: string) {
    return animation.includes(Status.warning);
  }

  showDescription(task: TaskClass) {
    this.$emit('show-task-description', task, true);
  }

  get filtersCleared() {
    return (this.startDate === '' && this.finishDate === '' && this.searchName === '');
  }

  get filteredToDo() {
    return this.filterTasks(this.tasksToDo);
  }

  get filteredInProgress() {
    return this.filterTasks(this.tasksInProgress);
  }

  get filteredDone() {
    return this.filterTasks(this.tasksDone);
  }

  set filteredToDo(array: TaskClass[]) {
    this.tasksToDo = array;
  }

  set filteredInProgress(array: TaskClass[]) {
    this.tasksInProgress = array;
  }

  set filteredDone(array: TaskClass[]) {
    this.tasksDone = array;
  }

  // eslint-disable-next-line class-methods-use-this
  deadlineDate(deadline: string) {
    return moment(deadline, this.format).format('DD-MM-YYYY,');
  }

  // eslint-disable-next-line class-methods-use-this
  deadlineTime(deadline: string) {
    return moment(deadline, this.format).format('hh:mm A');
  }

  filterTasks(array: TaskClass[]) {
    let tasksToFilter: TaskClass[] = [...array];
    if (this.startDate !== '' && this.finishDate === '') {
      tasksToFilter = tasksToFilter.filter(task => (
        moment(task.deadline, this.format) >= this.startDateToMoment));
    } else if (this.startDate === '' && this.finishDate !== '') {
      tasksToFilter = tasksToFilter.filter(task => (
        moment(task.deadline, this.format) <= this.finishDateToMoment));
    } else if (this.startDate !== '' && this.finishDate !== '') {
      tasksToFilter = tasksToFilter.filter(task => (
        (moment(task.deadline, this.format) >= this.startDateToMoment)
        && (moment(task.deadline, this.format) <= this.finishDateToMoment)));
    }

    if (this.searchNameToUppercase !== '') {
      tasksToFilter = tasksToFilter.filter(task => (
        task.name.toUpperCase().includes(this.searchNameToUppercase)));
    }

    return tasksToFilter;
  }

  get searchNameToUppercase() {
    return this.searchName.toUpperCase();
  }

  get startDateToMoment() {
    return moment(this.startDate);
  }

  get finishDateToMoment() {
    return moment(this.finishDate);
  }

  get datesAreEmpty() {
    return (this.startDate === '' && this.finishDate === '');
  }

  // eslint-disable-next-line class-methods-use-this
  get dragOptions() {
    return {
      ghostClass: 'ghost',
    };
  }
}
</script>

<style scoped>
  .kanban-container {
    padding-bottom: 0;
  }

  .filter-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 15px;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 3px double grey;
  }

  .filter-container .arrows {
    height: 30px;
    margin: 0 5px;
    line-height: 30px;
    font-size: 17px;
  }

  .end-date {
    margin-right: 15px;
  }

  .clear-dates-button {
    display: block;
    width: min-content;
    white-space: nowrap;
    height: 30px;
    box-sizing: border-box;
    padding: 0 15px;
    border: none;
    border-radius: 15px;
    background: #ffcfb6;
    color: #cc4403;
    font-size: 14px;
    line-height: 30px;
    transition: box-shadow 0.3s;
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  .clear-dates-button:hover {
    box-shadow: 0 0 5px black;
  }

  .search-input {
    margin-left: auto;
    box-sizing: border-box;
    width: 150px;
    font-size: 13px;
    height: 30px;
    padding: 5px;
    border: 1px grey solid;
    border-radius: 8px;
    background: #f5f5f5;
  }

  .kanban {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .to-do-container, .in-progress-container, .done-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }

  .ghost {
    opacity: 0.5;
    box-shadow: 0 0 5px black;
  }

  .to-do-container {
    margin-right: 10px;
  }

  .in-progress-container {
    margin-right: 10px;
  }

  .label {
    margin-bottom: 10px;
    padding-left: 18px;
    font-size: 17px;
    color: dimgrey;
  }

  .to-do-tasks, .in-progress-tasks, .done-tasks {
    flex: 1;
    border: 1px grey dashed;
    border-top: none;
    border-radius: 12px;
    padding: 5px;
    margin-bottom: 30px;
  }

  .to-do-tasks .error, .in-progress-tasks .error {
    border: 1px solid #dd3333;
  }

  .to-do-tasks .warning, .in-progress-tasks .warning {
    border: 1px solid #ffae4b;
  }

  .task {
    background: #F7F6F3;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    cursor: pointer;
  }

  .task + .task {
    margin-top: 5px;
  }

  .to-do {
    background: #E3EFFF;
  }

  .in-progress {
    background: #FFF8DD;
  }

  .done {
    background: #CEF9C6;
  }

  .task-name {
    padding: 3px;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 15px;
    line-height: 18px;
  }

  .task-deadline-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .task-deadline {
    font-size: 12px;
    padding-left: 5px;
    opacity: 0.7;
    position: relative;
    white-space: nowrap;
  }

  .task-deadline-container .warning, .task-deadline-container .error {
    border: none;
    width: 12px;
    height: 12px;
    text-align: center;
  }

  .task-deadline-container .warning {
    color: #ffae4b;
    font-size: 12px;
    line-height: 12px;
  }

  .task-deadline-container .error {
    display: block;
    font-size: 12px;
    line-height: 12px;
    border-radius: 50%;
    color: white;
    background: #cc4403;
  }

  @media screen and (max-width: 1320px), (max-aspect-ratio: 1320/920) and (max-width: 1320px) {
    .date-pickers {
      width: 100%;
      margin-bottom: 10px;
      justify-content: center;
    }

    .search-input {
      margin: auto;
    }
  }

  @media screen and (max-width: 710px), (max-aspect-ratio: 710/959) and (max-width: 710px) {
    .kanban {
      flex-direction: column;
      align-content: flex-start;
    }

    .to-do-container, .in-progress-container, .done-container {
      height: min-content;
      flex: none;
    }

    .to-do-container, .in-progress-container {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 610px), (max-aspect-ratio: 610/920) and (max-width: 610px) {
    .date-pickers {
      flex-wrap: wrap;
      height: min-content;
    }

    .end-date {
      margin-right: 0;
    }

    .clear-dates-button {
      margin-top: 5px;
    }
  }

  @media screen and (max-width: 520px), (max-aspect-ratio: 520/920) and (max-width: 520px) {
    .search-input {

    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .filter-container {
      padding-bottom: 3.5vw;
      margin-bottom: 3.5vw;
      border-width: 0.65vw;
    }

    .date-pickers {
      margin-bottom: 2.5vw;
    }

    .clear-dates-button {
      height: 7vw;
      font-size: 3.1vw;
      line-height: 7vw;
      padding: 0 3.25vw;
      margin-top: 1vw;
    }

    .filter-container .arrows {
      height: 7vw;
      line-height: 7vw;
      font-size: 3.7vw;
      margin: 0 1.3vw;
    }

    .search-input {
      height: 7vw;
      width: 35vw;
      font-size: 2.7vw;
      line-height: 7vw;
      padding: 0 3.25vw;
    }

    .label {
      margin-bottom: 2.2vw;
      padding-left: 3.7vw;
      font-size: 3.7vw;
    }

    .to-do-container, .in-progress-container, .done-container {
      height: min-content;
      flex: none;
    }

    .to-do-tasks, .in-progress-tasks, .done-tasks {
      border-width: 0.22vw;
      border-radius: 2.7vw;
      padding: 1.1vw;
      margin-bottom: 6.6vw;
      height: min-content;
    }

    .to-do-tasks .error, .in-progress-tasks .error,
    .to-do-tasks .warning, .in-progress-tasks .warning {
      border-width: 0.22vw;
    }

    .task {
      border-radius: 2.2vw;
      padding: 2.2vw;
    }

    .task:hover {
      box-shadow: 0 0 1.1vw black;
    }

    .task + .task {
      margin-top: 1.1vw;
    }

    .task-name {
      padding: 0.65vw;
      font-size: 3.3vw;
      line-height: 4vw;
    }

    .task-deadline {
      font-size: 2.7vw;
      padding-left: 2.2vw;
      padding-bottom: 2.2vw;
    }

    .task-deadline-container .warning, .task-deadline-container .error {
      width: 2.7vw;
      height: 2.7vw;
    }

    .task-deadline-container .warning {
      font-size: 2.7vw;
      line-height: 2.7vw;
    }

    .task-deadline-container .error {
      font-size: 2.7vw;
      line-height: 2.7vw;
    }
  }
</style>
