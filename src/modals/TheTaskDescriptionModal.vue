<template lang="pug">
  .task-description-modal-container
    .task-description-modal-background(@click="closeModalWindow()")
    .task-description-modal-window
      .description-container
        span(v-if="!isEditing") {{ textArea }}
        textarea(v-else, v-model="textArea")
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
// @ts-ignore
import { TaskInterface } from '@/components/TheContent.vue';

@Component({
  name: 'TheTaskDescriptionModal',
})
export default class TheTaskDescriptionModal extends Vue {
  @Prop() descriptionTask!:TaskInterface;

  textArea: string = this.descriptionTask.description;

  isEditing: boolean = false;

  get isDescriptionChanged() {
    return this.descriptionTask.description !== this.textArea;
  }

  closeModalWindow() {
    this.isEditing = false;
    this.$emit('close-task-description-modal');
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
  .task-description-modal-container {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .task-description-modal-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1;
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
    .task-description-modal-window {
      width: 65%;
    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .task-description-modal-window {
      width: 80vw;
      padding: 5vw;
      margin-top: 15vh;
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
