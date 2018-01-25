<template>
    <header class="header">
        <div class="header__wrap">
            <div class="header__logo">
                <img class="header__logo-image" src="~assets/img/logo.png" alt="Vue js">
                <div class="header__logo-description">Vue app example</div>
            </div>
            <nav class="header__nav">
                <router-link class="header__nav-link"
                             v-for="(route,key) in routesGetter"
                             :key="key"
                             :to="`${route.path}`"
                             v-text="route.name"/>
            </nav>

        </div>
    </header>
</template>

<script>
    export default {
        computed: {
            routesGetter() {
                return this.$router.options.routes;
            }
        }
    }
</script>

<style src="./Header.scss" lang="scss"></style>