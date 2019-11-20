<template>
    <div id="tasks-container" class="container">
        <div class="tasks">
            <div class="day"></div>
            <ul>
                <li v-for="(task, taskIndex) in tasks" v-bind:key="taskIndex">
                    <span v-for="(item, itemIndex) in task" v-bind:key="itemIndex">{{ item }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TasksContainer",
        data: function () {
            return {
                tasks: [
                    ['Teeth', 'Take a toothbrush and make your breath fresh.', '6:35 AM'],
                    ['Dog', 'Pet your dog and take it for a morning jog.', '7:10 AM'],
                    ['Shower', 'Give yourself a pleasure of a morning shower.', '7:20 AM'],
                    ['Breakfast', 'Cook and eat some bacon and eggs.', '7:50 AM'],
                    ['Car', 'Grab your keys, head to the car and leave to work.', '8:20 AM'],
                    ['Work', 'Be a good pal and make something worthy today.', '6:00 PM'],
                    ['Date', 'Have a good time with a beautiful woman.', '9:00 PM'],
                    ['Home', "Bring yourself home. And take your beautiful woman with you. She's your wife, after all.", '9:45 PM'],
                    ['Evening', "You're a big boy, come up with something.", '11:30 PM'],
                    ['Teeth', "Your dentist told you to brush your teeth twice a day, didn't he?", '11:35 PM'],
                    ['Sleep', 'It was a good day, time to let it go and have some sleep.', '11:40 PM']
                ]
            }
        }
    }
</script>

<style scoped>
    .tasks {
        width: 100%;
    }

    ul li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: min-content;
        width: 100%;
        margin: 30px 0;
        border-radius: 8px;
        box-sizing: border-box;
    }

    ul li:last-child {
        margin-bottom: 0;
    }

    span {
        white-space: normal;
        font-size: 15px;
        line-height: 18px;
        color: #131313;
    }

    span:nth-child(1), span:nth-child(3) {
        flex: 1;
        font-size: 14px;
        color: #131313;
        line-height: 20px;
    }

    span:nth-child(1) {
        flex-basis: 70px;
    }

    span:nth-child(2) {
        width: 100%;
        background: #F7F6F3;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 20px 20px;
    }

    span:nth-child(3) {
        align-self: flex-end;
        text-align: right;
        opacity: 0.7;
        white-space: nowrap;
    }

    span:nth-child(1) + span:nth-child(2),
    span:nth-child(2) + span:nth-child(3) {
        margin-left: 20px;
    }

    @media screen and (max-aspect-ratio: 1/2) {
        .day {
            margin-bottom: 0.65vw;
        }

        .day::before {
            font-size: 3vw;
        }

        span {
            font-size: 3.5vw;
            line-height: 4.5vw;
        }

        span:nth-child(1) {
            flex-basis: 10vw;
        }

        span:nth-child(2) {
            border-radius: 2.175vw;
            padding: 4.35vw 4.35vw;
        }

        span:nth-child(1), span:nth-child(3) {
            font-size: 3vw;
            line-height: 4vw;
        }

        span:nth-child(3) {
            white-space: normal;
        }

        span:nth-child(1) + span:nth-child(2),
        span:nth-child(2) + span:nth-child(3) {
            margin-left: 4.35vw;
        }
    }
</style>