<template>
    <p class="error" v-show="error">{{ error }}</p>
</template>

<script>

    export default {
        props: {
            error: '',
        },
    }
</script>
