<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-28 11:16:42
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-29 11:17:20
-->
<template>
  <el-tag :key="menu.path"
          :class="active ? 'active' : ''"
          :type="active ? '' : 'info'"
          :effect="active ? 'dark' : 'plain'"
          :closable="!menu.meta.hideClose"
          @click="handleClick(menu)"
          @close="closeTab(menu)">
    {{ menu.meta.title }}
  </el-tag>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    menu: {
      type: Object,
      default: () => ({
        path: '',
        meta: {
          label: '',
          hideClose: false,
        },
      }),
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup (props, { emit }) {
    const router = useRouter()
    // 关闭按钮
    function closeTab (menu) {
      emit('closeTag', menu)
    }
    function handleClick (menu) {
      router.push(menu.path)
    }
    return {
      closeTab,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-tag {
  cursor: pointer;
  margin: 0 3px;
  height: 28px;
  line-height: 28px;
}
</style>
