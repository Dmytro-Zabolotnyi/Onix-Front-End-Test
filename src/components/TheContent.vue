<template lang="pug">
  .tabs
    .tab-labels
      .label-container#tasks-label-container
        router-link.link(to='/tasks') Tasks
      .label-container#kanban-label-container
        router-link.link(to='/kanban') Kanban
      .label-container#activity-label-container
        router-link.link(to='/activity') Activity
      .label-container#calendar-label-container
        router-link.link(to='/calendar') Calendar
      .label-container#files-label-container
        router-link.link(to='/files') Files
    .tab-content
      router-view(v-on:change-notification-counter="changeNotificationCounter($event)")
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'TheContent',
})
export default class TheContent extends Vue {
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

    #tasks-label-container {
      margin-left: 5vw;
    }

    #kanban-label-container, #activity-label-container,
    #calendar-label-container, #files-label-container {
      margin-left: 7vw;
    }

    .label-container .router-link-active {
      border-bottom: 0.435vw #FFC200 solid;
    }
  }
</style>
