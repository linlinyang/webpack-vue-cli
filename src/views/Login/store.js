import schema from './schema';
import axios from 'axios';

/* 
 * vuex数据
 */

const loginForm = Object.keys(schema).reduce((reducer,field) => {
    reducer[field] = schema[field].value || '';
    return reducer;
},{});

const state = {//表单数据
    loginForm,
    datas: 'zoro'
};

const getters = {};

const mutations = {
    updateDatas(state,payload){
        state.datas = payload.a;
    }
};

const actions = { //登录界面UI操作
    postLogin({commit,state}){//请求登录
        return axios.post('/api/login',{
            ...state.loginForm
        });
    },
    async loadData({commit}){
        const {
            data,
            status
        } = await axios.post('/api/loadData');
        
        commit('updateDatas',data);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};