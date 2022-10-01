import VueRouter from 'vue-router';
const router = new VueRouter({
    routes: [
        // {
        //     path:'/login',
        //     name:'login',
        //     component:login
        // },
        //动态加载组件，以箭头函数形式
        {
            path: '/mainpage',
            name: 'mainpage',
            meta: { type: 'pc' },
            component: () => import('../components/mainpage.vue'),
            children: [
                {
                    path: 'register',
                    name: 'register',
                    meta: { title: '注册', type: 'pc' },
                    component: () => import('../pages/register.vue'),
                },
                {
                    path: 'login',
                    name: 'login',
                    meta: { title: '登录', type: 'pc' },
                    component: () => import('../pages/login.vue'),
                },
                {
                    path: 'edit',
                    name: 'edit',
                    meta: { title: '编辑资料', type: 'pc' },
                    component: () => import('../pages/edit.vue'),
                },
                {
                    path: 'addCalendar',
                    name: 'addCalendar',
                    meta: { title: '添加训练', type: 'pc' },
                    component: () => import('../pages/addCalendar.vue'),
                },
                {
                    path: 'details',
                    name: 'details',
                    meta: { title: '详情', type: 'pc' },
                    component: () => import('../pages/details.vue'),

                    children: [
                        {
                            path: 'study',
                            name: 'study',
                            meta: { type: 'pc' },
                            component: () => import('../pages/study.vue'),
                        },
                    ],
                },
                {
                    path: 'more',
                    name: 'more',
                    meta: { type: 'pc' },
                    component: () => import('../pages/more.vue'),
                    children: [
                        {
                            path: 'Moredetails',
                            name: 'Moredetails',
                            meta: { title: '详情',type:'pc'},
                            component: () => import('../pages/MoreDetails.vue'),

                            children: [
                                {
                                    path: 'study',
                                    name: 'study',
                                    meta: { title: '详情',type:'pc'},

                                    component: () => import('../pages/study.vue'),
                                },
                            ],
                        },
                        {
                            path: 'MoreAddCalendar',
                            name: 'MoreAddCalendar',
                            meta: { title: '添加训练',type:'pc' },
                            component: () => import('../pages/MoreAddCalendar.vue'),
                        },
                    ],
                },
                {
                    path: 'planChart',
                    name: 'planChart',
                    meta:{type:'pc'},
                    component: () => import('../pages/planChart.vue'),
                },
                {
                    path: 'searchResult',
                    name: 'searchResult',
                    meta:{type:'pc'},

                    component: () => import('../pages/searchResult.vue'),
                    children: [
                        {
                            path: 'addCalendar',
                            name: 'addCalendar',
                            meta: { title: '添加训练',type:"pc"},
                            component: () => import('../pages/addCalendar.vue'),
                        },
                        {
                            path: 'details',
                            name: 'details',
                            meta: { title: '详情',type:"pc"},
                            component: () => import('../pages/details.vue'),

                            children: [
                                {
                                    path: 'study',
                                    name: 'study',
                                    component: () => import('../pages/study.vue'),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'Likes',
                    name: 'Likes',
                    meta:{type:'pc'},
                    component: () => import('../pages/Likes.vue'),
                    children: [
                        {
                            path: 'addCalendar',
                            name: 'addCalendar',
                            meta: { title: '添加训练',type:'pc'},
                            component: () => import('../pages/addCalendar.vue'),
                        },
                        {
                            path: 'details',
                            name: 'details',
                            meta: { title: '详情',type:'pc' },
                            component: () => import('../pages/details.vue'),

                            children: [
                                {
                                    path: 'study',
                                    name: 'study',
                                    meta:{type:'pc'},
                                    component: () => import('../pages/study.vue'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        // {
        //     path: '/',
        //     name: 'home',
        //     component:()=>import('../components/home.vue') ,
        // }
    ],
});
// 前置路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (
        to.name != 'login' &&
        to.name != 'mainpage' &&
        this.$route.path == '/' &&
        to.name != 'register' &&
        !token
    ) {
        next({ name: 'login' });
    } else next();
    if ((token && to.name == 'login') || (from.name == 'login' && to.name == 'login')) {
        next({ name: 'mainpage' });
    } else next();
    if (token && to.name == 'register') {
        next({ name: 'mainpage' });
    } else next();
    if (from.name != 'login' && to.name == 'register') {
        next({ name: 'login' });
    } else next();
});
// 后置路由守卫
router.afterEach((to, from) => {
    document.title = to.meta.title || '轻运动，定制属于自己的健身计划';
});
export default router;
