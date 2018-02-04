<template>
    <section class="container tasks">
        <h2 class="section__title">{{ $t('tasks.title') }}</h2>
        <AnimatedList></AnimatedList>
        <Todo/>
    </section>
</template>

<script>
    import Todo from '../../todo/Todo.vue'

    export default {
        components: {
            Todo
        }
    }

</script>

<style lang="scss">
    @import "../../../scss/core";

    .tasks {
        @include grid-padding();

    }

</style>
