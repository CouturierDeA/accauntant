import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';
import store from '../store';

const Airbill = () => import('views/AirbillPage/Airbill.vue');
const SignIn = () => import('views/SignInPage/SignIn.vue');

Vue.use(Router);
Vue.use(VueMeta);

const routerConfig = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sign_in',
      component: SignIn,
      meta: {requiresAuth: false}
    },
    {
      path: '/airbill',
      name: 'airbill',
      component: Airbill,
      meta: {requiresAuth: true}
    },

  ],
};

const router = new Router(routerConfig);

function afterEach(to, from) {
  store.state.loading = false;
}

function onReady() {
  store.state.loading = false;
}

function beforeEach(to, from, next) {

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    !store.getters['user/authorized'] ? next({path: '/',}) : next();

  } else {
    next();
  }
}

router.beforeEach(beforeEach);
router.afterEach(afterEach);
router.onReady(onReady);

export default router;
