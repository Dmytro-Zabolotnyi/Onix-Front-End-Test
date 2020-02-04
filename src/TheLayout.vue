<template lang="pug">
  #app
    input#slide-menu-checkbox(type="checkbox", v-model="isSlideMenuActive")
    label.slide-menu-label(
      for="slide-menu-checkbox"
      v-bind:style="{ backgroundImage: 'url(' + slideMenuLabelIcon + ')' }"
    )

    TheHeader(
      v-on:change-notification-counter="changeNotificationCounter"
      v-on:uncheckCheckbox="hideSlideMenu")
    TheSidebar(v-bind:notificationCounter="notificationCounter")
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TheHeader from './components/TheHeader.vue';
import TheSidebar from './components/TheSidebar.vue';

@Component({
  name: 'App',
  components: { TheHeader, TheSidebar },
})

export default class TheLayout extends Vue {
  isSlideMenuActive: boolean = false;

  slideMenuLabelIcon: string = 'images/chevron-right.svg';

  notificationCounter: number = 3;

  changeNotificationCounter(index: number) {
    this.notificationCounter = index;
  }

  hideSlideMenuOnResize() {
    if ((window.innerWidth / window.innerHeight) > (980 / 927)) {
      if (this.isSlideMenuActive) {
        this.isSlideMenuActive = !this.isSlideMenuActive;
      }
    }
  }

  hideSlideMenu() {
    if (this.isSlideMenuActive) {
      this.isSlideMenuActive = !this.isSlideMenuActive;
    }
  }

  mounted() {
    this.$nextTick(function listener() {
      // noinspection JSPotentiallyInvalidUsageOfClassThis
      window.addEventListener('resize', this.hideSlideMenuOnResize);
      // noinspection JSPotentiallyInvalidUsageOfClassThis
      this.hideSlideMenuOnResize();
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.hideSlideMenuOnResize);
  }
}
</script>

<style>
    #app {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .slide-menu-label {
        display: none;
        position: absolute;
        top: 50%;
        left: 100%;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #FFC200;
        z-index: 1;
        -webkit-transition: left 0.3s, box-shadow 0.3s, -webkit-transform 0.3s;
        transition: left 0.3s, transform 0.3s, box-shadow 0.3s, -webkit-transform 0.3s;
    }

    .slide-menu-label:hover {
        cursor: pointer;
        box-shadow: 0 0 4px black;
    }

    #slide-menu-checkbox {
        display: none;
    }


    #slide-menu-checkbox:checked ~ .slide-menu-label {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        left: 250px;
    }

    @media screen and (max-aspect-ratio: 980/927) {
        .slide-menu-label {
            display: block;
            left: 30px;
        }
    }

    @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
        #slide-menu-checkbox:checked ~ .slide-menu-label {
            left: 55.4%;
        }

        .slide-menu-label {
            width: 8.71vw;
            height: 8.71vw;
            left: 1.6%;
        }

        .slide-menu-label:hover {
            box-shadow: 0 0 1vw black;
        }
    }
</style>
