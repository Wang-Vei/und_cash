import Vue from 'vue';
import Vuex from 'vuex';
import { upload } from '@/assets/js/coin/c2c.js';

Vue.use(Vuex);

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
        // async asyncUpkeys(ctx) {
        //     ctx.commit("asyncUpkeys");
        //     console.log("action")
        // },
        async asyncUpkeys(ctx) {
            var pubKey = localStorage.getItem(String('pubKey'));
            console.log(pubKey);
            if (!pubKey) {
                this.$toast({
                    //duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '未找到您的公钥',
                    // loadingType: 'load',
                    type: 'fail',
                    // selector: '#van-toast'
                });
                return;
            }
            let hash = await upload(pubKey);

            console.log(hash);

            // $(".upkeys").text("提交中，请等待...");
            updateRsaKey(hash).then(
                function(v) {
                  console.log(v);
                    // layer.msg("上传成功");
                    // $('#reskey').val(1);
                    // $('.upkeys').css('display', 'none');
                    // $('.havekeys').css('display', 'block');
                    // $('#keysremark').css('display', 'none');
                    //     Verification(v,1);
                    ctx.commit("asyncUpkeys");
                },
                function(e) {
                    console.log(e);
                    // layer.msg("上传失败");
                    // $(".upkeys").text("存储公钥");
                    return false;
                }
            );

        }
    }
})
