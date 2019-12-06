import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: () => import ('@/components/Index.vue'),
            meta:{
                title:'全球网关支付系统',
            //     needlogin:true,
            }
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import ( /* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
  // router.beforeEach((to, from, next) => {
  // 	if (to.meta.title) {
  // 	  document.title = to.meta.title
  // 	}
  // 	next()
  // });
});

