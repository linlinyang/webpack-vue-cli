import Axios from "axios";

/* 
 * vuex数据
 */


const state = {
    welcome: 'Hello Home Page',
    datas: {
        data: [],
        pindex: 0,
        psize: 10,
        total: 100
    }
};

const getters = {};

const mutations = {
    saveData(state,payload){
        state.datas = {
            ...state.datas,
            ...payload
        };
    }
};

const actions = {
    async initData({commit,state}){
        const {
            status,
            data: {
                code,
                message,
                datas
            }
        } = await Axios.get('/api/home');
        
        return new Promise((_,reject) => {
            if(status === 200 && code === 0){
                commit('saveData',datas);
            }else{
                reject(message || '请求失败');
            }
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