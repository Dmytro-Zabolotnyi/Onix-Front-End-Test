<template>
    <!-- right part of the page, presumably containing information
        about currently chosen project -->
    <div id="right-column">
            <header class="upper-part">
                <div class="upper-left">
                    <div class="logo"></div>
                    <div class="project-name">
                        <span> {{ projectName }} </span>
                    </div>
                    <div class="menu">
                        <div class="menu-shapes">
                        </div>
                    </div>
                </div>
                <div class="upper-right">
                    <div class="users">
                        <div class="users-pic"></div>
                        <div class="users-pic"></div>
                        <div class="users-pic"></div>
                    </div>
                    <div class="share">Share</div>
                    <div class="chat">
                        <div></div>
                        <span>Chat</span>
                    </div>
                </div>
            </header>
            <div class="tabs">
                <input class="state" type="radio" name="radio-button" id="tasks-radio">
                <input class="state" type="radio" name="radio-button" id="activity-radio" checked>
                <div class="tab-labels">
                    <label for="tasks-radio" id="tasks-radio-label" class="tab-label"><span>Tasks</span></label>
                    <label id="kanban-radio-label" class="tab-label"><span>Kanban</span></label>
                    <label for="activity-radio" id="activity-radio-label" class="tab-label"><span>Activity</span></label>
                    <label id="calendar-radio-label" class="tab-label"><span>Calendar</span></label>
                    <label id="files-radio-label" class="tab-label"><span>Files</span></label>
                </div>
                <div class="tab-content">
                    <TasksContainer/>
                    <div id="kanban-container" class="container"></div>
                    <ActivityContainer/>
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
                projectName: 'Website Redesign',
                messageOne: {
                    text: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
                    time: '6:02 PM'
                },
                messageTwo: {
                    text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
                    time: '7:32 PM'
                },
                messageThree: {
                    text: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
                    time: '8:40 PM'
                }
            }
        }
    }

</script>

<style scoped>

</style>