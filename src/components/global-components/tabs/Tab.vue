<template>
    <div class="tab" @tabUpdate="tabUpdated">
        <h3 class="tab__title">{{ title }}</h3>
        <TabControls :controls="controls" :activeTab="activeTab" @activeTab="switchTab"/>
        <div class="tab__panes">
            <div class="tab__slider"  ref="tabSlider" :style="sliderStyle">
                <slot/>
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
                    return 'Tabs'
                }
            },
            activeTab: {
                default: () => {
                    return false
                }
            },
            watchContent:{
                default: () => {
                    return false
                }
            },
        },
        data() {
            return {
                name: 'tab',
                controls: [],
                shift: 0,
                height: '',
            }
        },
        mounted() {
            this.slideTab();
            window.addEventListener('resize', this.slideTab);
            if(this.watchContent){
                this.$watch('watchContent', function(){
                    this.slideTab();
                });
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.slideTab)
        },
        watch: {
            activeTab: function (nv, ov) {
                this.$nextTick(() => {
                    this.slideTab();
                });
            }
        },
        computed: {
            sliderStyle() {
                console.log('this.shift', this.shift);

                return {
                    'transform': `translateX(${-this.shift}px)`,
                    'height': this.height
                }
            }
        },
        methods: {
            tabUpdated(){
              alert('tabUpdated');
            },
            slideTab() {
                const tabSlider = this.$refs.tabSlider;
                if (tabSlider) {
                    let activeTab = tabSlider.querySelector('.tab__pane.active');
                    if (activeTab) {
                        this.shift = activeTab.offsetLeft;
                        console.log(activeTab.offsetHeight);
                        this.height = `${activeTab.offsetHeight}px`;
                    }
                }
            },
            switchTab(tabName) {
                this.$emit('update:activeTab', tabName)
            },
        }
    };

</script>

<style lang="scss">
    @import "../../../scss/core";

    .tab__panes {
        overflow: hidden;
    }

    .tab__slider {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        will-change: transform, height;
        transition: transform $transition-long, height $transition-long;
    }

</style>
