// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import store from "@/store"
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'

window.vue1 = Vue
Vue.use(Vuex)
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
window.VM = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 禁止进入
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (store.state.userLogin) {
//       next()
//     } else {
//       VM.$message({
//           message: '登录状态已失效,禁止进入!',
//           type: 'warning'
//         });
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })