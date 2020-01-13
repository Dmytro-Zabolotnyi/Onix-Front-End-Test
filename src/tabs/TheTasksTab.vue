<template lang="pug">
  #tasks-container.container
    .tasks
      form#new-task-container(@submit.prevent="addNewTask")
        #new-task-name-container
          input#new-task-name(type="text", required="", placeholder='enter new task name...',
            v-model='newTask.name')
        #new-task-description-container
          textarea#new-task-description(rows='3', required="",
            placeholder='enter new task description...',
            v-model="newTask.description")
        button#new-task-add-button(type="submit") &#10003 Add
      ul
        li(v-for="(task, index) in tasks", v-bind:key="index", v-bind:class="task.animationClass")
          .task-upper-row
            span#task-name {{ task.name }}
            .task-delete-button(@click="deleteTask(index)") &#215
          span#task-description {{ task.description }}
          span#task-deadline {{ task.deadline }}
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
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
  onUrlChange() {
    this.tasks.forEach((task) => {
      // eslint-disable-next-line no-param-reassign
      task.animationClass = 'task';
    });
  }

  newTask: TaskInterface = {
    name: '',
    status: Status.toDo,
    description: '',
    deadline: '',
    animationClass: '',
  };

  initialTasks: TaskInterface[] = [];

  created() {
    this.initialTasks = [
      {
        name: 'Evening',
        status: Status.inProgress,
        description: "You're a big boy, come up with something.",
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
        name: 'Sleep',
        status: Status.toDo,
        description: 'It was a good day, time to let it go and have some sleep.',
        deadline: '11:40 PM',
        animationClass: '',
      },
    ];
    this.$emit('initialize-tasks', this.initialTasks);
  }

  mounted() {
    this.$emit('change-open-tasks-number', this.tasks.length);
  }

  updated() {
    if (this.tasks[this.tasks.length - 1].animationClass === '') {
      this.tasks[this.tasks.length - 1].animationClass = 'added-task-list-item';
    }
  }

  addNewTask(event: { target: { reset: () => void; }; }) {
    if (this.newTask.name !== '' && this.newTask.description !== '') {
      this.tasks.push({
        name: this.newTask.name,
        status: this.newTask.status,
        description: this.newTask.description,
        deadline: TheTasksTab.getRandomTime(),
        animationClass: '',
      });

      this.newTask.name = '';
      this.newTask.description = '';

      event.target.reset();

      (async () => {
        await this.$nextTick();
        this.tasks[this.tasks.length - 1].animationClass = 'added-task-list-item';
      })();
    } else {
      // eslint-disable-next-line no-alert
      alert('Please fill both name and description fields to add the task...');
    }
  }

  deleteTask(index: number) {
    if (this.tasks.length > 0) {
      this.tasks.splice(index, 1);
    }
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
  .tasks {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .task-list-item #task-name {
    animation: initiation-name 0.7s 2 ease-in-out alternate;
  }
  .task-list-item #task-description {
    animation: initiation-description 0.7s 2 ease-in-out alternate;
  }
  .task-list-item #task-deadline {
    animation: initiation-deadline 0.7s 2 ease-in-out alternate;
  }
  .task-list-item .task-delete-button {
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

  .added-task-list-item {
    animation: addition 0.5s 6 ease-in-out alternate;
  }

  @keyframes addition {
    to {
      opacity: 0.5;
    }
  }

  #new-task-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: min-content;
    width: 100%;
  }

  #new-task-container input, #new-task-container textarea {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    border: 1px grey solid;
  }

  #new-task-container textarea {
    resize: none;
    margin-bottom: 10px;
  }

  #new-task-add-button {
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

  #new-task-add-button:hover {
    box-shadow: 0 0 5px black;
  }

  #new-task-name-container + #new-task-description-container {
    margin-top: 10px;
  }

  span + #new-task-name, span + #new-task-description {
    margin-top: 5px;
  }

  #new-task-name, #new-task-description {
    border-radius: 8px;
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

  #task-name {
    width: min-content;
    white-space: normal;
    font-size: 15px;
    line-height: 15px;
    color: #131313;
    z-index: 1;
  }

  #task-description, #task-deadline {
    color: #131313;
    width: 100%;
  }

  #task-description {
    white-space: pre-wrap;
    font-size: 15px;
    line-height: 18px;
  }

  #task-deadline {
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
    #new-task-add-button {
      height: 7vw;
      font-size: 3.1vw;
      line-height: 7vw;
      padding: 0 3.25vw;
    }

    .tasks ul li:first-child {
      margin-top: 6.5vw;
    }

    #task-description, #new-task-name-container span, input, textarea {
      font-size: 3.5vw;
      line-height: 4.5vw;
    }

    #task-description {
      border-radius: 2.175vw;
      padding: 4.35vw 4.35vw;
    }

    #task-name, #task-deadline {
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
