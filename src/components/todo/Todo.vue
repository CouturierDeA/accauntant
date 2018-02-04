<template>
    <div class="todo form__controll">

        <Tab :activeTab.sync="activeTab" :title="$t('tasks.list_title')">
           <transition name="fade" mode="out-in">
               <TabPane name="pending"
                        :label="$t('tasks.pending')"
                        :count="computedTasks.pending.length">
                   <AnimatedList>
                       <TodoItem v-for="(task,key,index) in computedTasks.pending"
                                 @commitAllTasks="commitAllTasks"
                                 v-bind:key="`pending-${key}`"
                                 v-bind:data-index="key"

                                 v-bind:task="task">

                           <button class="task__delete mod--danger"
                                      @click="deleteTask(task)">{{ $t('tasks.delete') }}
                           </button>
                       </TodoItem>
                   </AnimatedList>

               </TabPane>
           </transition>
           <transition name="fade" mode="out-in">
               <TabPane name="completed"
                        :label="$t('tasks.completed')"
                        :count="computedTasks.completed.length">
                   <AnimatedList>
                       <TodoItem v-for="(task,key,index) in computedTasks.completed"
                                 @commitAllTasks="commitAllTasks"
                                 v-bind:key="`completed-${key}`"
                                 v-bind:data-index="key"
                                 v-bind:task="task">
                           <button class="task__delete mod--danger"
                                   @click="deleteTask(task)">{{ $t('tasks.delete') }}
                           </button>
                       </TodoItem>
                   </AnimatedList>
               </TabPane>
           </transition>
           <transition name="fade" mode="out-in">
               <TabPane name="deleted"
                        :label="$t('tasks.deleted')"
                        :count="deleted.length">
                   <AnimatedList>
                       <TodoItem v-for="(task,key,index) in deleted"
                                 @commitAllTasks="commitAllTasks"
                                 v-bind:key="`deleted-${key}`"
                                 v-bind:data-index="key"
                                 v-bind:task="task">
                           <button class="task__delete mod--success"
                                      @click="restoreTask(task)">{{  $t('tasks.restore') }}
                           </button>
                       </TodoItem>
                   </AnimatedList>
               </TabPane>
           </transition>
        </Tab>

        <div class="submit-wrap">
            <el-input @keydown-enter="addTask()" :placeholder="$t('tasks.add_label')"
                      v-model="newTaskName"/>
            <el-button :color="newTaskName.length > 0 ? 'primary' : 'default'" @click="addTask">{{ $t('tasks.add') }}</el-button>
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
            commitAllTasks() {
                this.$store.commit('tasks/setTasks', this.tasks);
            },
            restoreTask(task) {
                this.$delete(this.deleted, this.deleted.indexOf(task));
                this.tasks.push(task);
            },
            addTask() {
                if (this.newTaskName.length) {
                    this.tasks.push({name: this.newTaskName, complete: false, image: ''});
                    this.clearNewTaskName();
                    this.commitAllTasks();
                }
            },
            deleteTask(task) {
                this.$delete(this.tasks, this.tasks.indexOf(task));
                this.deleted.push(task);
                this.commitAllTasks();
            },
            clearNewTaskName() {
                this.newTaskName = ''
            }
        }
    };

</script>

<style lang="scss" src="./Todo.scss"></style>
