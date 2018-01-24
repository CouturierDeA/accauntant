<template>
    <div class="popup__content mod--first">
        <h3 class="popup__title">{{ greetings }}</h3>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                greetings: 'Hello from second popup!'
            }
        },
    }
</script>

