<template lang="pug">
  #header-component(@click="hideSlideMenu")
    header.upper-part
      .upper-left
        .logo(v-bind:style="{ backgroundImage: 'url(' + projectLogo + ')' }")
        .project-name
          span {{ projectName }}
        .menu
          .menu-shapes
      .upper-right
        .users
          .users-pic(
            v-for="item of userPics" v-bind:key="item.id"
            v-bind:style="{ backgroundImage: 'url(' + item.userPic + ')' }"
          )
        .share Share
        .chat
          .chat-icon(v-bind:style="{ backgroundImage: 'url(' + chatIcon + ')' }")
          span Chat
    .tabs
      input#tasks-radio(type="radio" name="radio-button")
      input#activity-radio(type="radio" name="radio-button" checked)
      .tab-labels
        .label-container#tasks-label-container
          label.tab-label#tasks-radio-label(for="tasks-radio") Tasks
        .label-container#kanban-label-container
          label.tab-label#kanban-radio-label Kanban
        .label-container#activity-label-container
          label.tab-label#activity-radio-label(for="activity-radio") Activity
        .label-container#calendar-label-container
          label.tab-label#calendar-radio-label Calendar
        .label-container#files-label-container
          label.tab-label#files-radio-label Files

      TheContent(v-on:change-notification-counter="changeNotificationCounter($event)")
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TheContent from './TheContent.vue';

@Component({
  components: { TheContent },
})
export default class TheHeader extends Vue {
  projectLogo: string = 'images/Shapes@2x.png';

  projectName: string = 'Website Redesign';

  chatIcon: string = 'images/CombinedShape@1x.svg';

  userPics = [
    { userPic: 'images/face2.png' },
    { userPic: 'images/face3.png' },
    { userPic: 'images/face4.png' },
  ];

  changeNotificationCounter(index: number) {
    this.$emit('change-notification-counter', index);
  }

  hideSlideMenu() {
    this.$emit('uncheckCheckbox');
  }
}
</script>

