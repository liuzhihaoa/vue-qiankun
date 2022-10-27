<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-09 23:11:39
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-29 16:17:42
-->
<template>
  <el-breadcrumb class="app-breadcrumb hidden-sm-and-down"
                 separator="/">
    <transition-group appear
                      name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList"
                          :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
              class="no-redirect">{{ item.meta.title }}</span>
        <a v-else
           @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { ref, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BreadCrumb',
  setup () {
    const levelList = ref([])
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const getBreadcrumb = () => {
      if (route.path.startsWith('/micro')) {
        store.subscribe((mutation, { app: { breadcrumbList } }) => {
          const { type } = mutation
          if (type === 'app/SET_BREADCRUMB') {
            levelList.value = [...breadcrumbList]
          }
        })
      } else {
        store.commit('app/SET_BREADCRUMB', router.matched)
        levelList.value = store.state.app.breadcrumbList
      }
    }
    getBreadcrumb()
    watch(
      () => route.path,
      () => getBreadcrumb(),
    )
    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect.toString())
        return
      }
      router.push(path)
    }
    return { levelList, handleLink }
  },
})
</script>

<style lang="scss" scoped >
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  .no-redirect {
    color: var(--system-header-breadcrumb-text-color);
    cursor: text;
  }
  a {
    color: var(--system-header-text-color);
  }
}
</style>
