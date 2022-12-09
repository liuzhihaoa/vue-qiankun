/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-13 11:02:07
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-11-11 09:50:20
 * @description: 
 */
import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import routes from './router'
import store from './store'

Vue.config.productionTip = false

interface props {
  container: any,
  routerBase: string,
  onGlobalStateChange?: any,
  setGlobalState?: any,
  mainStore?:any
}
let instance:any
let router:any
function render(props:props) {
  const { container,routerBase } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? `${routerBase}` : '/',
    mode: 'history',
    routes,
  });

  instance =new Vue({
    router,
    store,
    render: h => h(App)
  });
  instance.$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: '', routerBase: "/" });
}

export async function bootstrap() {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}


export async function mount(props:props) {
  console.log(10000,props)
  props.onGlobalStateChange((cur:any) => {
    console.log(777777,cur)
  })
  render(props);
}

export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}