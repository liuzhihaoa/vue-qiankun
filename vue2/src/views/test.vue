<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-05-05 11:29:32
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-08-29 21:30:57
 * @description: 描述
-->
<template>
  <div class="scroll-container" @scroll="checkScroll">
    <!-- 显示已加载的数据 -->
    <ul>
      <li v-for="item in items">{{ item }}</li>
    </ul>
    <!-- 加载更多的动画或按钮 -->
    <div v-show="isLoadingMore">Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // 已加载的数据
      isLoadingMore: false, // 是否正在加载更多数据
    };
  },
  mounted() {
    // 初始化加载数据
    this.loadData();
  },
  methods: {
    loadData() {
      // 模拟异步加载数据
      setTimeout(() => {
        // 更新已加载数据
        this.items.push("New Data");
        this.isLoadingMore = false; // 加载完成
      }, 1000);
    },
    checkScroll() {
      const container = this.$el;
      const { scrollTop, clientHeight, scrollHeight } = container;

      // 滚动到底部时，加载更多数据
      if (scrollTop + clientHeight >= scrollHeight) {
        this.isLoadingMore = true;
        this.loadData();
      }
    },
  },
};
</script>

<style>
.scroll-container {
  height: 300px;
  overflow-y: scroll;
}
</style>
