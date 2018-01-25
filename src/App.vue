<template>
    <div id="app">
        <Header></Header>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <Popup></Popup>
    </div>
</template>

<script>
    import Header from './components/header/Header.vue'
    import Popup from './components/popup/Popup.vue'

    export default {
        components: {
            Header,
            Popup
        }

    }
</script>

<style src="App.scss" lang="scss"></style>
