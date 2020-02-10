<template lang="pug">
  .container
    ul
      li(v-for="activity in activities", :key="activity.id")
        .image-attachments(v-if="activity.content.attachments.imagesAttached.length > 0")
          .image-attachment(v-for="image of activity.content.attachments.imagesAttached"
            v-bind:key="image.id")
            div.image(v-bind:style="{ backgroundImage: 'url(' + image.imagePath + ')' }")
            span.hyphen -
            span.image-name {{ image.imageName }}
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { proxy } from '@/store';

@Component({
  name: 'TheFilesTab',
})
export default class TheFilesTab extends Vue {
  activities = proxy.activitiesStore.activities;
}
</script>

<style scoped>
  .image-attachments {
    display: flex;
    flex-direction: column;
  }

  .image-attachment {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    background: #F7F6F3;
  }

  .image-attachment span {
    font-size: 12px;
  }

  .image {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    border-radius: 6px;
    background-size: 50px 50px;
  }

  .hyphen {
    margin-right: 5px;
  }

  .image-name {
    height: min-content;
  }

  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .image-attachment {
      padding: 2.2vw;
      border-radius: 2vw;
      margin-bottom: 2.2vw;
    }

    .image-attachment span {
      font-size: 3vw;
    }

    .image {
      width: 11vw;
      height: 11vw;
      margin-right: 1.1vw;
      border-radius: 1.7vw;
      background-size: 11vw 11vw;
    }

    .hyphen {
      margin-right: 1.1vw;
    }
  }
</style>
