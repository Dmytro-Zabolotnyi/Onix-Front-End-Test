<template lang="pug">
  .new-task-modal-container
    .new-task-modal-background(@click="closeModalWindow()")
    .new-task-modal-window
      form.new-task-container(@submit.prevent="addNewTask")
        .close-modal-window-button(@click="closeModalWindow()") &#215
        .new-task-name-container
          input.new-task-name(type="text", placeholder='enter new task name...',
            v-model='newTask.name')
        .new-task-description-container
          textarea.new-task-description(rows='3',
            placeholder='enter new task description...',
            v-model="newTask.description")
        button.new-task-add-button(type="submit") &#10003 Add
</template>

<script lang="ts">
import {
  Vue, Component,
} from 'vue-property-decorator';

@Component({
  name: 'TheNewTaskModal',
})
export default class TheNewTaskModal extends Vue {
  newTask = {
    name: '',
    description: '',
  };

  addNewTask(event: { target: { reset: () => void; }; }) {
    if (this.newTask.name !== '' && this.newTask.description !== '') {
      this.$emit('new-task-added', this.newTask.name, this.newTask.description);

      this.newTask.name = '';
      this.newTask.description = '';

      event.target.reset();
    } else {
      // eslint-disable-next-line no-alert
      alert('Please fill both name and description fields to add the task...');
    }
  }

  closeModalWindow() {
    this.$emit('close-new-task-modal');
  }
}
</script>

<style scoped>
  .new-task-modal-container {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .new-task-modal-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1;
  }

  .new-task-modal-window {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 50%;
    height: min-content;
    margin-top: 50px;
    background: white;
    border-radius: 8px;
    z-index: 2;
    box-sizing: border-box;
    padding: 15px;
    box-shadow: 0 0 15px black;
  }

  .new-task-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: min-content;
    width: 100%;
  }

  .close-modal-window-button {
    align-self: flex-end;
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
    margin-bottom: 10px;
  }

  .close-modal-window-button:hover {
    box-shadow: 0 0 5px black;
  }

  .new-task-container input, .new-task-container textarea {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    border: 1px grey solid;
  }

  .new-task-container textarea {
    resize: none;
    margin-bottom: 10px;
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

  .new-task-name-container + .new-task-description-container {
    margin-top: 10px;
  }

  span + .new-task-name, span + .new-task-description {
    margin-top: 5px;
  }

  .new-task-name, .new-task-description {
    border-radius: 8px;
  }

  @media screen and (max-aspect-ratio: 980/927) {
    .new-task-modal-window {
      width: 65%;
    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .new-task-modal-window {
      width: 80vw;
      padding: 5vw;
      margin-top: 4vh;
    }

    .new-task-add-button {
      height: 7vw;
      font-size: 3.1vw;
      line-height: 7vw;
      padding: 0 3.25vw;
    }

    .new-task-name-container span, input, textarea {
      font-size: 3.5vw;
      line-height: 4.5vw;
    }

    .close-modal-window-button {
      width: 4.35vw;
      height: 4.35vw;
      font-size: 4.35vw;
      line-height: 4.35vw;
    }
  }
</style>
