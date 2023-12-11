<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:43:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-10-27 17:25:03
-->
<!-- 模块说明 -->
<template>
  <div class="container">
    <!-- <tree-list :treeData="treeData">

    </tree-list> -->
    <loop-component :treeData="treeData">

    </loop-component>

    <SearchSelect v-model="id" :options="list" :props="{
          value:'value',
          label: 'label',
        }" />

  </div>
</template>

<script>
// import treeList from './AboutView';
import loopComponent from './jsxView'
import SearchSelect from '@/components/SearchSelect'
export default {
  // 组件注册
  components: {
    // treeList,
    loopComponent,
    SearchSelect
  },
  mixins: [],
  props: [],
  data () {
    return {
      treeData: [
        { id: 1, name: '一级1' },
        {
          id: 2,
          name: '一级2',
          children: [
            { id: 3, name: '二级2-1' },
            { id: 4, name: '二级2-2' }
          ]
        },
        {
          id: 5,
          name: '一级3',
          children: [
            {
              id: 6,
              name: '二级3-1',
              children: [
                { id: 7, name: '三级3-1-1' },
                { id: 8, name: '三级3-1-2' }
              ]
            },
            { id: 9, name: '二级3-2' },
            { id: 10, name: '二级3-3' }
          ]
        }],
      list:new Array(10000).fill(1).map((v,i)=>{
          return {
            value:i,
            label:`第${i}个`
          }
        }),
      id:1
    }
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
</style>
