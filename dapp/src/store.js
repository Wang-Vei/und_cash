import Vue from 'vue';
import Vuex from 'vuex';
import { upload, updateRsaKey } from '@/assets/js/coin/c2c.js';
import { Toast } from 'vant';


Vue.use(Vuex,Toast);

export default new Vuex.Store({
    state: {
        upkeys: false, //是否上传公钥（添加网关）
    },
    mutations: {
        asyncUpkeys(state) {
            state.upkeys = true;
            console.log("mutations");
        }
    },
    actions: {
        async asyncUpkeys(ctx) {
            ctx.commit("asyncUpkeys");
        }
    }
})
