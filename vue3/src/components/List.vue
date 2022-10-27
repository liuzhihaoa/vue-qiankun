<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-14 10:34:11
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-20 16:02:24
 * @description: 
-->
<template>
  <ul class="todo-main">
    <Item v-for="(todo,index) of todos"
          :todo="todo"
          :key="index"
          v-bind="$attrs">
      <template #test="slotProps">
        <slot name="test"
              v-bind="slotProps"></slot>
      </template>
    </Item>

  </ul>

</template>
<script lang='ts'>
// 解构
import { defineComponent, ref, toRefs } from 'vue'
import Item from './Item.vue'
import { Todo } from '../types/todo'
// 模块化
export default defineComponent({
  name: 'List', //组件名称
  inheritAttrs: false,
  props: {
    // 接收父组件数据
    todos: Array as () => Todo[],
  },
  components: {
    Item,
  },
  setup(props, ctx) {
    console.log(ctx)
    const data = ref({
      name: '刘志豪',
      sex: '男',
    })
    // 这里没有this,直接使用props里数据
    return {
      data,
    }
  },
})
</script>
<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
 