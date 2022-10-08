import VueRouter from 'vue-router';
const dev = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
const redirectPath = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ? '/m_mainPage/m_home/view?name=全部'
    : 'mainpage';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 're',
            redirect: redirectPath,
        },
        //动态加载组件，以箭头函数形式

        {
            path: '/m_mainPage',
            name: 'm_mainPage',
            meta: { type: 'mobile' },
            component: () => import('../components/mobile/m_mainPage.vue'),
            children: [
                {
                    path: 'login',
                    name: 'm_login',
                    meta: { type: 'mobile' },
                    components: { login:() => import('@/pages/mobile/m_login')},
                },
                {
                    path:'register',
                    name:'m_register',
                    meta: { type: 'mobile' },
                    components: { login:() => import('@/pages/mobile/m_register.vue')},
                },
                {
                    path: 'm_user',
                    name: 'm_user',
                    meta: { title: '我的', type: 'mobile' },
                    component: () => import('../components/mobile/mid/m_user'),
                },
                {
                    path: 'm_home',
                    name: 'm_home',
                    meta: { title: '主页', type: 'mobile' },
                    component: () => import('../components/mobile/mid/m_home'),
                    children: [
                        {
                            path: 'view',
                            name: 'view',
                            meta: {  type: 'mobile' },
                            component: () => import('../pages/mobile/card_view'),
                        },
                    ],
                },
                {
                    path: 'm_calendar',
                    name: 'm_calendar',
                    meta: { title: '日历', type: 'mobile' },
                    component: () => import('../components/mobile/mid/m_calendar.vue'),
                },
            ],
        },
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
                            meta: { title: '详情', type: 'pc' },
                            component: () => import('../pages/MoreDetails.vue'),

                            children: [
                                {
                                    path: 'study',
                                    name: 'mstudy',
                                    meta: { title: '详情', type: 'pc' },

                                    component: () => import('../pages/study.vue'),
                                },
                            ],
                        },
                        {
                            path: 'MoreAddCalendar',
                            name: 'MoreAddCalendar',
                            meta: { title: '添加训练', type: 'pc' },
                            component: () => import('../pages/MoreAddCalendar.vue'),
                        },
                    ],
                },
                {
                    path: 'planChart',
                    name: 'planChart',
                    meta: { type: 'pc' },
                    component: () => import('../pages/planChart.vue'),
                },
                {
                    path: 'searchResult',
                    name: 'searchResult',
                    meta: { type: 'pc' },

                    component: () => import('../pages/searchResult.vue'),
                    children: [
                        {
                            path: 'addCalendar',
                            name: 'saddCalendar',
                            meta: { title: '添加训练', type: 'pc' },
                            component: () => import('../pages/addCalendar.vue'),
                        },
                        {
                            path: 'details',
                            name: 'sdetails',
                            meta: { title: '详情', type: 'pc' },
                            component: () => import('../pages/details.vue'),

                            children: [
                                {
                                    path: 'study',
                                    name: 'sstudy',
                                    meta: { type: 'pc' },

                                    component: () => import('../pages/study.vue'),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'Likes',
                    name: 'Likes',
                    meta: { type: 'pc' },
                    component: () => import('../pages/Likes.vue'),
                    children: [
                        {
                            path: 'addCalendar',
                            name: 'laddCalendar',
                            meta: { title: '添加训练', type: 'pc' },
                            component: () => import('../pages/addCalendar.vue'),
                        },
                        {
                            path: 'details',
                            name: 'ldetails',
                            meta: { title: '详情', type: 'pc' },
                            component: () => import('../pages/details.vue'),

                            children: [
                                {
                                    path: 'study',
                                    name: 'lstudy',
                                    meta: { type: 'pc' },
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
        window.location.hash == '/' &&
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
    if (dev && to.meta.type !== 'mobile') {
        next({ name: 're' });
    }
    if (!dev && to.meta.type !== 'pc') {
        next({ name: 're' });
    }
    if (to.name == 'm_mainPage') {
        next({ name: 're' });
    }
});
// 后置路由守卫
router.afterEach((to, from) => {
    document.title = to.meta.title || '轻运动，定制属于自己的健身计划';
});
export default router;
