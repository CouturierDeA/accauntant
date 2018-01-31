<template>
    <div class="tab">
        <h3 class="tab__title">{{ title }}</h3>
        <TabControls :controls="controls" :activeTab="activeTab" @activeTab="switchTab"/>
        <div class="tab__panes">
            <div class="tab__slider" :class="{  'transition' : transition }" ref="tabSlider" :style="sliderStyle">
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
                transition: false,
                shift: 0,
                height: '',
            }
        },
        mounted() {
            this.animateTab();
            setTimeout(()=>{ this.transition = true; });

            if (this.animateOnChange) {
                this.$watch('animateOnChange', ()=> {this.animateTab();});
            }
            window.addEventListener('resize', this.animateTab);
        },
        destroyed() {
            window.removeEventListener('resize', this.animateTab)
        },
        watch: {
            activeTab: function (nv, ov) {
                this.$nextTick(() => {
                    this.animateTab();
                });
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
            animateTab() {
                const tabSlider = this.$refs.tabSlider;
                if (tabSlider) {
                    let activeTab = tabSlider.querySelector('.tab__pane.active');
                    if (activeTab) {
                        this.shift = activeTab.offsetLeft;
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

        &.transition {
            transition: transform $transition-bezier, height $transition-bezier;
        }
    }

</style>
