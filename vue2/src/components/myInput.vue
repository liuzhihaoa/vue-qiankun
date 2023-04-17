<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-12-09 16:43:47
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-12-09 16:47:42
 * @description: 描述
-->
//myInput.vue
<template>
  <div>
    <el-input v-model="inputVal" v-bind="$attrs" @blur="blur"></el-input>
  </div>
</template>
<script>
export default {
  name: "myInput",
  inheritAttrs: false,
  props: {
    value: {
      default: "",
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    blur() {
      this.$emit("blur");
    },
  },
};
</script>
