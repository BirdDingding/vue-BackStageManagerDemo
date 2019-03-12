import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'

// 路由规则
let routes = [
    {
        // 登陆组件
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: index,
        children: [{
            path: 'users',
            component: users
        }]
    }
]

// 路由实例
let router = new VueRouter({
    routes
})

//  使用导航守卫阻拦没登录的访问
router.beforeEach((to, from, next) => {
    // token无误，直接 next 进入到下一个页面
    // 直接去登录页面，不需要拦截
    if (to.path == '/login') {
        next()
    } else {
        // 如果不是登录页面，判断 token
        if (window.sessionStorage.getItem('token')) {
            next()
        } else {
            Vue.prototype.$message.warning('兄嘚，登录去')
            next('/login')
        }
    }
})

// 暴露路由
export default router