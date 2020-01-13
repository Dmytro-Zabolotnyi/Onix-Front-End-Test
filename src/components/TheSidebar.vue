<template lang="pug">
  .sidebar
    header.sidebar-header
      .header-logo(v-bind:style="{ backgroundImage: 'url(' + logoIcon + ')' }")
      .company-name {{ companyName }}
      .search(v-bind:style="{ backgroundImage: 'url(' + searchIcon + ')' }")
    .user-info
      .user-picture(v-bind:style="{ backgroundImage: 'url(' + user.picture + ')' }")
      .user-name-and-status
        .user-name {{ user.name }}
        .user-status {{ user.status }}
      .user-menu-button
        .user-menu-shapes
    .task-stats
      .completed-tasks(@click="changeTasksCounter()")
        #completed-number {{ this.completedTasksNumber }}
        .tasks-label
          span Completed Tasks
      .open-tasks(@click="openTasksTab()")
        #open-number {{ this.openTasksNumber }}
        .tasks-label
          span Open Tasks
    .aside-menu
      li.menu MENU
      li.aside-menu-home
        span Home
      li.aside-menu-tasks
        span My Tasks
      li.aside-menu-notifications
        span Notifications
        #notification-counter {{ notificationCounter }}
</template>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';

@Component({
  name: 'TheSidebar',
})
export default class TheSidebar extends Vue {
  @Prop(Number) openTasksNumber!: number;

  @Prop(Number) notificationCounter !: number;

  logoIcon: string = 'images/Logo@3x.svg';

  companyName: string = 'PROJECTUS';

  searchIcon: string = 'images/Search@3x.svg';

  completedTasksNumber: number = 372;

  user = {
    name: 'Jean Gonzales',
    status: 'Product Owner',
    picture: 'images/user-pic.png',
  };

  changeTasksCounter() {
    if (this.openTasksNumber > 0) {
      this.$router.push('/tasks').catch((error) => {});

      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to change the number of tasks?')) {
        this.$emit('close-task');
      }
    }
  }

  openTasksTab() {
    if (this.openTasksNumber > 0) {
      this.$router.push('/tasks').catch((error) => {});
    }
  }
}
</script>