<style scoped>
  #header-component {
    height: 100%;
    margin-left: 270px;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-transition: opacity 0.3s, margin-left 0.3s, -webkit-filter 0.3s;
    transition: opacity 0.3s, margin-left 0.3s, filter 0.3s, -webkit-filter 0.3s;
  }

  .upper-part {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 83px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    background: #FFFFFF;
  }

  .upper-left, .upper-right {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    flex-wrap: nowrap;
    -webkit-box-flex: 1;
    flex: 1;
  }

  .upper-left + .upper-right {
    margin-left: 12px;
  }

  .upper-left, .upper-right {
    margin-top: 35px;
  }

  .upper-left {
    margin-left: 30px;
  }

  .upper-right {
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin-right: 30px;
  }

  .logo {
    margin-top: 4.5px;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #ffc200;
    background-size: 40px 40px;
  }

  .logo + .project-name {
    margin-left: 15px;
  }

  .project-name {
    position: relative;
    width: 265px;
    height: 43px;
  }

  .project-name span {
    position: absolute;
    line-height: 38px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 32px;
    color: #131313;
    white-space: nowrap;
  }

  .project-name + .menu {
    margin-left: 11px;
  }

  .upper-left .menu {
    position: relative;
    margin-top: 10px;
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
    background: #EAEAEA;
  }

  .upper-left .menu::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 4px;
    height: 4px;
    margin-left: -2px;
    margin-top: -2px;
    background-color: #A5A5A5;
    border-radius: 50%;
    box-shadow: 6px 0 0 0 #A5A5A5, -6px 0 0 0 #A5A5A5;
  }

  .users {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    margin-top: 9px;
  }

  .users-pic:nth-last-child(n+2) {
    margin-right: 5px;
  }

  .users-pic:nth-child(n) {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    content: "";
    background-size: 30px 30px;
  }

  .users + .share, .share + .chat {
    margin-left: 15px;
  }

  .share, .chat {
    margin-top: 10px;
  }

  .share {
    position: relative;
    display: block;
    height: 30px;
    width: 67px;
    border-radius: 15px;
    background: #EAEAEA;
    font-size: 14px;
    color: #131313;
    text-align: center;
    line-height: 30px;
  }

  .chat {
    position: relative;
    height: 30px;
    width: 81px;
    border-radius: 15px;
    background: #FFF8DD;
  }

  .chat-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    left: 15px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .chat span {
    position: absolute;
    top: 50%;
    right: 14px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 14px;
    color: #FFC200;
  }

  .tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .tabs input {
    display: none;
  }

  #tasks-radio:checked ~ .tab-labels #tasks-label-container,
  #activity-radio:checked ~ .tab-labels #activity-label-container {
    border-bottom: 2px #FFC200 solid;
    padding-bottom: 12px;
  }

  #tasks-radio:checked ~ .tab-labels #tasks-radio-label,
  #activity-radio:checked ~ .tab-labels #activity-radio-label {
    opacity: 1;
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
    font-size: 16px;
    -webkit-box-align: center;
    align-items: center;
    line-height: 19px;
    padding-bottom: 14px;
    color: #131313;
    border-bottom: none;
    user-select: none;
  }

  .tab-labels label {
    opacity: 0.7;
  }

  #tasks-radio-label:hover, #activity-radio-label:hover {
    cursor: pointer;
    opacity: 1.0;
  }

  #tasks-label-container {
    margin-left: 30px;
  }

  #kanban-label-container {
    margin-left: 32px;
  }

  #activity-label-container {
    margin-left: 27px;
  }

  #calendar-label-container {
    margin-left: 31px;
  }

  #files-label-container {
    margin-left: 27px;
  }

  @media screen and (max-aspect-ratio: 980/927) {
    #header-component {
      margin-left: 0;
      width: 100%;
    }
  }

  @media screen and (max-width: 710px), (max-aspect-ratio: 710/927) {
    .upper-part {
      min-height: unset;
      height: 95px;
    }

    .upper-left {
      margin-top: 15px;
    }

    .upper-right {
      margin-top: 0;
      z-index: 1;
    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    /*noinspection CssInvalidPropertyValue*/
    .upper-part {
      height: -webkit-min-content;
      height: -moz-min-content;
      height: min-content;
      min-height: unset;
    }

    .upper-left {
      margin-left: 6vw;
      margin-top: 1.3vh;
    }

    .upper-right {
      margin-right: 6vw;
    }

    .logo {
      margin-top: 0.6vh;
      width: 8.8vw;
      height: 8.8vw;
      border-radius: 1.7vw;
      background-size: 8.8vw 8.8vw;
    }

    .project-name {
      width: 60vw;
      height: 10.5vw;
      margin-top: 0.15vh;
    }

    .project-name span {
      font-size: 7vw;
    }

    .upper-left .menu {
      margin-top: 1vh;
      width: 7vw;
      height: 7vw;
      min-width: 7vw;
      min-height: 7vw;
    }

    .upper-left .menu::before {
      width: 0.9vw;
      height: 0.9vw;
      margin-left: -0.45vw;
      margin-top: -0.45vw;
      box-shadow: 1.35vw 0 0 0 #A5A5A5, -1.35vw 0 0 0 #A5A5A5;
    }

    .users-pic:nth-last-child(n+2) {
      margin-right: 1.2vw;
    }

    .users-pic:nth-child(n) {
      width: 7vw;
      height: 7vw;
      background-size: 7vw 7vw;
    }

    .users + .share, .share + .chat {
      margin-left: 3.1vw;
    }

    .share {
      width: 15vw;
      height: 7vw;
      border-radius: 3.25vw;
      font-size: 3.1vw;
      line-height: 7vw;
    }

    .chat {
      width: 17.65vw;
      height: 7vw;
      border-radius: 3.25vw;
    }

    .chat-icon {
      left: 3.3vw;
      width: 3.5vw;
      height: 3.5vw;

    }

    .chat span {
      right: 3.1vw;
      font-size: 3.1vw;
    }

    .tab-labels {
      height: min-content;
      min-height: unset;
      padding-top: 2.5vw;
    }


    .tab-labels .label-container {
      height: min-content;
      padding-bottom: 2.5vw;
    }

    .tab-labels label {
      font-size: 3.5vw;
      line-height: 4.5vw;
    }

    #tasks-label-container {
      margin-left: 5vw;
    }

    #kanban-label-container, #activity-label-container,
    #calendar-label-container, #files-label-container {
      margin-left: 7vw;
    }

    #tasks-radio:checked ~ .tab-labels #tasks-label-container,
    #activity-radio:checked ~ .tab-labels #activity-label-container {
      opacity: 1;
      border-bottom: 0.435vw #FFC200 solid;
      padding-bottom: 2.065vw;
    }

  }
</style>
