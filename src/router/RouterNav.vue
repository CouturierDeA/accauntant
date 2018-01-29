<template>
    <nav :class="`${class_name}__nav`">
        <router-link v-for="(route,key) in routesGetter" :class="`${class_name}__nav-link`"
                     :key="key"
                     :to="`${route.path}`"
                     v-text="route.name"/>
        <a v-if="auth" href="#" class="header__nav-link" @click="onLogOut($event)">Log Out</a>
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
            onLogOut($event) {
                $event.preventDefault();
                this.$store.commit('user/setAuthorized', null);
                this.$router.push('/');
            }
        },
        computed: {
            auth() {
                return this.$store.state.user.authorized;
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