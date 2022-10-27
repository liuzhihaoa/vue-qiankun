/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:29:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-10-08 11:13:03
 * @description: 
 */
import {  RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title:'vue3Home页面'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      title:'vue3About页面'
    }
  },
  {
    path: '/screenDemo',
    name: 'screenDemo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/screenDemo.vue'),
    meta: {
      title:'screenDemo页面'
    }
  }
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

export default routes
