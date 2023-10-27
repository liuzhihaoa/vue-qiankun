<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:43:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-08-16 11:17:32
-->
<!-- 模块说明 -->
<template>
  <div class="tree-item">
    <div>requestAnimationFrame:{{ count }}</div>
    <div>setInterval:{{ count1 }}</div>
    <div>{{ time }}</div>
    <div v-for="i of currentTotal" :key="i">{{ i }}</div>
    <!-- <div v-for="item of treeData" :key="item.id">
      <div class="item-name">{{ item.name }}</div>
      <div v-if="item.children && item.children.length" class="tree-children">
        <tree-list :tree-data="item.children"></tree-list>
      </div>
    </div> -->
    <my-input v-model="num"></my-input>
    <div>她叫{{ person.name }},今年{{ person.age }},喜欢{{ person.hobby }}</div>
    <button @click="changePerson">改变</button>
    <button @click="changeAge">改变年龄</button>
    <test :people="person"></test>
    <ul>
      <li v-for="[i, v] of list.entries()">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
let reqTimer = null;
import myInput from "@/components/myInput";
import test from "./test";
export default {
  // 组件注册
  name: "treeList",
  components: {
    myInput,
    test,
  },
  mixins: [],
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      count: 0,
      count1: 0,
      num: 0,
      timer: null,
      time: null,
      person: {
        name: "yf",
        age: 10,
      },
      list: Array(100),
      total: 100000,
      count2: 0,
      done: 0,
      size: 100,
      currentTotal: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    addCount() {
      this.count++;
      this.timer = requestAnimationFrame(this.addCount);
      this.count >= 2500 && cancelAnimationFrame(this.timer);
    },
    addCount1() {
      let timer = setInterval(() => {
        this.count1++;
        if (this.count1 > 2500) {
          clearInterval(timer);
        }
      }, 16);
    },
    getCurrentTime() {
      console.log(reqTimer);
      this.time = new Date().toLocaleTimeString();
      reqTimer = requestAnimationFrame(this.getCurrentTime);
    },
    changePerson() {
      this.person.age = 29;
      this.person.hobby = "reading";
    },
    changeAge() {
      this.person.age++;
    },
    addItems() {
      for (let i = 0; i < this.size; i++) {
        this.currentTotal += 1;
      }
      if (this.currentTotal < this.total) {
        requestAnimationFrame(this.addItems);
      }
    },
    testThis() {
      const arr = [1, 2, 3];
      console.log("this", this);
      arr.forEach(function (v, i) {
        console.log("this1", this);
      });
    },
  },
  created() {
    // this.addCount();
    // this.addCount1();
    // this.getCurrentTime();
    this.addItems();
    this.testThis();
  },
  beforeDestroy() {
    cancelAnimationFrame(reqTimer);
  },
};
</script>
<style scoped>
.tree-item {
  display: inline-block;
  text-align: left;
}
.tree-children {
  padding: 4px 8px;
}
</style>
