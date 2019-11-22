<template>
    <div id="activity-container" class="container">
        <div class="day"></div>
        <div class="activities">
            <div class="activity" v-for="activity of activities" v-bind:key="activity.id">
                <div
                        class="activity-icon"
                        v-bind:style="{
                        'background-color': activity.icon.backgroundColor,
                        'background-image': 'url(' + activity.icon.imagePath + ')'
                        }">
                </div>
                <div class="activity-content">
                    <span class="activity-text">{{ activity.content.text }}</span>
                    <div class="activity-attachments">
                        <div class="text-attachments" v-if="activity.content.attachments.textsAttached.length > 0">
                            <span
                                    class="text-attachment"
                                    v-for="(text) of activity.content.attachments.textsAttached" v-bind:key="text.id">
                                {{ text.textAttached }}
                            </span>
                        </div>
                        <div class="image-attachments" v-if="activity.content.attachments.imagesAttached.length > 0">
                            <div class="image-attachment"
                                 v-bind:style="{ backgroundImage: 'url(' + image.imagePath + ')' }"
                                 v-for="(image, index) of activity.content.attachments.imagesAttached"
                                 v-bind:key="image.id"
                                 @click="addOnClickEvent(index)">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="activity-time">{{ activity.time }}</div>
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
                        icon: {
                            imagePath: "images/toolbarButton-download1.svg",
                            backgroundColor: "#E3EFFF"
                        },
                        content: {
                            text: "Darika Samak uploaded 4 files on An option to search in " +
                                "current projects or in all projects",
                            attachments: {
                                imagesAttached: [
                                    {imagePath: "images/attached-pic1.jpg"},
                                    {imagePath: "images/attached-pic2.jpg"},
                                    {imagePath: "images/attached-pic3.jpg"},
                                    {imagePath: "images/attached-pic4.jpg"}
                                ],
                                textsAttached: []
                            }
                        },
                        time: "6:02 PM"
                    },
                    {
                        icon: {
                            imagePath: "images/square-speech-bubble-svgrepo-com.svg",
                            backgroundColor: "#FFF8DD"
                        },
                        content: {
                            text: "Emilee Simchenko commented on Account for teams and " +
                                "personal in bottom style",
                            attachments: {
                                imagesAttached: [],
                                textsAttached: [
                                    {
                                        textAttached: "During a project build, it is necessary to evaluate " +
                                            "the product design and development against project " +
                                            "requirements and outcomes"
                                    }
                                ]

                            }
                        },
                        time: "7:32 PM"
                    },
                    {
                        icon: {
                            imagePath: "images/Icon@3x.svg",
                            backgroundColor: "#CEF9C6"
                        },
                        content: {
                            text: "Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users",
                            attachments: {
                                imagesAttached: [],
                                textsAttached: []
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
    .day {
        margin-bottom: 2px;
    }

    .day::before {
        content: "TODAY";
        opacity: 0.5;
        font-size: 14px;
        color: #131313;
    }

    .activities {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        flex-direction: column-reverse;
        align-content: flex-start;
    }

    .activity {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        margin-top: 30px;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }

    .activity-icon {
        display: block;
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        background-position: center;
    }

    .activity-content {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        position: relative;
        width: 100%;
        margin-right: 5px;
    }

    .activity-text {
        display: block;
        position: relative;
        width: 85%;
    }

    .activity-time {
        display: block;
        position: relative;
        min-width: 55px;
        height: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .activity-text:nth-child(n) {
        font-size: 16px;
        color: #131313;
        line-height: 20px;
    }

    .activity:nth-child(n) .activity-time {
        opacity: 0.7;
        font-size: 14px;
        color: #131313;
        line-height: 20px;
    }

    .text-attachments {
        display: -webkit-box;
        display: flex;
        width: 100%;
        -webkit-box-orient: vertical;
        flex-direction: column;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .image-attachments {
        display: -webkit-box;
        display: flex;
        width: 100%;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .image-attachment {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        cursor: pointer;
        background-color: #202020;
        background-size: 100%;
        -webkit-transition: box-shadow 0.3s;
        transition: box-shadow 0.3s;
    }

    .image-attachment:nth-child(n) {
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .image-attachment:hover {
        box-shadow: 0 0 5px #202020;
        border-bottom: 4px #ffc200 solid;
        margin-bottom: 6px;
    }

    .text-attachment {
        display: -webkit-box;
        display: flex;
        width: 100%;
        background: #F7F6F3;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 20px 20px;
        font-size: 15px;
        line-height: 18px;
        color: #131313;
    }

    .text-attachment:nth-child(n+2) {
        margin-top: 10px;
    }

    .text-attachments ~ .image-attachments {
        margin-top: 10px;
    }

    @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
        .day {
            margin-bottom: 0.65vw;
        }

        .day::before {
            font-size: 3vw;
        }

        .activity {
            margin-top: 6.54vw;
        }

        .activity-icon {
            min-width: 8.71vw;
            height: 8.71vw;
            margin-right: 4.355vw;
            background-size: 2.59vw 2.59vw;
        }

        .activity-content {
            margin-right: 1.4vw;
        }

        /*noinspection CssInvalidPropertyValue*/
        .activity-time {
            min-width: -webkit-min-content;
            min-width: -moz-min-content;
            min-width: min-content;
            height: -webkit-min-content;
            height: -moz-min-content;
            height: min-content;
        }

        .text-attachments, .image-attachments {
            margin-top: 4.35vw;
        }

        .text-attachments ~ .image-attachments {
            margin-top: 4.35vw;
        }

        .activity-text:nth-child(n) {
            font-size: 3.5vw;
            line-height: 4.5vw;
        }

        .activity:nth-child(n) .activity-time {
            font-size: 3vw;
            line-height: 4vw;
        }

        .image-attachment {
            width: 21.79vw;
            height: 21.79vw;
            border-radius: 1.757vw;
        }

        .image-attachment:hover {
            box-shadow: 0 0 1.75vw #202020;
            border-bottom: 1vw #ffc200 solid;
            margin-bottom: 1.18vw;
        }

        .image-attachment:nth-child(n) {
            margin-bottom: 2.18vw;
            margin-right: 2.18vw;
        }

        .text-attachment:nth-child(n) {
            border-radius: 2.175vw;
            padding: 4.35vw 4.35vw;
            font-size: 3.26vw;
            line-height: 4vw;
        }

        .text-attachment:nth-child(n+2) {
            margin-top: 4.35vw;
        }
    }

</style>