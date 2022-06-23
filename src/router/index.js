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
            component:()=>import('../components/mainpage.vue') ,
            children: [
                {
                    path: 'register',
                    name: 'register',
                    meta: { title: '注册' },
                    component:()=>import('../pages/register.vue'),
                },
                {
                    path: 'login',
                    name: 'login',
                    meta: { title: '登录' },
                    component:()=>import('../pages/login.vue'),
                },
                {
                    path: 'user_plan',
                    name: 'user_plan',
                    meta: { title: '定制个性计划' },
                    component:()=>import('../pages/plan_form.vue'),
                },
                {
                    path: 'plan',
                    name: 'plan',
                    meta: { title: '定制计划' },
                    component:()=>import('../pages/plan.vue'),
                },
                {
                    path: 'addCalendar',
                    name: 'addCalendar',
                    meta: { title: '添加训练' },
                    component:()=>import('../pages/addCalendar.vue'),
                },
                {
                    path: 'details',
                    name: 'details',
                    meta: { title: '详情' },
                    component:()=>import('../pages/details.vue'),

                    children: [

                        {
                            path: 'study',
                            name: 'study',
                            component:()=>import('../pages/study.vue'),
                        },
                    ],
                },
                {
                    path: 'more',
                    name: 'more',
                    component:()=>import('../pages/more.vue'),
                },
                
            ],
        },
        {
            path: '/',
            name: 'home',
            component:()=>import('../components/home.vue') ,
        }
    ],
});
// 前置路由守卫
    router.beforeEach((to,from,next)=>{
        const token = localStorage.getItem('token')
        if(to.name!=='login'&&to.name!=='mainpage'&&to.name!=='home'&&to.name!=='register'&&!token){
            next({name:'login'})
        }else next()
        if(token&&to.name=='login'||from.name=='login'&&to.name=='login'){
            next({name:'mainpage'})
        }else next()
        if(token&&to.name=='register'){
            next({name:'mainpage'})
        }else next()
        if(from.name!='login'&&to.name=='register'){
            next({name:'login'})
        }else next()
    })
// 后置路由守卫
router.afterEach((to, from) => {
    document.title = to.meta.title || '轻运动，定制属于自己的健身计划';
});
export default router;
