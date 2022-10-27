<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:43:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-10-19 10:24:00
-->
<!-- 模块说明 -->
<template>
  <div class="tree-item">
    <div>requestAnimationFrame:{{count}}</div>
    <div>setInterval:{{count1}}</div>
    <div v-for="item of treeData"
         :key="item.id">
      <div class="item-name">{{item.name}}</div>
      <div v-if="item.children&&item.children.length"
           class="tree-children">
        <tree-list :tree-data="item.children"></tree-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件注册
  name: 'treeList',
  components: {

  },
  mixins: [],
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      textobj: {
        text: '三国志',
        name: '水浒传'
      },
      count: 0,
      count1: 0,
    }
  },
  computed: {},
  watch: {},
  methods: {
    addCount () {
      let timer
      this.count++
      if (this.count < 2000) {
        requestAnimationFrame(this.addCount)
      } else {
        cancelAnimationFrame(timer)
      }
    },
    addCount1 () {
      let timer = setInterval(() => {
        this.count1++
        if (this.count1 > 2500) {
          clearInterval(timer)
        }
      }, 16);

    }
  },
  created () {
    requestAnimationFrame(this.addCount)
    this.addCount1();
  }
}
</script>
<style  scoped>
.tree-item {
  display: inline-block;
  text-align: left;
}
.tree-children {
  padding: 4px 8px;
}
</style>
