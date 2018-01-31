<template>
    <div class="tab__pane" :class="classObj">
        <slot></slot>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                control: {name: this.name, count: this.count, component: this},
                shift: 0
            }
        },
        props: {
            name: {
                default: () => {
                    return 'Label'
                }
            },
            count: {
                default: () => {
                    return 0
                }
            },
            tab: this.tab
        },
        created() {
            this.addControll()
        },
        destroyed() {
            this.removeControll()

        },
        methods: {
            addControll() {
                const controls = this.$parent.controls;

                if (controls.indexOf(this.control) === -1) {
                    controls.push(this.control);
                }

            },
            removeControll() {
                const controls = this.$parent.controls;
                const controlIndex = controls.indexOf(this.control);

                if (controlIndex !== -1) {
                    this.$delete(controls, controlIndex);
                }

            }
        },
        computed: {
            computedTab() {
                return this.$parent.activeTab;
            },
            classObj() {
                return {
                    [`mod--${this.name}`]: this.name,
                    active: (this.computedTab === this.name)
                }
            },
        },
    };

</script>

<style lang="scss">
    @import "../../../scss/core";

    .tab__pane {
        min-width: 100%;

        opacity: 0;
        transition: opacity $transition-bezier;

        &.active {
            opacity: 1;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }

</style>
