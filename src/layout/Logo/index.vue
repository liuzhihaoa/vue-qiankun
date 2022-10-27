<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-09 23:11:39
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-10-19 10:47:45
-->
<template>
  <div class="logo-container">
    <h1 v-if="!isCollapse">study</h1>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const isCollapse = computed(() => store.state.app.isCollapse)
    return {
      isCollapse,
    }
  },
})
</script>

<style lang="scss" scoped>
.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--system-logo-background);
  h1 {
    font-size: 20px;
    white-space: nowrap;
    color: var(--system-logo-color);
  }
}
</style>
