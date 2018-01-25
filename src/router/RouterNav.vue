<template>
    <nav :class="`${class_name}__nav`">
        <router-link :class="`${class_name}__nav-link`"
                     v-for="(route,key) in routesGetter"
                     :key="key"
                     :to="`${route.path}`"
                     v-text="route.name"/>
    </nav>
</template>

<script>
    export default {
        props:{
          class_name : {
              default : ()=>{
                  return 'header'
              }
          }
        },
        computed: {
            routesGetter() {
                return this.$router.options.routes;
            }
        }
    }
</script>

<style src="./RouterNav.scss" lang="scss"></style>