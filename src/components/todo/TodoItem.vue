<template>
    <div class="task el-tab-pane" :class="{complete : taskComplete}">
        <el-checkbox color="primary" v-model="taskComplete"><span class="text">{{ task.name }}</span></el-checkbox>
        <slot></slot>
    </div>

</template>

<script>
    export default {
        props: {
            task: this.task,
        },
        data() {
            return {}
        },
        computed: {
            taskComplete: {
                get: function () {
                    return this.task.complete
                },
                set: function (newValue) {
                    this.task.complete = newValue;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../scss/core";

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
