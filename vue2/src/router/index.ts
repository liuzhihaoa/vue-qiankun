/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:43:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-11-11 10:13:42
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
   {
     path: '/about',
     name: 'about',
     // route level code-splitting
     // this generates a separate chunk (about.[hash].js) for this route
   // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/theme',
    name: 'theme',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '../views/theme.vue')
  }
]


export default routes
