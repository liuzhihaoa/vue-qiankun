<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-14 10:34:16
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-20 16:02:15
 * @description: 
-->
<template>
  <div>
    <li @mouseenter="mouseHandler(true)"
        @mouseleave="mouseHandler(false)"
        :style="{backgroundColor:bgColor,color:fontColor}">
      <label>
        <input type="checkbox"
               v-model="updateCompleted" />
        <span>{{todo.title}}</span>
      </label>
      <button class="btn btn-danger"
              @click="delCount(todo.id)"
              v-show="isShow">删除</button>
    </li>
    <slot name="test"
          v-bind="obj"></slot>
  </div>
</template>
<script lang='ts'>
// 解构
import { defineComponent, ref, inject, computed } from 'vue'
import { Todo } from '../types/todo'
import type { Ref, SetupContext } from 'vue'
// 模块化
export default defineComponent({
  name: 'Item', //组件名称
  inheritAttrs: false,
  // emits: {
  //   updateTodo(playload: boolean) {},
  // },
  props: {
    // 接收父组件数据
    todo: Object as () => Todo,
  },
  components: {
    // 定义子组件
  },
  setup(props, ctx: SetupContext) {
    // 这里没有this,直接使用props里数据
    const fontColor = ref('')
    const bgColor = ref('')
    let isShow: Ref<boolean> = ref(false)
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        ;(fontColor.value = 'green'), (bgColor.value = 'red')
      } else {
        ;(fontColor.value = ''), (bgColor.value = '')
      }
      isShow.value = flag
    }
    const delCount = (id: number) => {
      ;(ctx.attrs.onClick as Function)(id)
    }
    const updateCompleted = computed({
      get() {
        return props.todo?.isCompleted
      },
      set(val) {
        // ctx.emit('updateTodo', props.todo)
        ;(ctx.attrs.onUpdateTodo as Function)({
          ...props.todo,
          isCompleted: val,
        })
      },
    })
    const obj = ref({
      name: '杨芳',
      sex: '女',
    })
    //const delCount = inject('del')
    return {
      fontColor,
      bgColor,
      mouseHandler,
      isShow,
      delCount,
      updateCompleted,
      obj,
    }
  },
})
</script>
<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
 