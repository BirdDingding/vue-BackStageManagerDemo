import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'

// 路由规则
let routes = [
    {
        // 登陆组件
        path: '/login',
        component: login
    },
    {
        path: '',
        redirect: 'index'
    },
    {
        path: '/index',
        component: index
    }
]

// 路由实例
let router = new VueRouter({
    routes
})

// 暴露路由
export default router