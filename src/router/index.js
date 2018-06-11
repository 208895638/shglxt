import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"
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
const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: "/account",
      meta: { 
        requireAuth: true
      },
      children:[
        {
          path:'/account',
          name: 'account',
          component: account,
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/detailOfCapital',
          name: 'detailOfCapital',
          component: detailOfCapital,
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/recharge',
          name: 'recharge',
          component: recharge,
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/widthdrawalsManagement',
          name: 'widthdrawalsManagement',
          component: widthdrawalsManagement,
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/subordinateManagement',
          name: 'subordinateManagement',
          component: subordinateManagement,
          // meta: { 
          //   requireAuth: true
          // }
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

export default router