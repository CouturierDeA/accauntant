<template>
    <header class="header">
        <div class="header__wrap">
            <div class="header__logo">
                <!--<img class="header__logo-image" src="~assets/img/logo.png" alt="Vue js">-->
                <div class="header__logo-description">{{ $t('SiteTitle') }}</div>
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
        },
        destroyed() {
            if (typeof window !== 'undefined') {
                this.$root.headerHeight = 0;
                window.removeEventListener('resize', this.handleResize)
            }
        },
        mounted() {
            this.handleResize();
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', this.handleResize)
            }
        },
        methods: {
            handleResize() {
                this.$root.headerHeight = this.$el.offsetHeight
            }
        }
    }

</script>

<style src="./Header.scss" lang="scss"></style>