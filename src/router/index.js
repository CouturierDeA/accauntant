import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

import store from '../store';

import AccountantTable from 'components/accountant-table/AccountantTable.vue';
import Tasks from 'components/pages/tasks/Tasks.vue';
import SignIn from 'components/pages/sign-in/SignIn.vue';
import testPage from 'components/pages/test-page/TestPage.vue';
// import ApplicantSettings from 'ApplicantProfile/components/applicant-settings';

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
            path: '/tasks',
            name: 'tasks',
            component: Tasks,
        },
        {
            path: '/accountant-table',
            name: 'accountant-table',
            component: AccountantTable,
            meta: {requiresAuth: false}
        },
        {
            path: '/test-page',
            name: 'Test Page',
            component: testPage,
            meta: {requiresAuth: false}
        },
        // {   path: '/App/ApplicantProfile/Vue/ApplicantSettings',
        //     component: ApplicantSettings,
        //     display: 'My Settings'},

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
        !store.state.user.authorized ? next({path: '/',}) : next();

    } else {
        next();
    }
}

router.beforeEach(beforeEach);
router.afterEach(afterEach);
router.onReady(onReady);

export default router;