<style scoped>
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 270px;
    height: 100%;
    background: #000000;
    color: #FFFFFF;
    -webkit-transition: margin-left 0.3s, width 0.3s;
    transition: margin-left 0.3s, width 0.3s;
  }

  .sidebar-header, .user-info, .task-stats, .menu {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
  }

  .header-logo, .user-picture, .completed-tasks {
    margin-left: 30px;
  }

  .sidebar-header {
    -webkit-box-align: center;
    align-items: center;
    height: 84px;
  }

  .header-logo {
    display: block;
    min-width: 21.6px;
    height: 18.9px;
    margin-right: 13px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .company-name {
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
  }

  .search {
    display: block;
    min-width: 16px;
    height: 16px;
    margin-right: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .user-info {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    height: 80px;
    background: #202020;
    -webkit-box-align: center;
    align-items: center;
  }

  .user-picture {
    display: block;
    height: 48px;
    width: 48px;
    margin-right: 15px;
    border-radius: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .user-name-and-status {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    align-content: center;
    width: 100px;
    white-space: normal;
  }

  .user-name, .user-status {
    display: -webkit-box;
    display: flex;
    position: relative;
    -webkit-box-align: center;
    align-items: center;
  }

  .user-name {
    -webkit-box-align: end;
    align-items: flex-end;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  }

  .user-status {
    font-size: 12px;
    line-height: 14px;
    color: #9B9B9B;
  }

  .user-name + .user-status {
    margin-top: 2px;
  }

  .user-menu-button {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    margin-left: auto;
  }

  .user-menu-shapes {
    position: absolute;
    width: 4px;
    height: 4px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #A5A5A5;
    border-radius: 50%;
    box-shadow: 6px 0 0 0 #A5A5A5, -6px 0 0 0 #A5A5A5;
  }

  .task-stats {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 31px;
    height: 44px;
  }

  .completed-tasks, .open-tasks {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    border-radius: 8px;
  }

  .open-tasks {
    margin-left: 19px;
  }

  .completed-tasks, .open-tasks {
    cursor: pointer;
    -webkit-transition: border 0.3s, background-color 0.3s, margin 0.3s, padding 0.3s;
    transition: border 0.3s, background-color 0.3s, margin 0.3s, padding 0.3s;
  }

  .completed-tasks:hover, .open-tasks:hover {
    padding: 3px;
    margin-right: -6px;
    margin-bottom: -12px;
    border-bottom: #ffc200 4px solid;
    background-color: #202020;
  }

  #completed-number, #open-number {
    height: 27px;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .tasks-label {
    height: 17px;
  }

  .tasks-label span {
    height: 14px;
    font-size: 12px;
    line-height: 14px;
    color: #878787;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .aside-menu {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }

  .aside-menu li:first-child {
    font-size: 12px;
    line-height: 18px;
    color: #878787;
    margin-bottom: 10px;
    padding-left: 30px;
  }

  .aside-menu-home, .aside-menu-tasks, .aside-menu-notifications {
    height: 38px;
    width: 240px;
    padding-left: 30px;
  }

  .aside-menu-home, .aside-menu-tasks {
    display: block;
    position: relative;
  }

  .aside-menu-home span, .aside-menu-tasks span, .aside-menu-notifications span {
    font-size: 14px;
    line-height: 22px;
    color: #FFFFFF;
  }

  .aside-menu-home span, .aside-menu-tasks span {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 14px;
    line-height: 22px;
    color: #FFFFFF;
  }

  .aside-menu-notifications {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
  }

  .aside-menu-notifications span + #notification-counter {
    margin-left: 10px;
  }

  #notification-counter {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    min-height: 20px;
    min-width: 19px;
    border-radius: 50%;
    background: #FFC200;
    font-size: 13px;
    color: #131313;
  }

  @media screen and (max-aspect-ratio: 980/927), (max-width: 980px)  {
    .sidebar {
      margin-left: -270px;
    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .sidebar {
      width: 59.5%;
      margin-left: -59.5%;
    }

    .header-logo, .user-picture, .completed-tasks {
      margin-left: 6vw;
    }

    .header-logo {
      min-width: 5vw;
      min-height: 5vw;
      margin-right: 3vw;
    }

    .sidebar-header, .user-info {
      height: 9vh;
    }

    .company-name {
      font-size: 3.5vw;
    }

    .search {
      min-width: 4vw;
      min-height: 4vw;
      margin-right: 4.6vw;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    .user-picture {
      min-width: 9.5vw;
      min-height: 9.5vw;
      width: 9.5vw;
      height: 9.5vw;
      border-radius: 50%;
      background-size: 9.5vw 9.5vw;
      background-repeat: no-repeat;
      background-position: center;
    }

    .user-name {
      font-size: 3vw;
      line-height: 3.3vw;
    }

    .user-status {
      font-size: 2.5vw;
      line-height: 2.7vw;
    }

    .user-menu-button {
      width: 8.5vw;
      height: 8.5vw;
      border-radius: 2.4vw;

    }

    .user-menu-shapes {
      width: 1vw;
      height: 1vw;
      margin-right: 4.5vw;
      box-shadow: 1.5vw 0 0 0 #A5A5A5, -1.5vw 0 0 0 #A5A5A5
    }

    .task-stats {
      margin-bottom: 1vh;
      height: 6.5vh;
    }

    .completed-tasks, .open-tasks {
      height: 5vh;
      border-radius: 2vw;
    }

    .completed-tasks:hover, .open-tasks:hover {
      padding: 1vw;
      margin-right: -2vw;
      margin-bottom: -3vw;
      border-bottom: #ffc200 0.8vw solid;
      background-color: #202020;
    }

    #completed-number, #open-number {
      height: 2.8vh;
      font-size: 4.7vw;
      line-height: 5vw;
    }

    .open-tasks {
      margin-left: 4.5vw;
    }

    .tasks-label span {
      font-size: 2.7vw;
      line-height: 2.9vw;
    }

    .aside-menu li:first-child {
      padding-left: 6vw;
      margin-bottom: 1vh;
      font-size: 2.7vw;
      line-height: 4.5vw;
    }

    .aside-menu-home, .aside-menu-tasks, .aside-menu-notifications {
      height: 20vh;
      padding-left: 6vw;
    }

    .aside-menu-notifications span + #notification-counter {
      margin-left: 2vw;
    }

    .aside-menu {
      height: 16vh;
    }

    .aside-menu-home span, .aside-menu-tasks span, .aside-menu-notifications span {
      font-size: 3vw;
      line-height: 3.3vw;
    }

    #notification-counter {
      min-height: 4.2vw;
      min-width: 4.2vw;
      font-size: 3.1vw;
    }
  }

</style>
