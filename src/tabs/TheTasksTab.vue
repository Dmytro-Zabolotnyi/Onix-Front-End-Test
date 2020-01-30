import moment from "moment";
<template lang="pug">
  .tasks-container.container
    .tasks
      button.new-task-add-button(@click="showNewTaskModal()") + Add new task
      ul
        li(v-for="(task, index) in tasks", v-bind:key="index", v-bind:class="task.animationClass")
          .task-upper-row
            span.task-name {{ task.name }}
            .task-delete-button(@click="deleteTask(index)") &#215
          span.task-description(@click="showDescription(index)") {{ task.description }}
          span.task-deadline {{ task.deadline.format('DD:MM:YYYY, hh:mm A') }}
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import moment from 'moment';
// @ts-ignore
import { TaskInterface, Status } from '@/components/TheContent.vue';

@Component({
  name: 'TheTasksTab',
})
export default class TheTasksTab extends Vue {
  @Prop(Boolean) isTaskClosed!:boolean;

  @Prop() tasks!:TaskInterface[];

  @Watch('isTaskClosed', { immediate: true, deep: true })
  taskCompletionInitiated() {
    if (this.isTaskClosed) {
      this.$emit('task-closed');
    }
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newValue: any, oldValue: any) {
    if ((typeof oldValue !== 'undefined') && (oldValue.path === '/tasks')) {
      this.tasks.forEach((task) => {
        // eslint-disable-next-line no-param-reassign
        task.animationClass = task.animationClass.replace(this.initialAnimation, '').replace(this.updatedAnimation, '');
      });
    }
  }

  newTask: TaskInterface = {
    name: '',
    status: Status.toDo,
    description: '',
    deadline: moment(),
    animationClass: '',
  };

  initialAnimation: string = ' initial';

  updatedAnimation: string = ' updated';

  deleteTask(index: number) {
    if (this.tasks.length > 0) {
      this.$emit('task-deleted', index);
    }
  }

  showDescription(index: number) {
    this.$emit('show-task-description', index);
  }

  showNewTaskModal() {
    this.$emit('show-new-task-modal');
  }
}
</script>

<style scoped>
  .tasks {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .initial .task-name {
    animation: initiation-name 0.7s 2 ease-in-out alternate;
  }
  .initial .task-description {
    animation: initiation-description 0.7s 2 ease-in-out alternate;
  }
  .initial .task-deadline {
    animation: initiation-deadline 0.7s 2 ease-in-out alternate;
  }
  .initial .task-delete-button {
    animation: initiation-delete 0.7s 2 ease-in-out alternate;
  }

  @keyframes initiation-name {
    to {
      font-size: 18px;
    }
  }
  @keyframes initiation-description {
    to {
      font-size: 18px;
    }
  }
  @keyframes initiation-deadline {
    to {
      font-size: 17px;
    }
  }
  @keyframes initiation-delete {
    to {
      font-size: 24px;
    }
  }

  .updated {
    animation: addition 0.5s 6 ease-in-out alternate;
  }

  @keyframes addition {
    to {
      opacity: 0.5;
    }
  }

  .new-task-add-button {
    display: block;
    margin: auto;
    height: 30px;
    box-sizing: border-box;
    padding: 0 15px;
    border: none;
    border-radius: 15px;
    background: #bcffa3;
    color: #108e1c;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    transition: box-shadow 0.3s;
    user-select: none;
  }

  .new-task-add-button:hover {
    box-shadow: 0 0 5px black;
  }

  .tasks ul li {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    height: min-content;
    width: 100%;
    margin: 10px 0;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .tasks ul li:first-child {
    margin-top: 30px;
  }

  .tasks ul li:last-child {
    margin-bottom: 0;
  }

  .task-upper-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 2px;
  }

  .task-name {
    width: min-content;
    white-space: normal;
    font-size: 15px;
    line-height: 15px;
    color: #131313;
    z-index: 1;
  }

  .task-description, .task-deadline {
    color: #131313;
    width: 100%;
  }

  .task-description {
    white-space: pre-wrap;
    font-size: 15px;
    line-height: 18px;
    cursor: pointer;
    transition: box-shadow 0.3s;
    user-select: none;
  }

  .task-description:hover {
    box-shadow: 0 0 5px black;
  }

  .task-deadline {
    white-space: normal;
    font-size: 14px;
    line-height: 20px;
  }

  .tasks .task-delete-button {
    height: 20px;
    width: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    transition: box-shadow 0.3s;
    user-select: none;
    background: #ffcfb6;
    color: #cc4403;
  }

  .tasks .task-delete-button:hover {
    box-shadow: 0 0 5px black;
  }

  .tasks span:nth-child(1), .tasks span:nth-child(3) {
    font-size: 14px;
    color: #131313;
    line-height: 20px;
  }

  .tasks span:nth-child(2) {
    background: #F7F6F3;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 20px;
  }

  .tasks span:nth-child(3) {
    align-self: flex-end;
    text-align: right;
    opacity: 0.7;
    white-space: nowrap;
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .new-task-add-button {
      height: 7vw;
      font-size: 3.1vw;
      line-height: 7vw;
      padding: 0 3.25vw;
    }

    .tasks ul li:first-child {
      margin-top: 6.5vw;
    }

    .task-description {
      font-size: 3.5vw;
      line-height: 4.5vw;
      border-radius: 2.175vw;
      padding: 4.35vw 4.35vw;
    }

    .tasks span:nth-child(1), .tasks span:nth-child(3) {
      font-size: 3vw;
      line-height: 4vw;
    }

    .tasks .task-delete-button {
      width: 4.35vw;
      height: 4.35vw;
      font-size: 4.35vw;
      line-height: 4.35vw;
    }

    .tasks span:nth-child(3) {
      white-space: normal;
    }

    @keyframes initiation-name {
      to {
        font-size: 3.6vw;
      }
    }
    @keyframes initiation-description {
      to {
        font-size: 4.1vw;
      }
    }
    @keyframes initiation-deadline {
      to {
        font-size: 3.6vw;
      }
    }
    @keyframes initiation-delete {
      to {
        font-size: 5.22vw;
      }
    }
  }
</style>
