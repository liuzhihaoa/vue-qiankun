<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-14 10:34:32
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-28 10:20:08
 * @description: 
-->
<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" />
    </label>
    <span>
      <span>已完成{{completedCount}}</span> / 全部{{allCount}}
    </span>
    <button class="btn btn-danger"
            @click="delCheckedTodos">清除已完成任务</button>
    <button class="btn"
            @click="clickChange">改变</button>
  </div>
  <div>邮箱：{{info.email}}</div>
</template>
<script lang='ts'>
// 解构
import { computed, defineComponent, inject, reactive } from 'vue'
import { Todo } from '../types/todo'
import actions from '@/qiankun/actions'
// 模块化
export default defineComponent({
  name: 'Footer', //组件名称
  props: {
    // 接收父组件数据
    todos: {
      type: Array,
    },
  },
  components: {
    // 定义子组件
  },
  setup(props, ctx) {
    //const completedCount: Ref<number> = ref(0)
    //const allCount: Ref<number> = ref(0)

    const completedCount = computed(() => {
      return props.todos?.filter((v) => {
        return (v as any).isCompleted
      }).length
    })
    const allCount = computed(() => {
      return props.todos?.length
    })
    //删除选中的数据
    const delCheckedTodos = inject('delCheckedTodos')
    const clickChange = () => {
      history.pushState({ a: 1 }, '', '/micro_vue/about')
    }
    const info = reactive({ email: 'ddd' })
    if (window?.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange((cur: any, pre: any) => {})
    }

    return {
      completedCount,
      allCount,
      delCheckedTodos,
      clickChange,
      info,
    }
  },
})
</script>
<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
 