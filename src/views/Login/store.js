import schema from './schema';
import axios from 'axios';

const loginForm = Object.keys(schema).reduce((reducer,field) => {
    reducer[field] = schema[field].value || '';
    return reducer;
},{});

const state = {
    loginForm
};

const getters = {};

const mutations = {

};

const actions = {
    postLogin({commit,state}){
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