<template>
    <div v-show="computedTab === name"
         :class="classObj"
         class="tab__pane">
        <slot></slot>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                control: {name: this.name, count: this.count, component: this}
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
            computedTab(){
                return this.$parent.activeTab;
            },
            classObj() {
                return {
                    [`mod--${this.name}`]: this.name,
                    active: (this.computedTab === this.name)
                }
            }
        },
    };

</script>

<style lang="scss">
    @import "../../../scss/core";

    .task {
        display: flex;
        align-items: center;

        & + .task {
            margin-top: $gw/2;
        }
    }

    .complete .text {
        text-decoration: line-through;
    }

    .task__delete {
        margin-left: auto;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }

</style>
