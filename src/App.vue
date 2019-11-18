<template>
    <div id="app">
        <input type="checkbox" id="slide-menu-checkbox" v-model="checked">
        <label id="slide-menu-label" for="slide-menu-checkbox"></label>
        <RightColumn/>
        <LeftColumn/>
    </div>
</template>

<script>
    import RightColumn from "./components/RightColumn";
    import LeftColumn from "./components/LeftColumn";

    export default {
        name: 'app',
        components: {LeftColumn, RightColumn},
        data: function () {
            return {
                checked: false
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                window.addEventListener('resize', this.uncheckCheckbox);
                document.getElementById('right-column').addEventListener('click', this.uncheckCheckboxTwo);

                this.uncheckCheckbox();
                this.uncheckCheckboxTwo();
            })
        },
        methods: {
            uncheckCheckbox: function () {
                if ((window.innerWidth / window.innerHeight) > (980/927)) {
                    if (this.checked) {
                        this.checked = !this.checked;
                    }
                }
            },
            uncheckCheckboxTwo: function () {
                if (this.checked) {
                    this.checked = !this.checked;
                }
            }
        }
    }
</script>

<style>

</style>