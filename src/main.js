// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import store from './store'
import axios from 'axios'
import moment from "moment";
import {delCookie} from "./assets/cookie";

axios.defaults.withCredentials = true;// 允许跨域携带cookie
Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$axios = axios
Vue.filter('dateformat',function (dataStr,pattern = 'YYYY-MM-DD HH:mm:ss'){
  return moment(dataStr).format(pattern)
})
Vue.prototype.$cookieStore = {delCookie}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
