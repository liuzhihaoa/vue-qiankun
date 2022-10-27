/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:29:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-10-08 15:38:18
 * @description: 
 */
import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import actions from '@/qiankun/actions'
import i18n from '@/locals'
import Fit from 'vue-fit-next'
interface props {
  container: any,
  routerBase: string,
  onGlobalStateChange?: any,
  setGlobalState?: any,
  mainStore?:any
}
let instance:any
async function render(props:props) {
  const { container, routerBase,mainStore }  = props;
  actions.setActions(props)
  instance = createApp(App);
  const router = createRouter({
    history: createWebHistory(`${routerBase}`),
    routes
  });
  instance.use(router);
  instance.use(store);
  instance.use(i18n)
  instance.use(Fit({
    width: 3840,
    height: 1000,
    mode: 'scale', // 可选， 支持 scale 和 zoom 两种方案，默认为 scale
    scaleStep: 0.05
  }))
  /* eslint-disable */
  router.afterEach((to) => {
    const matched = to.matched.map((v) => {
      const {meta,path,name}=v
      return {
        name,
        path:`${routerBase}${path}`,
        meta
        }
    })
    mainStore.commit('app/SET_BREADCRUMB',matched)
  })
  instance.mount(container ? container?.querySelector("#app") as HTMLElement : "#app");

}
  // eslint-disable-next-line no-underscore-dangle
if (!window?.__POWERED_BY_QIANKUN__) {
    render({ container: '', routerBase: "/" });
   }

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props: props) {
  props?.onGlobalStateChange((cur:any) => {
  })
  await render(props);
}

export async function unmount() {
 console.log('unmount')
 // instance.unmount();
}


// createApp(App).use(store).use(router).mount('#app')