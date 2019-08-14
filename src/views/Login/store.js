import schema from './schema';
import axios from 'axios';

const loginForm = Object.keys(schema).reduce((reducer,field) => {
    reducer[field] = schema[field].value || '';
    return reducer;
},{});

const state = {//表单数据
    loginForm
};

const getters = {};

const mutations = {

};

const actions = {
    postLogin({commit,state}){//请求登录
        return axios.post('/api/login',{
            ...state.loginForm
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};