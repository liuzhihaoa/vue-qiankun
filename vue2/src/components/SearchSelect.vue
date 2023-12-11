<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-10-27 14:55:47
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-10-27 17:34:10
 * @description: 描述
-->
<!-- 模块说明 -->
<template>
 <div class="container">
  <el-select
    v-model="newValue"
    v-on="$listeners"
    :filter-method="handleFilter"
    filterable
    clearable
    size="small"
  >
    <el-option
      v-for="(item, index) in optionsList.slice(firstNum, maxNum)"
      :key="item[props.value] + index"
      v-bind="$attrs"
      :label="item[props.label]"
      :value="item[props.value]"
     
    >
    </el-option>
  </el-select>
 </div>
</template>

<script>
export default {
  // 组件注册
  components: {},
  mixins: [],
  props: {
    value:{
      type:[String,Number],
      default:''
    },
    options: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
     // el-option参数 必传
     props: {
      type: Object,
      default() {
        return {
          value: "value",
          label: "label",
        };
      },
      required: true,
    }
  },
  data () {
    return {
      optionsList: [],
      copyOptionsList: [],
      firstNum: 0,
      maxNum: 100,
    }
  },
  computed: {
    // 计算属性
    newValue:{
      get(){
        return this.value
    },
    set(val){
      console.log(val)
      this.$emit('input',val)
    }
}
},
  watch: {},
created() {
  this.optionsList = this.options
  this.copyOptionsList = this.options
},
  methods: {
  handleFilter(val){
    // console.log(val)
  }
},
}
</script>
<style lang="scss" scoped>
.container {

}
</style>
