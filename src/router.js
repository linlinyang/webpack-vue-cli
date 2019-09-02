import Vue from 'vue';
import Router from 'vue-router';
import {
    loadAsyncComponent
} from '@r/utils/router';

Vue.use(Router);

const router = new Router({
    //mode: 'history',
    routes: [{
        path: '/',
        name: 'login',
        component: () => loadAsyncComponent(import(/* webpackChunkName: "login" */'@/views/Login/index'))
    },{
        path: '/home',
        name: 'home',
        component: () => loadAsyncComponent(import(/* webpackChunkName: "home" */'@/views/Home/index'))
    },{
        path: '*',
        name: 'error',
        component: () => loadAsyncComponent(import(/* webpackChunkName: "error" */'@/views/ErrorPage/index'))
    }]
});

export default router;