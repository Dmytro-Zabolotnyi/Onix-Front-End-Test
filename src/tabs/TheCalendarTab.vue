<template lang="pug">
  .container.calendar-container
    .calendar
      .navigation
        button(@click="switchMonth(-1)") <<
        select.select-month(v-model="month")
          option(v-for="month in monthsOfYear", :key="month.id") {{ month }}
        select.select-year(v-model="year")
          option(v-for="year in years", :key="year.id") {{ year }}
        button(@click="switchMonth(1)") >>
      .days-of-week
        span.day-of-week(v-for="dayOfWeek in daysOfWeek", :key="dayOfWeek.id") {{ dayOfWeek }}
      .days-of-month
        .empty(v-for="day in previous", :key="day.id")
        .day-of-month(v-for="day in calendar", :key="day.id")
          span.date {{ day.date }}
          .tasks
            span.task(
              v-for="task in day.tasks",
              :key="task.id",
              @click="showDescription(task)") {{ task.name }}
</template>

<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';
import moment from 'moment';
import { proxy } from '@/store';
import TaskClass from '@/TaskClass';

interface CalendarDate {
  date: number;
  tasks: TaskClass[];
}

@Component({
  name: 'TheCalendarTab',
})
export default class TheCalendarTab extends Vue {
  @Watch('month')
  onMonthChange() {
    this.makeCalendar();
  }

  @Watch('year')
  onYearChange() {
    this.makeCalendar();
  }

  @Watch('tasks')
  onTasksChange() {
    this.makeCalendar();
  }

  tasks = proxy.tasksStore.tasks;

  month: string = moment().format('MMMM').toString();

  year: number = parseInt(moment().format('YYYY'), 10);

  previous: any[] = [];

  calendar: CalendarDate[] = [];

  minYear: number = 2010;

  maxYear: number = 2030;

  daysOfWeek = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
  ];

  monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  years: number[] = [];

  makeCalendar() {
    this.previous = [];
    this.calendar = [];
    const firstDay = parseInt(moment(`${this.month}${this.year}`, 'MMMMYYYY').format('E'), 10);
    const daysInMonth = moment(`${this.year}${this.month}`, 'YYYYMMMM').daysInMonth();
    let day = firstDay;
    const monthAndYear = moment(`${this.month}${this.year}`, 'MMMMYYYY').format('MMYYYY');

    while (day > 1) {
      this.previous.push(0);
      day -= 1;
    }

    for (let i = 1; i <= daysInMonth; i += 1) {
      const calendarDate = {
        date: i,
        tasks: [],
      };
      this.calendar.push(calendarDate);
    }

    for (let i = 0; i < this.tasks.length; i += 1) {
      const taskCreatedDate = moment(this.tasks[i].added, proxy.tasksStore.format).format('MMYYYY');

      if (Object.is(taskCreatedDate, monthAndYear)) {
        const date = parseInt(moment(this.tasks[i].added, proxy.tasksStore.format).format('D'), 10);
        this.calendar[date - 1].tasks.push(this.tasks[i]);
      }
    }
  }

  switchMonth(shift: number) {
    let monthAndYear = moment(`${this.month}${this.year}`, 'MMMMYYYY');
    monthAndYear = monthAndYear.add(shift, 'month');
    this.month = monthAndYear.format('MMMM');
    this.year = parseInt(monthAndYear.format('YYYY'), 10);
  }

  showDescription(task: TaskClass) {
    this.$emit('show-task-description', task, false);
  }

  created() {
    for (let i: number = this.minYear; i <= this.maxYear; i += 1) {
      this.years.push(i);
    }
    this.makeCalendar();
  }
}
</script>

<style scoped>
  .calendar {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .calendar:nth-child(n), .day-of-week {
    flex: 1;
  }

  .navigation {
    display: flex;
    flex-direction: row;
    align-self: center;
    width: 50%;
    justify-content: space-between;
    height: 30px;
    align-items: center;
  }

  .select-year {
    width: 75px;
  }

  .days-of-month {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
  }

  .day-of-month, .empty {
    width: 13.4%;
    height: 16.7%;
    margin-right: 1%;
  }

  .day-of-month {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-right: 2px #807267 solid;
    border-bottom: 2px #807267 solid;
    padding: 5px;
    background: #F7F6F3;
    border-radius: 15%;
  }

  .days-of-month, .days-of-week {
    width: 100%;
  }

  .tasks {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .task {
    box-sizing: border-box;
    padding: 1px;
    width: 100%;
    height: 14px;
    font-size: 12px;
    line-height: 14px;
    background: #e5e1db;
    border-radius: 5px;
    cursor: pointer;
  }

  .task + .task {
    margin-top: 5%;
  }

  .day-of-month:nth-child(7n) {
    margin-right: 0;
  }

  .day-of-month:nth-child(7n - 1), .day-of-month:nth-child(7n) {
    border-color: #cc4403;
  }

  .date {
    align-self: flex-end;
    color: #807267;
    font-size: 16px;
  }

  .day-of-month:nth-child(7n - 1) .date, .day-of-month:nth-child(7n) .date {
    color: #cc4403;
  }

  .days-of-week {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    margin-bottom: 10px;
  }

  .day-of-week {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-weight: bolder;
  }

  .day-of-week:nth-last-child(n + 3) {
    color: #807267;
    border-color: #807267;
  }

  .day-of-week:nth-last-child(n + 3), .day-of-week:nth-child(n + 6) {
    border-bottom: 3px solid;
  }

  .day-of-week:nth-child(n + 6) {
    color: #cc4403;
    border-color: #cc4403;
  }

  @media screen and (max-width: 710px), (max-aspect-ratio: 710/959) and (max-width: 710px) {
    .navigation {
      width: 60vw;
    }

    .date {
      font-size: 14px;
    }

    .day-of-month {
      padding: 3px;
    }

    .task {
      height: 13px;
      font-size: 10px;
      line-height: 13px;
    }
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .navigation {
      height: 6.6vw;
      width: 70vw;
    }

    button {
      width: 7vw;
      height: 5vw;
      padding: 0;
      font-size: 3vw;
      line-height: 4vw;
    }

    select {
      height: 5vw;
      font-size: 3vw;
      line-height: 4vw;
    }

    .select-year {
      width: 17vw;
    }

    .days-of-month {
      align-content: start;
    }

    .day-of-month {
      border-width: 0.45vw;
      padding: 1.1vw;
      height: 20vw;
      margin-bottom: 4vw;
    }

    .empty {
      height: 20vw;
    }

    .task {
      padding: 0.22vw;
      height: 2.8vw;
      font-size: 2.4vw;
      line-height: 2.8vw;
      border-radius: 1.1vw;
    }

    .date {
      font-size: 2.9vw;
    }

    .days-of-week {
      height: 11vw;
      margin-bottom: 2.2vw;
    }

    .day-of-week {
      height: 11vw;
      line-height: 11vw;
      font-size: 4vw;
    }

    .day-of-week:nth-last-child(n + 3), .day-of-week:nth-child(n + 6) {
      border-width: 0.7vw;
    }
  }
</style>
