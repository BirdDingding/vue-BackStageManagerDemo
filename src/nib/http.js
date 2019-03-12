import axios from 'axios'
import Vue from 'vue'
// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// axios拦截器  只要通过 axios 调用接口，就会调用的回调函数
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // console.log(config);
        // 添加 token 值，其中 login 页面不需要
        if (config.url.indexOf('/login') == -1) {
            config.headers.Authorization = window.sessionStorage.getItem('token')
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

// 相应拦截 
axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        Vue.prototype.$message(response.data.meta.msg)
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    });

// 暴露
export default {
    install(Vue) {
        Vue.prototype.$http = axios
    }
}