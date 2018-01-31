<template>
    <div v-show="$parent.activeTab === name"
         class="tab__pane"
         :class="`mod--${name}`">
        <slot></slot>
    </div>

</template>

<script>

    export default {
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
        data() {
            return {
                control: {
                    name: this.name,
                    count: this.count
                }
            }
        },
        created() {
            this.$parent.controls.push({name: this.name, count: this.count, link: this});
        },
        destroyed() {
            const controls = this.$parent.controls;
            this.$delete(this.$parent.controls, this.$parent.controls.indexOf(this.name));
        },
        methods: {},
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
