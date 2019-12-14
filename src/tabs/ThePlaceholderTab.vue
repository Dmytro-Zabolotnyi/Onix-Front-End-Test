<template lang="pug">
  .container {{ placeholder }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'ThePlaceholderTab.vue',
})
export default class ThePlaceholderTab extends Vue {
  placeholder: string = 'Coming soon...';
}
</script>

<style scoped>
  @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
    .container {
      font-size: 3.5vw;
    }
  }
</style>
