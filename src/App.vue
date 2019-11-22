<template>
    <div id="app">
        <input
                type="checkbox"
                id="slide-menu-checkbox"
                v-model="isSlideMenuActive"
        >
        <label
                id="slide-menu-label"
                for="slide-menu-checkbox"
                v-bind:style="{ backgroundImage: 'url(' + slideMenuLabelIcon + ')' }">
        </label>
        <RightColumn
                v-on:changeNotificationCounter="changeNotificationCounter($event)"
                v-on:uncheckCheckbox="hideSlideMenu"
        />
        <LeftColumn v-bind:notificationCounter="notificationCounter"/>
    </div>
</template>

<script>
    import RightColumn from "./components/RightColumn";
    import LeftColumn from "./components/LeftColumn";

    export default {
        name: 'app',
        components: {RightColumn, LeftColumn},
        data: function () {
            return {
                isSlideMenuActive: false,
                slideMenuLabelIcon: "images/chevron-right.svg",
                notificationCounter: 3
            }
        },
        methods: {
            changeNotificationCounter: function (index) {
                this.notificationCounter = index;
            },
            hideSlideMenuOnResize: function () {
                if ((window.innerWidth / window.innerHeight) > (980 / 927)) {
                    if (this.isSlideMenuActive) {
                        this.isSlideMenuActive = !this.isSlideMenuActive;
                    }
                }
            },
            hideSlideMenu: function () {
                if (this.isSlideMenuActive) {
                    this.isSlideMenuActive = !this.isSlideMenuActive;
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                window.addEventListener('resize', this.hideSlideMenuOnResize);
                this.hideSlideMenuOnResize();
            })
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.hideSlideMenuOnResize)
        }
    }
</script>

<style>
    #app {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #slide-menu-label {
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

    #slide-menu-label:hover {
        cursor: pointer;
        box-shadow: 0 0 4px black;
    }

    #slide-menu-checkbox {
        display: none;
    }


    #slide-menu-checkbox:checked ~ #slide-menu-label {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        left: 250px;
    }

    @media screen and (max-aspect-ratio: 980/927) {
        #slide-menu-label {
            display: block;
            left: 30px;
        }
    }

    @media screen and (max-aspect-ratio: 1/2), (max-aspect-ratio: 2/3) and (max-width: 415px) {
        #slide-menu-checkbox:checked ~ #slide-menu-label {
            left: 55.4%;
        }

        #slide-menu-label {
            width: 8.71vw;
            height: 8.71vw;
            left: 1.6%;
        }

        #slide-menu-label:hover {
            box-shadow: 0 0 1vw black;
        }
    }
</style>