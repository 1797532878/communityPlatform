import Vue from 'vue'
import Router from 'vue-router'
import Index from  '../views/index'
import Login from "../views/Login"
import Register from "../views/Register"
import Activacation from "../views/Activacation";
import setting from "../views/setting";
import discussDetail from "../views/discussDetail";
import blankPage from "../views/blankPage";
import letter from "../views/letter";
import letterDetail from "../views/letter-detail"
import profile from "../views/profile";
import followee from "../views/followee";
import follower from "../views/follower";
import notice from "../views/notice";
import noticeDetail from "../views/notice-detail"

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activation/:id/:activationCode',
      name: 'Activation',
      component: Activacation
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/discussDetail',
      name: 'discussDetail',
      component: discussDetail
    },
    {
      path: '/blankPage',
      name: 'blankPage',
      component: blankPage
    },
    {
      path: '/letter',
      name: 'letter',
      component: letter
    },
    {
      path: '/letterDetail',
      name: 'letterDetail',
      component: letterDetail
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/followee',
      name: 'followee',
      component: followee
    },
    {
      path: '/follower',
      name: 'follower',
      component: follower
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: noticeDetail
    }
  ]
})

router.beforeEach((to, from, next) => {

  // 如果访问的是有登录权限的页面，先要获取token
  const isLogin = sessionStorage.getItem('isLogin')
  // 如果token为空，强制跳转到登录页面；否则，直接放行
  if (to.path === '/setting') {
    if (!isLogin) return next('/login')
  } else if (to.path === '/discussDetail'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/profile'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/letter'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/notice'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/followee'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/follower'){
    if (!isLogin) return next('/login')
  } else {
    // 如果访问的是登录页面（无需权限），直接放行
    return next()
  }
  next()
})

export default router
