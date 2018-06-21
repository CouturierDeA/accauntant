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
  import dataBus from 'src/data/data.bus';

  export default {
    components: {
      Header,
    },
    // mounted() {
    //   dataBus.$on('translateError', this.displayErrorMessage)
    // },
    // destroyed() {
    //   dataBus.$off('translateError', this.displayErrorMessage)
    // },
    // methods: {
    //   displayErrorMessage(message) {
    //     this.$message({
    //       type: 'error',
    //       message: this.$t(message)
    //     });
    //   }
    // }
  }

</script>

<style src="App.scss" lang="scss"></style>
