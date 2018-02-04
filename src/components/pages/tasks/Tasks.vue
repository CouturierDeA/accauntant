<template>
    <section class="container tasks">
        <h2 class="section__title">{{ $t('tasks.title') }}</h2>
        <Todo/>
    </section>
</template>

<script>
    import Todo from '../../todo/Todo.vue'

    export default {
        components: {
            Todo
        },
        metaInfo() {
            return {title: this.$t('tasks.title')};
        }
    }

</script>

<style lang="scss">
    @import "../../../scss/core";

    .tasks {
        @include grid-padding();

    }

</style>
