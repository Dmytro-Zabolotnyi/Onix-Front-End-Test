<template>
    <div id="activity-container" class="container">
        <div class="day"></div>
        <div class="messages">
            <div class="message">
                <div class="message-icon"></div>
                <div class="message-content">
                    <span class="message-text"> {{ messageOne.text }} </span>
                    <div class="message-attachments" @click="changeNotificationCounter">
                        <div class="attachment"></div>
                        <div class="attachment"></div>
                        <div class="attachment"></div>
                        <div class="attachment"></div>
                    </div>
                </div>
                <div class="message-time"> {{ messageOne.time }} </div>
            </div>
            <div class="message">
                <div class="message-icon"></div>
                <div class="message-content">
                    <span class="message-text"> {{ messageTwo.text }} </span>
                    <div class="message-attachments"></div>
                </div>
                <div class="message-time"> {{ messageTwo.time }} </div>
            </div>
            <div class="message">
                <div class="message-icon"></div>
                <div class="message-content">
                    <span class="message-text"> {{ messageThree.text }} </span>
                    <div class="message-attachments"></div>
                </div>
                <div class="message-time"> {{ messageThree.time }} </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ActivityContainer",
        data: function () {
            return {
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
        },
        methods: {
            changeNotificationCounter: function () {
                let attachmentsArray = [...document.getElementsByClassName("attachment")];

                for (let i = 0; i < attachmentsArray.length; i++) {
                    attachmentsArray[i].onclick = function () {
                        document.getElementById("notification-counter").textContent = i.toString();
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>