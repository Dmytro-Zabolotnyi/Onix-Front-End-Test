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

</style>
