<template>
    <!-- left part of the page, contains header, user info, task info
        and menu -->
    <div class="left-column">
        <header class="header">
            <div class="header-logo"></div>
            <div class="company-name"> {{ companyName }}</div>
            <div class="search"></div>
        </header>
        <div class="user-info">
            <div class="user-picture"></div>
            <div class="user-name-and-status">
                <div class="user-name"> {{ user.name }}</div>
                <div class="user-status"> {{ user.status }}</div>
            </div>
            <div class="user-menu-button">
                <div class="user-menu-shapes"></div>
            </div>
        </div>
        <div class="task-stats">
            <div class="completed-tasks" @click="changeTasksCounter()">
                <div id="completed-number"> {{ tasks.completedNumber }}</div>
                <div class="tasks-label"><span>Completed Tasks</span></div>
            </div>
            <div class="open-tasks">
                <div id="open-number"> {{ tasks.openNumber }}</div>
                <div class="tasks-label"><span>Open Tasks</span></div>
            </div>
        </div>
        <ul class="aside-menu">
            <li class="menu">MENU</li>
            <li class="aside-menu-home">
                <span>Home</span>
            </li>
            <li class="aside-menu-tasks">
                <span>My Tasks</span>
            </li>
            <li class="aside-menu-notifications">
                <span>Notifications</span>
                <div id="notification-counter"> {{ notificationCounter }}</div>
            </li>
        </ul>
    </div> <!-- left/upper part of the page ends here -->
</template>

<script>
    export default {
        name: "LeftColumn",
        props: {
            notificationCounter: {
                type: Number
            }
        },
        data: function () {
            return {
                companyName: 'PROJECTUS',
                user: {
                    name: 'Jean Gonzales',
                    status: 'Product Owner'
                },
                tasks: {
                    completedNumber: 372,
                    openNumber: 11
                }
            }
        },
        methods: {
            changeTasksCounter: function () {
                if (this.tasks.openNumber > 0) {
                    if (confirm("Are you sure you want to change the number of tasks?")) {
                        this.tasks.openNumber--;
                        this.tasks.completedNumber++;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>