import '@r/utils/autoPolyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import {
    i18n
} from '@r/lang/';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
