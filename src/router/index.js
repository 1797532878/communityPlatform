import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/header.css'

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
import Search from "../views/Search";
import myPosts from "../views/myPosts";
import myReply from "../views/myReply";

import Shop from '../views/shop/shop'
import Item from '../views/shop/item'
import Cart from '../views/shop/cart'
import CheckOut from '../views/shop/checkout'
import Payment from '../views/shop/payment'
import Account from '../views/shop/account'
import Order from '../views/account/order'

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
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/myPosts',
      name: 'myPosts',
      component: myPosts
    },
    {
      path: '/myReply',
      name: 'myReply',
      component: myReply
    },
    // shop
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'CheckOut',
      component: CheckOut
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/account',
      component: Account,
      children: [{
        path: '',
        name: 'Account',
        component: Order
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {

  // ?????????????????????????????????????????????????????????token
  const isLogin = sessionStorage.getItem('isLogin')
  // ??????token????????????????????????????????????????????????????????????
  if (to.path === '/setting') {
    if (!isLogin) return next('/login')
  } else if (to.path === '/discussDetail'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/profile'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/letter'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/letter/list'){
    if (!isLogin) return next('/login')
  } else if (to.path === '/notice'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/followee'){
    if (!isLogin) return next('/login')
  }else if (to.path === '/follower'){
    if (!isLogin) return next('/login')
  } else {
    // ???????????????????????????????????????????????????????????????
    return next()
  }
  next()
})

export default router
