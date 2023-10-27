<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-05-05 10:43:12
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-08-24 14:07:50
 * @description: 描述
-->
<template>
  <div>
    <slot>我是子组件</slot>
    <div>我是{{ p.name }},年龄{{ p.age }}</div>
    <button @click="changeP">修改</button>
    <div>{{ test }}</div>
  </div>
</template>
<script lang="ts">
// 解构
import { defineComponent, toRef, toRefs, ref, reactive } from "vue";
import { test } from "@/hook/userList/index";
import type { PropType } from "vue";
// 模块化
export default defineComponent({
  name: "child", //组件名称
  props: {
    people: {
      type: Object as PropType<{ name: string; age: number }>,
      require: true,
    },
  },
  components: {
    // 定义子组件
  },
  setup(props, ctx) {
    // const p = toRef(props, "people");

    // 初始化props中的people
    const p = ref(props.people);
    console.log("props", props);
    // 写一个函数修改p中age的值
    const changeP = () => {
      (p.value as { name: string; age: number }).age = 30;
    };
    // 写一个函数 用于对数组对象去重
    const unique = (arr: any[], key: string) => {
      const res = new Map();
      return arr.filter((a) => !res.has(a[key]) && res.set(a[key], 1));
    };
    return {
      p,
      changeP,
      test,
    };
  },
});
</script>
