<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-14 10:34:00
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-14 15:38:14
 * @description: 
-->
<template>
  <div class="todo-header">
    <input type="text"
           placeholder="请输入你的任务名称，按回车键确认"
           @keyup.enter="$emit('add',$event)" />
  </div>
</template>
<script lang='ts'>
// 解构
import { defineComponent } from 'vue'
// 模块化
export default defineComponent({
  name: 'Header', //组件名称
  emits: ['add'],
  props: {
    // 接收父组件数据
  },
  components: {
    // 定义子组件
  },
  setup(props, ctx) {
    // 这里没有this,直接使用props里数据
    return {}
  },
})
</script>
<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
 