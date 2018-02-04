<template>
    <div class="tab" >
        <h3 class="tab__title">{{ title }}</h3>
        <TabControls :controls="controls" :activeTab="activeTab" @activeTab="switchTab"/>
        <div class="tab__panes">
            <div class="tab__slider" :class="{ 'transition' : transition }" ref="tabSlider" :style="sliderStyle">
                <slot ref="tabSlides"></slot>
            </div>
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
        computed: {
            sliderStyle() {
                return {
                    'transform': `translateX(${-this.shift}px)`,
                    'height': this.height
                }
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
