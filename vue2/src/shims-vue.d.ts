/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-13 11:02:07
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-10-13 11:52:54
 * @description: 
 */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
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