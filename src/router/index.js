import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/components/index'], resolve),
      redirect: "/login",
      meta: { 
        requireAuth: true
      },
      children:[
        {
          path:'/account',
          name: 'account',
          component: (resolve) => require(['@/components/account'], resolve)
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/detailOfCapital',
          name: 'detailOfCapital',
          component: (resolve) => require(['@/components/detailOfCapital'], resolve),
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/recharge',
          name: 'recharge',
          component: (resolve) => require(['@/components/recharge'], resolve),
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/widthdrawalsManagement',
          name: 'widthdrawalsManagement',
          component: (resolve) => require(['@/components/widthdrawalsManagement'], resolve),
          // meta: { 
          //   requireAuth: true
          // }
        },
        {
          path:'/subordinateManagement',
          name: 'subordinateManagement',
          component: (resolve) => require(['@/components/subordinateManagement'], resolve),
          // meta: { 
          //   requireAuth: true
          // }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/components/login'], resolve),
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['@/components/register'], resolve),
    },
    {
      path: '/aside',
      name: 'aside',
      component: (resolve) => require(['@/components/aside'], resolve),
    },
    {
      path: '/account',
      name: 'account',
      component: (resolve) => require(['@/components/account'], resolve),
    }
  ]
})

export default router