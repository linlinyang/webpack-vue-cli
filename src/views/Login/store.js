import schema from './schema';
import axios from 'axios';

/* 
 * vuex数据
 */

const schemaFields = schema();
const loginForm = Object.keys(schemaFields).reduce((reducer,field) => {
    reducer[field] = schemaFields[field].value || '';
    return reducer;
},{});

const state = {//表单数据
    loginForm,
    lang: 'zh_CN'
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};