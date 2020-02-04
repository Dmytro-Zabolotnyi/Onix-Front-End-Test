<template lang="pug">
  .modal-container
    .modal-backdrop(@click="closeModalWindow()")
    .modal-window(v-bind:class="modalWindowClass")
      form.new-task-container(v-if="isNewTaskModalShowed", @submit.prevent="addNewTask")
        .close-modal-window-button(@click="closeModalWindow()") &#215
        .new-task-name-container
          input.new-task-name(type="text", placeholder='enter new task name...',
            v-model='newTask.name')
        .new-task-description-container
          textarea.new-task-description(rows='3',
            placeholder='enter new task description...',
            v-model="newTask.description")
        .date-pickers
          datetime.end-date(
            type="datetime",
            input-id="deadline"
            v-model="newTask.deadline",
            placeholder="input deadline...",
            use12-hour,
            format="dd:MM:yyyy, hh:mm a")
        button.new-task-add-button(type="submit") &#10003 Add
      .task-description(v-if="isDescriptionModalShowed")
        .description-container
          span(v-if="!isEditing") {{ textArea }}
          textarea(v-else, v-model="textArea")
        .edit(v-if="isEditable")
          button.task-description-edit-button(v-if="!isEditing",
            @click="isEditing = !isEditing") &#x270E Edit
          button.task-description-cancel-button(v-else,
            @click="closeModalWindow()") &#x2716 Cancel
          button.task-description-save-button(v-if="isDescriptionChanged",
            @click="saveDescription()") &#x1f4be Save
</template>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon';
import TaskClass from '@/TaskClass';

Settings.defaultLocale = 'en-gb';

@Component({
  name: 'TheModal',
  components: { Datetime, Settings },
})
export default class TheModal extends Vue {
  @Prop() descriptionTask!:TaskClass;

  @Prop(Boolean) isNewTaskModalShowed!:boolean;

  @Prop(Boolean) isDescriptionModalShowed!:boolean;

  @Prop(Boolean) editable!:boolean;

  newTask = {
    name: '',
    description: '',
    deadline: '',
  };

  textArea: string = this.descriptionTask.description;

  isEditing: boolean = false;

  isEditable: boolean = this.editable;

  addNewTask(event: { target: { reset: () => void; }; }) {
    if (this.newTask.name !== '' && this.newTask.description !== '' && this.newTask.deadline !== '') {
      this.$emit('new-task-added', this.newTask.name, this.newTask.description, this.newTask.deadline);

      this.newTask.name = '';
      this.newTask.description = '';
      this.newTask.deadline = '';

      event.target.reset();
    } else {
      // eslint-disable-next-line no-alert
      alert('Please fill name, description and deadline fields to add the task...');
    }
  }

  closeModalWindow() {
    this.$emit('close-modal-window');
  }

  get isDescriptionChanged() {
    return this.descriptionTask.description !== this.textArea;
  }

  get modalWindowClass() {
    let windowClass: string = '';
    if (this.isNewTaskModalShowed) {
      windowClass = 'new-task-modal-window';
    } else if (this.isDescriptionModalShowed) {
      windowClass = 'task-description-modal-window';
    }
    return windowClass;
  }

  saveDescription() {
    if (this.textArea !== '') {
      this.$emit('description-updated', this.descriptionTask, this.textArea);
    } else {
      // eslint-disable-next-line no-alert
      alert('Task description should not be empty!');
    }
  }
}
</script>

<style scoped>
  .modal-container {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal-backdrop {
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
    background: #f5f5f5;
  }

  .new-task-container textarea {
    resize: none;
    margin-bottom: 10px;
  }

  .vdatetime {
    width: 100%;
    margin-bottom: 15px;
  }

  .vdatetime-input {
    text-align: left;
    color: red;
  }

  .new-task-description-container {
    display: flex;
    justify-content: center;
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

  .task-description-modal-window {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 50%;
    height: min-content;
    margin-top: 20vh;
    background: white;
    border-radius: 8px;
    z-index: 2;
    box-sizing: border-box;
    padding: 15px;
    box-shadow: 0 0 15px black;
  }

  .description-container {
    height: 70px;
    display: flex;
    align-items: center;
  }

  .description-container span, .description-container textarea {
    width: 100%;
    margin-bottom: 10px;
  }

  .description-container span {
    height: min-content;
    max-height: 100%;
    white-space: pre-wrap;
    overflow-y: auto;
  }

  .description-container textarea {
    padding: 5px;
    height: 67px;
    box-sizing: border-box;
    border: 1px grey solid;
    background: #f5f5f5;
    resize: none;
  }

  .task-description-edit-button, .task-description-cancel-button, .task-description-save-button {
    display: block;
    margin: auto;
    height: 30px;
    box-sizing: border-box;
    padding: 0 15px;
    border: none;
    border-radius: 15px;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    transition: box-shadow 0.3s;
    user-select: none;
    outline: none;
  }

  .task-description-cancel-button, .task-description-save-button {
    width: 90px;
  }

  .task-description-edit-button {
    background: #bcffa3;
    color: #108e1c;
  }

  .task-description-cancel-button {
    background: #ffcfb6;
    color: #cc4403;
  }

  .task-description-save-button {
    margin-top: 7px;
    color: black;
    background: #EAEAEA;
  }

  .task-description-edit-button:hover, .task-description-cancel-button:hover,
  .task-description-save-button:hover {
    box-shadow: 0 0 5px black;
  }

  .description-container textarea {
    border-radius: 8px;
  }

  @media screen and (max-aspect-ratio: 980/927) {
    .new-task-modal-window, .task-description-modal-window {
      width: 65%;
    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .new-task-modal-window, .task-description-modal-window {
      width: 80vw;
      padding: 5vw;
    }

    .new-task-modal-window {
      margin-top: 4vh;
    }

    .task-description-modal-window {
      margin-top: 15vh;
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

    .task-description-edit-button, .task-description-cancel-button, .task-description-save-button {
      height: 7vw;
      font-size: 3.1vw;
      line-height: 7vw;
      padding: 0 3.25vw;
    }

    .task-description-save-button {
      margin-top: 1.5vw;
    }

    .task-description-cancel-button, .task-description-save-button {
      width: 20vw;
    }

    .description-container span, textarea {
      font-size: 3.5vw;
      line-height: 4.5vw;
    }

    .description-container {
      height: 15vw;
    }

    .description-container textarea {
      height: 14.5vw;
    }
  }
</style>
