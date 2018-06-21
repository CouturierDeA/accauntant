<template>
  <nav :class="`${class_name}__nav`">
    <router-link v-for="(route,key) in routesGetter" :class="`${class_name}__nav-link`"
                 :key="key"
                 :to="`${route.path}`"
                 v-text="$t(`${route.name}.title`)"/>
    <a v-if="auth" href="#" class="header__nav-link" @click.prevent="onLogOut">{{ $t('general.logout') }}</a>
  </nav>
</template>

<script>
  export default {
    props: {
      class_name: {
        default: () => {
          return 'header'
        }
      }
    },
    methods: {
      onLogOut() {
        this.$store.commit('user/setAuthorized', null);
        this.$router.push('/');
      }
    },
    computed: {
      auth() {
        const auth = this.$store.getters['user/authorized'];
        console.log('auth',auth);
        return auth;
      },
      routesGetter() {
        const routes = this.$router.options.routes;

        return routes.reduce((memo, item) => {
          if (item.meta) {
            if (item.meta.requiresAuth) {
              return (this.auth ? memo.push(item) : null), memo
            } else {
              return !this.auth ? memo.push(item) : null, memo
            }
          }
          return memo.push(item), memo;
        }, []);
      }
    }
  }
</script>

<style src="./RouterNav.scss" lang="scss"></style>