<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <Popup></Popup>
    </div>
</template>

<script>
    import Popup from './components/popup/Popup.vue'

    export default {
        components: {
            Popup
        }

    }
</script>

<style src="App.scss" lang="scss"></style>
