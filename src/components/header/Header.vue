<template>
    <header class="header">
        <div class="header__wrap">
            <div class="header__logo">
                <img class="header__logo-image" src="~assets/img/logo.png" alt="Vue js">
                <div class="header__logo-description">Vue app example</div>
            </div>
            <RouterNav :class_name="'header'"></RouterNav>
            <LanguageSwitcher></LanguageSwitcher>
        </div>
    </header>
</template>

<script>
    import LanguageSwitcher from '../language-switcher/LanguageSwitcher'

    export default {
        components: {
            LanguageSwitcher
        }
    }

</script>

<style src="./Header.scss" lang="scss"></style>