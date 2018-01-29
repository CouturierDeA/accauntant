<template>
    <div id="app">
        <Header></Header>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import Header from './components/header/Header.vue';

    export default {
        data() {
            return {
                visible: false,
                visible2: false,
            }
        },
        components: {
            Header,
        },
        methods: {
            openPopup() {
                this.visible = true;
            }
        }
    }
</script>

<style src="App.scss" lang="scss"></style>
