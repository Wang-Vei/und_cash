import Vue from 'vue';
import Vuex from 'vuex';
import { upload, updateRsaKey } from '@/assets/js/coin/c2c.js';

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
            } else {
                const toast = this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    mask: true,
                    message: '上传中',
                    loadingType: "spinner",
                });
                let hash = await upload(pubKey);
                console.log(hash);
                updateRsaKey(hash).then(
                    function(v) {
                        console.log(v);
                        toast.message = "上传成功"
                        toast.type = 'success'
                        ctx.commit("asyncUpkeys");
                        setInterval(() => {
                            toast.clear();
                        }, 1000)
                    },
                    function(e) {
                        console.log(e);
                        toast.message = "上传失败"
                        toast.type = 'fail'
                        setInterval(() => {
                                toast.clear();
                            }, 1000)
                            // layer.msg("上传失败");
                            // $(".upkeys").text("存储公钥");
                        return false;
                    }
                );
            }
        }
    }
})