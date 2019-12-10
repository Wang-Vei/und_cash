import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import flexible from 'lib-flexible/';
import fastClick from 'fastclick';
import '@/assets/css/reset.css';
import '@/assets/css/border.css';
import '@/assets/css/vant_new.scss';
import '@/assets/css/iconfont.css';
// import { Lazyload } from 'vant';
// Vue.use(Lazyload);


fastClick.attach(document.body); //防止移动端300ms的点击延迟
// Vue.config.devtools = false; //关闭dev模式
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

//路由守卫  验证登录状态
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
    // var needlogin = to.meta.needlogin;
    // // 判断该路由是否需要登录权限
    // if (needlogin === true) {
    //   if ($cookies.get('uid')) {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // } else {
    //   next()  // 确保一定要有next()被调用
    // }
});