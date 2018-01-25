<template>
    <header class="header">
        <div class="header__wrap">
            <div class="header__logo">
                <img class="header__logo-image" src="~assets/img/logo.png" alt="Vue js">
                <div class="header__logo-description">Vue app example</div>
            </div>
            <RouterNav :class_name="'header'"></RouterNav>
        </div>
    </header>
</template>

<script>
    import RouterNav from '../../router/RouterNav.vue'

    export default {
        components: {
            RouterNav
        },
    }
</script>

<style src="./Header.scss" lang="scss"></style>