<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-27 11:28:20
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-10-08 11:49:29
 * @description: 描述
-->
<template>
  <div>
    <div>他叫{{ name }},今年{{ age }},喜欢{{ hobby }}</div>
    <div>test:{{ test }}</div>
    <el-button @click="changePerson">改变</el-button>
    <child :people="{ name, age }">我是父组件中的子组件</child>
    <div>ta叫{{ newPerson.name }},今年{{ newPerson.age }},喜欢{{ newPerson.hobby }}</div>
  </div>
</template>
<script>
// 解构
import { defineComponent, ref, reactive, toRefs, computed } from "vue";
import { test, addTest } from "@/hook/userList/index";
import child from "./child";
import fill from "lodash/fill";
// 模块化
export default defineComponent({
  name: "", //组件名称
  props: {
    // 接收父组件数据
  },
  components: {
    child,
  },
  setup(props, ctx) {
    let count = ref(0);
    console.log(fill([4, 6, 8, 10], "*", 1, 3));
    const person = reactive({ name: "lzh", age: 18, hobby: "" });
    const changePerson = () => {
      person.hobby = "swim";
      person.age = 26;
      newPerson.value = { name: "xl", age: 60 };
      addTest();
    };
    const testreac=reactive(1)
    console.log('testreac',testreac)
    const newPerson = computed({
      get() {
        return person;
      },
      set(val) {
        debugger;
        person.age = 90;
        person.hobby = "读书";
        newPerson.value.name = "aaa";
      },
    });
    import(newPerson);
    return {
      count,
      ...toRefs(person),
      changePerson,
      newPerson,
      test,
    };
  },
});
</script>
<style scoped>
/* scoped 使用得定义的样式只在本页面内生效  */
</style>
