<template lang="pug">
  .kanban-container.container
    .kanban
      .to-do-container
        span.label To do:
        draggable.to-do-tasks(
          group="draggable",
          v-model="tasksToDo",
          v-bind="dragOptions",
          :move="onMove")
          .task(v-for="task in tasksToDo" v-bind:key="task.id",
            @click="showDescription(task)")
            span.task-name {{ task.name }}
            span.task-deadline {{ task.deadline }}
      .in-progress-container
        span.label In progress:
        draggable.in-progress-tasks(
          group="draggable",
          v-model="tasksInProgress",
          v-bind="dragOptions",
          :move="onMove")
          .task(v-for="task in tasksInProgress" v-bind:key="task.id",
            @click="showDescription(task)")
            span.task-name {{ task.name }}
            span.task-deadline {{ task.deadline }}
      .done-container
        span.label Done:
        draggable.done-tasks(
          group="draggable",
          v-model="tasksDone",
          v-bind="dragOptions",
          :move="onMove")
          .task(v-for="task in tasksDone" v-bind:key="task.id",
            @click="showDescription(task)")
            span.task-name {{ task.name }}
            span.task-deadline {{ task.deadline }}
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import draggable from 'vuedraggable';
import TheTaskDescriptionModal from '@/modals/TheTaskDescriptionModal.vue';
// @ts-ignore
import { TaskInterface, Status } from '@/components/TheContent.vue';

@Component({
  name: 'TheKanbanTab',
  components: { TheTaskDetailsModal: TheTaskDescriptionModal, draggable },
})
export default class TheKanbanTab extends Vue {
  @Prop() tasks!:TaskInterface[];

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newValue: any, oldValue: any) {
    if (typeof oldValue === 'undefined' || (newValue.path === '/kanban')) {
      this.tasksToDo = this.getTasksToDo;
      this.tasksInProgress = this.getTasksInProgress;
      this.tasksDone = this.getTasksDone;
    }
  }

  tasksToDo: TaskInterface[] = this.getTasksToDo;

  tasksInProgress: TaskInterface[] = this.getTasksInProgress;

  tasksDone: TaskInterface[] = this.getTasksDone;

  onMove(event: { to: { className: string; }; from: { className: string; };
    relatedContext: { element: TaskInterface; }; draggedContext: { element: TaskInterface; }; }) {
    if ((event.from.className === 'done-tasks') && (event.to.className === 'to-do-tasks')) {
      return false;
    }

    const relatedElement: TaskInterface = event.relatedContext.element;
    const draggedElement: TaskInterface = event.draggedContext.element;

    if (event.from.className !== event.to.className) {
      this.$emit('change-task-status', draggedElement, event.to.className);
    }
    return ((!relatedElement || !relatedElement.fixed) && !draggedElement.fixed);
  }

  showDescription(index: number) {
    this.$emit('show-task-description', index);
  }

  get getTasksToDo() {
    return this.tasks.filter(task => (task.status === Status.toDo));
  }

  get getTasksInProgress() {
    return this.tasks.filter(task => (task.status === Status.inProgress));
  }

  get getTasksDone() {
    return this.tasks.filter(task => (task.status === Status.done));
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

  .task-name {
    padding: 3px;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 15px;
    line-height: 18px;
  }

  .task-deadline {
    font-size: 12px;
    margin-left: auto;
    padding-left: 5px;
    padding-bottom: 5px;
    opacity: 0.7;
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

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
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
  }
</style>
