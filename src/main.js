import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//  导入路由 
import router from './nib/router'
// 导入 axios
import http from './nib/http'
Vue.use(http)

// 导入饿了么 UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
