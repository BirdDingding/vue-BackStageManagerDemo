import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from '../components/login.vue'

// 路由规则
let routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        // 登陆组件
        path: '/login',
        component: login
    }
]

// 路由实例
let router = new VueRouter({
    routes
})

// 暴露路由
export default router