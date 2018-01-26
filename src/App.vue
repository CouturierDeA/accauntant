<template>
    <div id="app">
        <Header></Header>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Header from './components/header/Header.vue';
    // import Popup from './components/popup/Popup.vue';
    //
    // Vue.component('Popup', Popup);

    export default {
        data() {
            return {
                visible: false
            }
        },
        components: {
            Header,
        }
    }
</script>

<style src="App.scss" lang="scss"></style>
