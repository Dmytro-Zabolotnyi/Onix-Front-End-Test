<template lang="pug">
  #kanban-container.container
    #kanban
      #to-do-container
        span.label To do:
        #to-do-tasks
          .task(v-for="task in tasksToDo" v-bind:key="task.id")
            span.task-name {{ task.name }}
            span.task-deadline {{ task.deadline }}
      #in-progress-container
        span.label In progress:
        #in-progress-tasks
          .task(v-for="task in tasksInProgress" v-bind:key="task.id")
            span.task-name {{ task.name }}
            span.task-deadline {{ task.deadline }}
      #done-container
        span.label Done:
        #done-tasks
          .task(v-for="task in tasksDone" v-bind:key="task.id")
            span.task-name {{ task.name }}
            span.task-deadline {{ task.deadline }}
</template>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';
// @ts-ignore
import { TaskInterface, Status } from '@/components/TheContent.vue';

@Component({
  name: 'TheKanbanTab',
})
export default class TheKanbanTab extends Vue {
  @Prop() tasks!:TaskInterface[];

  get tasksToDo() {
    return this.tasks.filter(task => (task.status === Status.toDo));
  }

  get tasksInProgress() {
    return this.tasks.filter(task => (task.status === Status.inProgress));
  }

  get tasksDone() {
    return this.tasks.filter(task => (task.status === Status.done));
  }
}
</script>

<style scoped>
  #kanban-container {
    padding-bottom: 0;
  }

  #kanban {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  #to-do-container, #in-progress-container, #done-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }

  #to-do-container {
    margin-right: 10px;
  }

  #in-progress-container {
    margin-right: 10px;
  }

  .label {
    margin-bottom: 10px;
    padding-left: 18px;
    font-size: 17px;
    color: dimgrey;
  }

  #to-do-tasks, #in-progress-tasks, #done-tasks {
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
    transition: 0.3s box-shadow;
  }

  .task:hover {
    box-shadow: 0 0 5px black;
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
    #kanban {
      flex-direction: column;
      align-content: flex-start;
    }

    #to-do-container, #in-progress-container, #done-container {
      flex: none;
    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    #to-do-container {
      margin-right: 2.2vw;
    }

    #in-progress-container {
      margin-right: 2.2vw;
    }

    .label {
      margin-bottom: 2.2vw;
      padding-left: 3.7vw;
      font-size: 3.7vw;
    }

    #to-do-tasks, #in-progress-tasks, #done-tasks {
      border-width: 0.22vw;
      border-radius: 2.7vw;
      padding: 1.1vw;
      margin-bottom: 6.6vw;
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
