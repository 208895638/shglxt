import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from "@/components/login"
import register from "@/components/register"
import index from "@/components/index"
import aside from "@/components/aside"
import account from "@/components/account"
import detailOfCapital from "@/components/detailOfCapital"
import recharge from "@/components/recharge"
import widthdrawalsManagement from "@/components/widthdrawalsManagement"
import subordinateManagement from "@/components/subordinateManagement"
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: "/account",
      children:[
        {
          path:'/account',
          name: 'account',
          component: account
        },
        {
          path:'/detailOfCapital',
          name: 'detailOfCapital',
          component: detailOfCapital
        },
        {
          path:'/recharge',
          name: 'recharge',
          component: recharge
        },
        {
          path:'/widthdrawalsManagement',
          name: 'widthdrawalsManagement',
          component: widthdrawalsManagement
        },
        {
          path:'/subordinateManagement',
          name: 'subordinateManagement',
          component: subordinateManagement
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/aside',
      name: 'aside',
      component: aside
    },
    {
      path: '/account',
      name: 'account',
      component: account
    }
  ]
})
