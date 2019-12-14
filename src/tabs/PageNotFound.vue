<template lang="pug">
  .container {{ message }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'PageNotFound',
})
export default class PageNotFound extends Vue {
  message: string = 'Error 404: Page not found...';
}
</script>

<style scoped>
  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .container {
      font-size: 3.5vw;
    }
  }
</style>
