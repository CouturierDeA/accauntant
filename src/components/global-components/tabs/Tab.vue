<template>
    <div class="tab" >
        <h3 class="tab__title">{{ title }}</h3>
        <TabControls :controls="controls" :activeTab="activeTab" @activeTab="switchTab"/>
        <div class="tab__panes">
            <slot></slot>
        </div>
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
                    return ''
                }
            },
            activeTab: {
                default: () => {
                    return false
                }
            },
            animateOnChange: {
                default: () => {
                    return false
                }
            },
        },
        data() {
            return {
                name: 'tab',
                controls: [],
                transition: true,
                shift: 0,
                height: '',
            }
        },
        methods: {
            switchTab(tabName) {
                this.$emit('update:activeTab', tabName)
            },
        }
    };

</script>

<style lang="scss" src="./Tab.scss"></style>
