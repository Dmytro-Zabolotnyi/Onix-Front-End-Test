<template lang="pug">
  #tasks-container.container
    .tasks
      .day
      ul
        li(v-for="task in tasks" v-bind:key="task.id")
          span {{ task.name }}
          span {{ task.description }}
          span {{ task.deadline }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

interface TaskInterface {
  name: string;
  description: string;
  deadline: string;
}

@Component({
  name: 'TheTasksTab',
})
export default class TheTasksTab extends Vue {
  tasks: TaskInterface[] = [
    {
      name: 'Teeth',
      description: 'Take a toothbrush and make your breath fresh.',
      deadline: '6:35 AM',
    },
    {
      name: 'Dog',
      description: 'Pet your dog and take it for a morning jog.',
      deadline: '7:10 AM',
    },
    {
      name: 'Shower',
      description: 'Give yourself a pleasure of a morning shower.',
      deadline: '7:20 AM',
    },
    {
      name: 'Breakfast',
      description: 'Cook and eat some bacon and eggs.',
      deadline: '7:50 AM',
    },
    {
      name: 'Car',
      description: 'Grab your keys, head to the car and leave to work.',
      deadline: '8:20 AM',
    },
    {
      name: 'Work',
      description: 'Be a good pal and make something worthy today.',
      deadline: '6:00 PM',
    },
    {
      name: 'Date',
      description: 'Have a good time with a beautiful woman.',
      deadline: '9:00 PM',
    },
    {
      name: 'Home',
      description: "Bring yourself home. And take your beautiful woman with you. She's your wife, after all.",
      deadline: '9:45 PM',
    },
    {
      name: 'Evening',
      description: "You're a big boy, come up with something.",
      deadline: '11:30 PM',
    },
    {
      name: 'Teeth',
      description: "Your dentist told you to brush your teeth twice a day, didn't he?",
      deadline: '11:35 PM',
    },
    {
      name: 'Sleep',
      description: 'It was a good day, time to let it go and have some sleep.',
      deadline: '11:40 PM',
    },
  ];
}
</script>

<style scoped>
  .day {
    margin-bottom: 2px;
  }

  .day::before {
    content: "TODAY";
    opacity: 0.5;
    font-size: 14px;
    color: #131313;
  }


  .tasks ul li {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    height: min-content;
    width: 100%;
    margin: 5px 0;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .tasks ul li:first-child {
    margin-top: 30px;
  }

  .tasks ul li:last-child {
    margin-bottom: 0;
  }

  .tasks span {
    white-space: normal;
    font-size: 15px;
    line-height: 18px;
    color: #131313;
    width: 100%;
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
    .day {
      margin-bottom: 0.65vw;
    }

    .day::before {
      font-size: 3vw;
    }

    .tasks ul li:first-child {
      margin-top: 6.5vw;
    }

    .tasks span {
      font-size: 3.5vw;
      line-height: 4.5vw;
    }

    .tasks span:nth-child(1) {
      flex-basis: 10vw;
    }

    .tasks span:nth-child(2) {
      border-radius: 2.175vw;
      padding: 4.35vw 4.35vw;
    }

    .tasks span:nth-child(1), .tasks span:nth-child(3) {
      font-size: 3vw;
      line-height: 4vw;
    }

    .tasks span:nth-child(3) {
      white-space: normal;
    }
  }
</style>
