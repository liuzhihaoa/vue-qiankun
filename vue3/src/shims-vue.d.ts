/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:29:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-26 17:22:45
 * @description: 
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'nprogress' {
  const content: any;
  export default content;
}
declare interface Window {
  __POWERED_BY_QIANKUN__: any,
  appRender:any
}

declare module '*' 