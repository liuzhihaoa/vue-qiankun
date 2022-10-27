<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-14 10:34:00
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-30 17:08:45
 * @description: 
-->
<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <button @click="changeLang('en')">切换语言</button>
      <Header @add="addToCount" />
      <List :todos="todos"
            @click="delCount"
            @updateTodo="updateTodo">
        <template v-slot:test="slotProps">
          my name is{{slotProps.name}},性别{{slotProps.sex}}
        </template>
      </List>
      <Footer :todos="todos" />
    </div>
  </div>
</template>
<script lang='ts'>
// 解构
import { defineComponent, reactive, toRefs, provide, computed } from 'vue'
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import Footer from '@/components/Footer.vue'
// 模块化
import { Todo } from '../types/todo'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AboutView', //组件名称
  props: {
    // 接收父组件数据
  },
  components: {
    // 定义子组件
    Header,
    List,
    Footer,
  },
  setup(props, ctx) {
    const { locale } = useI18n()
    const state = reactive<{ todos: Todo[] }>({
      todos: [
        { id: 1, title: '张飞', isCompleted: false },
        { id: 2, title: '关羽', isCompleted: true },
        { id: 3, title: '刘备', isCompleted: false },
      ],
    })
    const addToCount = (e: Event) => {
      state.todos.unshift({
        id: Date.now(),
        title: (e.target as HTMLInputElement).value,
        isCompleted: false,
      })
      ;(e.target as HTMLInputElement).value = ''
    }
    const delCount = (id: number) => {
      const index = state.todos.findIndex((v, i) => {
        return v.id === id
      })
      state.todos.splice(index, 1)
    }
    const updateTodo = (todo: Todo) => {
      for (let v of state.todos) {
        if (v.id === todo.id) {
          v.isCompleted = todo.isCompleted
          break
        }
      }
    }
    //删除选中的数据
    const delCheckedTodos = () => {
      state.todos = state.todos?.filter((v) => {
        return !v.isCompleted
      })
    }
    // provide('del', delCount)
    provide('delCheckedTodos', delCheckedTodos)
    //切换语言
    const changeLang = (lang: string) => {
      locale.value = lang
    }
    return {
      ...toRefs(state),
      addToCount,
      delCount,
      updateTodo,
      changeLang,
    }
  },
})
</script>
<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
 