/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:29:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-10-18 11:25:59
 * @description:
 */
import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      title: "vue3Home页面",
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      title: "vue3About页面",
    },
  },
  {
    path: "/screenDemo",
    name: "screenDemo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/screenDemo.vue"),
    meta: {
      title: "screenDemo页面",
    },
  },
  {
    path: "/upload",
    name: "upload",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "upload" */ "../views/uploadView.vue"),
    meta: {
      title: "upload",
    },
  },
  {
    path: "/uploadDemo",
    name: "uploadDemo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "uploadDemo" */ "../views/uploadDemo.vue"),
    meta: {
      title: "uploadDemo",
    },
  },
  {
    path: "/progress",
    name: "progress",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "uploadDemo" */ "../views/progress.vue"),
    meta: {
      title: "progressDemo",
    },
  },
];

const requireModules = require.context("../views", true, /\.vue$/);
console.log("requireModules", requireModules.id);
const modules: Record<string, string> = {};
requireModules.keys().forEach((fileName) => {
  console.log(requireModules(fileName));
  modules[fileName.replace(/(\.\/|\.vue)/g, "")] = requireModules(fileName).default;
});
console.log("modules", modules);
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

export default routes;
