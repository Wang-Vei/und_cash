import Vue from 'vue';
import Vuex from 'vuex';
import { upload, updateRsaKey } from '@/assets/js/coin/c2c.js';
import { Toast } from 'vant';


Vue.use(Vuex,Toast);

export default new Vuex.Store({
    state: {
        upkeys: false, //是否上传公钥（添加网关）
        orderList:""   //交易记录
    },
    mutations: {
      asyncUpkeys(state) {
        state.upkeys = true;
      },
      showOrder(state,v){
        if(v){
          state.orderList = v;
        }
      }
    },
    actions: {
      showOrder(ctx,v){
        ctx.commit('showOrder',v);
      },
      async asyncUpkeys(ctx) {
        ctx.commit("asyncUpkeys")
      },

    }
})
