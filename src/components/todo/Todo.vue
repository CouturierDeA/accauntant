<template>
    <div class="todo form__controll">

        <Tab :activeTab.sync="activeTab" :watchContent="computedTasks" title="Task List">

            <TabPane name="pending" :count="computedTasks.pending.length">

                <TodoItem v-for="(task,key) in computedTasks.pending"
                          v-bind:task="task">

                    <el-button class="task__delete"
                               type="danger"
                               @click="deleteTask(task)">Delete
                    </el-button>
                </TodoItem>

            </TabPane>

            <TabPane name="completed" :count="computedTasks.completed.length">

                <TodoItem v-for="(task,key) in computedTasks.completed"
                          v-bind:task="task">
                    <el-button class="task__delete"
                               type="danger"
                               @click="deleteTask(task)">Delete
                    </el-button>
                </TodoItem>

            </TabPane>

            <TabPane name="deleted" :count="deleted.length">

                <TodoItem v-for="(task,key) in deleted"
                          v-bind:task="task">
                    <el-button class="task__delete"
                               type="success"
                               @click="restoreTask(task)">Restore
                    </el-button>
                </TodoItem>

            </TabPane>
        </Tab>

        <div class="submit-wrap">
            <el-input @keydown-enter="addTask()" placeholder="Add task"
                      v-model="newTaskName"/>
            <el-button :color="newTaskName.length > 0 ? 'primary' : 'default'" @click="addTask">Add</el-button>
        </div>
    </div>
</template>


<script>

    import TodoItem from '../../components/todo/TodoItem.vue';

    export default {
        components: {
            TodoItem
        },
        data() {
            return {
                activeTab: 'pending',
                newTaskName: '',
                tasks: this.$store.getters['tasks/getTasks'],
                deleted: []
            }
        },
        created() {
        },
        watch: {
            computedTasks: function (nv, ov) {
                if (nv !== ov) {
                    this.$store.commit('tasks/setTasks', this.tasks);
                    // this.$store.dispatch('tasks/updateAll', this.tasks).then().catch(e => {})
                }
            }
        },
        computed: {
            computedTasks() {
                const tasksSorted = {
                    pending: [],
                    completed: []
                };

                function filterByComplete(obj) {
                    (obj.complete) ? tasksSorted.completed.push(obj) : tasksSorted.pending.push(obj)
                }

                this.tasks.filter(filterByComplete);

                return tasksSorted;
            },
        },
        methods: {
            restoreTask(task) {
                this.$delete(this.deleted, this.deleted.indexOf(task));
                this.tasks.push(task);
            },
            addTask() {
                if (this.newTaskName.length) {
                    this.tasks.push({name: this.newTaskName, complete: false, image: ''});
                    this.clearNewTaskName();
                }
            },
            deleteTask(task) {
                this.$delete(this.tasks, this.tasks.indexOf(task));
                this.deleted.push(task);
            },
            clearNewTaskName() {
                this.newTaskName = ''
            }
        }
    };

</script>

<style lang="scss">
    @import "../../scss/core";

    .todo {
        width: 100%;
        max-width: 600px;
        margin: auto;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            overflow-y: auto;
        }

        .submit-wrap {
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin-top: $gw;

        }
    }
</style>
