<template>
    <div class="task" :class="{complete : taskComplete}">
        <div class="task__wrap">
            <div class="task__image" :style="`background-image: url(${taskImage})`">
                <input class="task__image-input"
                       type="file" name="image"
                       v-validate.reject="'image|size:400'"
                       @change="onFileChange"
                >
                <span class="task__image-message"
                      :class="{ 'mod--error': v_errors.has('image')}"
                      v-if="v_errors.has('image')">
                {{ v_errors.first('image') }}</span>
            </div>

            <el-checkbox class="task__complete"
                         color="primary"
                         v-model="taskComplete">

            </el-checkbox>
            <textarea v-model="taskName" @change="commitAllTasks" class="task__text"></textarea>
            <slot/>
        </div>
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
        methods: {
            commitAllTasks() {
                this.$emit('commitAllTasks');
            },
            onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.taskImage = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.taskImage = '';
            },
            enter(el) {
                el.style.opacity = 1;
                el.style.height = 'auto';
            },
            leave(el, done) {
                TweenMax.to(el, 1, {opacity: 0, height: 0, onComplete: done}, 0);
            },
            afterLeave(el) {
                el.style.opacity = 1;
                el.style.height = 'auto';
            },
        },
        computed: {
            taskName: {
                get: function () {
                    return this.task.name
                },
                set: function (newValue) {
                    this.task.name = newValue;
                    this.commitAllTasks();
                }
            },
            taskImage: {
                get: function () {
                    return this.task.image
                },
                set: function (newValue) {
                    this.task.image = newValue;
                    this.commitAllTasks();
                }
            },
            taskComplete: {
                get: function () {
                    return this.task.complete
                },
                set: function (newValue) {
                    this.task.complete = newValue;
                    this.commitAllTasks();
                }
            }
        }
    };

</script>

<style lang="scss" src="./TodoItem.scss"></style>
