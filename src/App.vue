<template>
    <div id="app">
        <input type="checkbox" id="slide-menu-checkbox" v-model="checked">
        <label id="slide-menu-label" for="slide-menu-checkbox"></label>
        <RightColumn v-on:changeNotificationCounter="changeNotificationCounter($event)" v-on:uncheckCheckbox="uncheckCheckbox"/>
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
                checked: false,
                notificationCounter: 3
            }
        },
        methods: {
            changeNotificationCounter: function (index) {
                this.notificationCounter = index;
            },
            uncheckCheckboxOnResize: function () {
                if ((window.innerWidth / window.innerHeight) > (980/927)) {
                    if (this.checked) {
                        this.checked = !this.checked;
                    }
                }
            },
            uncheckCheckbox: function () {
                if (this.checked) {
                    this.checked = !this.checked;
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                window.addEventListener('resize', this.uncheckCheckboxOnResize);
                this.uncheckCheckboxOnResize();
            })
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.uncheckCheckboxOnResize)
        }
    }
</script>

<style>

</style>