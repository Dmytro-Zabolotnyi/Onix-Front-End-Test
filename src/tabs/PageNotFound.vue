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

</style>
