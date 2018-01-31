<template>
    <div class="tab">
        <h3 class="tab__title">{{ title }}</h3>
        <TabControls :controls="controls" :activeTab="activeTab" @activeTab="switchTab"/>
        <slot/>
    </div>
</template>

<script>
    import TabControls from './TabControls.vue';

    export default {
        components: {
            TabControls
        },
        props: {
            title: {
                default: () => {
                    return 'Tabs'
                }
            },
            activeTab: {
                default: () => {
                    return false
                }
            }
        },
        data() {
            return {
                name: 'tab',
                controls: []
            }
        },
        methods: {
            switchTab(tabName) {
                this.$emit('update:activeTab', tabName)
            },
        }
    };
</script>

<style lang="scss">
    /*@import "../../../scss/core";*/

</style>
