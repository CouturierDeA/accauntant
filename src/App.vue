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
        components: {
            Header,
        }
    }
</script>

<style src="App.scss" lang="scss"></style>
