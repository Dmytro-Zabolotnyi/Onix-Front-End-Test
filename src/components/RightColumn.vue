<template>
    <!-- right part of the page, presumably containing information
        about currently chosen project -->
    <div id="right-column" @click="hideSlideMenu">
        <header class="upper-part">
            <div class="upper-left">
                <div class="logo" v-bind:style="{ backgroundImage: 'url(' + projectLogo + ')' }"></div>
                <div class="project-name">
                    <span>{{ projectName }}</span>
                </div>
                <div class="menu">
                    <div class="menu-shapes"></div>
                </div>
            </div>
            <div class="upper-right">
                <div class="users">
                    <div class="users-pic"
                         v-for="item of userPics"
                         v-bind:style="{ backgroundImage: 'url(' + item.userPic + ')' }" v-bind:key="item.id">
                    </div>
                </div>
                <div class="share">Share</div>
                <div class="chat">
                    <div class="chat-icon"></div>
                    <span>Chat</span>
                </div>
            </div>
        </header>
        <div class="tabs">
            <input class="state" type="radio" name="radio-button" id="tasks-radio">
            <input class="state" type="radio" name="radio-button" id="activity-radio" checked>
            <div class="tab-labels">
                <label
                        for="tasks-radio"
                        id="tasks-radio-label"
                        class="tab-label">
                    <span>Tasks</span>
                </label>
                <label
                        id="kanban-radio-label"
                        class="tab-label">
                    <span>Kanban</span>
                </label>
                <label
                        for="activity-radio"
                        id="activity-radio-label"
                        class="tab-label">
                    <span>Activity</span>
                </label>
                <label
                        id="calendar-radio-label"
                        class="tab-label">
                    <span>Calendar</span>
                </label>
                <label
                        id="files-radio-label"
                        class="tab-label">
                    <span>Files</span>
                </label>
            </div>
            <div class="tab-content">
                <TasksContainer/>
                <div id="kanban-container" class="container"></div>
                <ActivityContainer v-on:changeNotificationCounter="changeNotificationCounter($event)"/>
                <div id="calendar-container" class="container"></div>
                <div id="files-container" class="container"></div>
            </div>
        </div>
    </div> <!-- right part of the page ends here. -->
</template>

<script>
    import TasksContainer from "./TasksContainer";
    import ActivityContainer from "./ActivityContainer";

    export default {
        name: "RightColumn",
        components: {TasksContainer, ActivityContainer},
        data: function () {
            return {
                projectLogo: "images/Shapes@2x.png",
                projectName: 'Website Redesign',
                chatIcon: "images/chat.svg",
                userPics: [
                    {userPic: "images/face2.png"},
                    {userPic: "images/face3.png"},
                    {userPic: "images/face4.png"}
                ]
            }
        },
        methods: {
            changeNotificationCounter: function (index) {
                this.$emit('changeNotificationCounter', index);
            },
            hideSlideMenu: function () {
                this.$emit('uncheckCheckbox');
            }
        }
    }

</script>

<style scoped>

    #right-column {
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
    }

    .chat-icon::before {
        position: absolute;
        width: 16px;
        height: 16px;
        content: "";
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

    #tasks-radio:checked ~ .tab-labels #tasks-radio-label,
    #activity-radio:checked ~ .tab-labels #activity-radio-label {
        border-bottom: 2px #FFC200 solid;
        padding-bottom: 12px;
    }

    #tasks-radio:checked ~ .tab-labels #tasks-radio-label span,
    #activity-radio:checked ~ .tab-labels #activity-radio-label span {
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

    .tab-labels label {
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

    .tab-labels span {
        opacity: 0.7;
    }

    #tasks-radio-label span:hover, #activity-radio-label span:hover {
        cursor: pointer;
        opacity: 1.0;
    }

    #tasks-radio-label {
        margin-left: 30px;
    }

    #kanban-radio-label {
        margin-left: 32px;
    }

    #activity-radio-label {
        margin-left: 27px;
    }

    #calendar-radio-label {
        margin-left: 31px;
    }

    #files-radio-label {
        margin-left: 27px;
    }

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

    .container {
        display: none;
        background: #FFFFFF;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        width: 50.7vw;
        height: 67.4vh;
        border-radius: 8px;
        position: absolute;
        top: 30px;
        left: 50%;
        -webkit-transform: translate(-50%);
        transform: translate(-50%);
        box-sizing: border-box;
        padding: 35px 30px;
        overflow-y: auto;
    }

    @media screen and (min-aspect-ratio: 1500/927) {
        .container {
            width: 60vw;
        }
    }

    @media screen and (max-aspect-ratio: 980/927) {
        #right-column {
            margin-left: 0;
            width: 100%;
        }

        .container {
            width: 80%;
            height: 90%;
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

        .chat-icon::before {
            width: 3.5vw;
            height: 3.5vw;
            background-size: 3.5vw 3.5vw;
            background-repeat: no-repeat;
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


        .tab-labels label {
            height: min-content;
            padding-bottom: 2.5vw;
        }

        .tab-labels span {
            font-size: 3.5vw;
            line-height: 4.5vw;
        }

        #tasks-radio-label {
            margin-left: 5vw;
        }

        #kanban-radio-label, #activity-radio-label, #calendar-radio-label, #files-radio-label {
            margin-left: 7vw;
        }

        #tasks-radio:checked ~ .tab-labels #tasks-radio-label,
        #activity-radio:checked ~ .tab-labels #activity-radio-label {
            opacity: 1;
            border-bottom: 0.435vw #FFC200 solid;
            padding-bottom: 2.065vw;
        }

        .tab-content {
            box-sizing: border-box;
            padding: 5vw 5vw;
        }

        .container {
            position: relative;
            left: 0;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            border-radius: 1.75vw;
            width: 98%;
            height: 98%;
            padding: 5.62vw 4.54vw;
        }

    }
</style>