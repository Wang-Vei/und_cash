import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import flexible from 'lib-flexible/';
import fastClick from 'fastclick';
import '@/assets/css/reset.css';
import '@/assets/css/border.css';

import { Field } from 'vant';
Vue.use(Field);


fastClick.attach(document.body); //防止移动端300ms的点击延迟
// Vue.config.devtools = false; //关闭dev模式
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');