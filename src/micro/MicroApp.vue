<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2022-03-26 17:05:45
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-10-17 17:17:24
-->
<template>
  <div class="micro-container"
       v-loading="$store.state.app.isLoadingMicro"
       element-loading-text="Loading...">
    <div></div>
    <div id="subapp1"></div>
    <div id="subapp2"></div>
  </div>
</template>

<script>
import {
  onMounted, watch, reactive, onUnmounted,
} from 'vue'
import { loadMicroApp, addGlobalUncaughtErrorHandler } from 'qiankun'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { microApps } from '@/micro/micro-app'

export default {
  name: 'MicroApp',
  setup () {
    const route = useRoute()
    const store = useStore()
    const activationHandleChange = async (path) => {
      const activeRules = microApps.map((app) => app.activeRule)
      const isMicro = activeRules.some((rule) => path.startsWith(rule))
      if (!isMicro) return
      const microItem = microApps.find((app) => path.startsWith(app.activeRule.toString()))
      if (!microItem) return
      // 如果已经加载过一次，则无需再次加载
      const current = store.state.keepAlive.microList[microItem.activeRule.toString()]
      if (current) return
      // 缓存当前子应用
      const micro = loadMicroApp({ ...microItem })
      store.commit('keepAlive/SET_MICRO_LIST', { ...store.state.keepAlive.microList, [microItem.activeRule.toString()]: micro })
      // store.state.keepAlive.microList[microItem.activeRule.toString()] = micro
      try {
        await micro.mountPromise
      } catch (e) {
        console.error('=======', e)
      }
    }
    const person = reactive({ name: 'liu' })
    // qiankun全局异常捕获
    addGlobalUncaughtErrorHandler((event) => console.log(event))
    watch(() => route.path, async (newValue) => {
      activationHandleChange(newValue)
    })
    onMounted(async () => {
      console.log('MicroApp ======> 进入')
      if (window.qiankunStarted) return
      window.qiankunStarted = true
      activationHandleChange(route.path)
    })
    onUnmounted(() => {
      window.qiankunStarted = false

      Object.values(store.state.keepAlive.microList).forEach((mic) => {
        mic.unmount()
      })
    })
    return {
      person,
    }
  },
}
</script>
<style lang="scss" scoped>
.micro-container {
  height: inherit;
}
</style>
