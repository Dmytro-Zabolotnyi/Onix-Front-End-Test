<template>
    <div id="activity-container" class="container">
        <div class="day"></div>
        <div class="activities">
            <div class="activity" v-for="activity of activities" v-bind:key="activity.id">
                <div class="activity-icon"></div>
                <div class="activity-content">
                    <span class="activity-text"> {{ activity.content.text }} </span>
                    <div class="activity-attachments">
                        <div class="text-attachment" v-if="activity.anyTextAttached">
                            {{ activity.content.attachments.textAttached }}
                        </div>
                        <!--eslint-disable-next-line-->
                        <div class="image-attachment" v-if="activity.anyImagesAttached"
                             v-for="(image, index) of activity.content.attachments.imagesAttached" v-bind:key="image.id"
                             @click="addOnClickEvent(index)">
                        </div>
                    </div>
                </div>
                <div class="activity-time"> {{ activity.time }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ActivityContainer",
        data: function () {
            return {
                activities: [
                    {
                        anyImagesAttached: true,
                        anyTextAttached: false,
                        icon: {
                            imagePath: "../images/toolbarButton-download1.svg",
                        },
                        content: {
                            text: "Darika Samak uploaded 4 files on An option to search in " +
                                "current projects or in all projects",
                            attachments: {
                                imagesAttached: [
                                    {imagePath: ""},
                                    {imagePath: ""},
                                    {imagePath: ""},
                                    {imagePath: ""}
                                ],
                                textAttached: ""
                            }
                        },
                        time: "6:02 PM"
                    },
                    {
                        anyImagesAttached: false,
                        anyTextAttached: true,
                        icon: {
                            imagePath: "../images/square-speech-bubble-svgrepo-com.svg",
                        },
                        content: {
                            text: "Emilee Simchenko commented on Account for teams and " +
                                "personal in bottom style",
                            attachments: {
                                imagesAttached: [],
                                textAttached: "During a project build, it is necessary to evaluate " +
                                    "the product design and development against project " +
                                    "requirements and outcomes"
                            }
                        },
                        time: "7:32 PM"
                    },
                    {
                        anyImagesAttached: false,
                        anyTextAttached: false,
                        icon: {
                            imagePath: "",
                        },
                        content: {
                            text: "Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users",
                            attachments: {
                                imagesAttached: [],
                                textAttached: ""
                            }
                        },
                        time: "8:40 PM"
                    }
                ]
            }
        },
        methods: {
            addOnClickEvent: function (index) {
                this.$emit('changeNotificationCounter', index);
            }
        }
    }
</script>

<style scoped>

</style>