import store from "./store";
import router from "./router";
import App from './App.vue';

export const params = {
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {App}
};