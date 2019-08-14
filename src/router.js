import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login/index';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'login',
        component: Login
    },{
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index')
    }]
});