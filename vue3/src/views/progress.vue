<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-27 08:53:13
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-27 17:41:54
 * @description: 描述
-->
<template>
  <div class="progressBox">
    <div class="progress" ref="progress" style="--percent: 0">
      <p>
        正在安装<span>{{ val }}</span
        >%
      </p>
    </div>
  </div>
  <div>
    <!-- 定义子组件 -->
  </div>
</template>
<script lang="ts">
// 解构
import { defineComponent, onMounted, ref } from "vue";
// 模块化
export default defineComponent({
  name: "", //组件名称
  props: {
    // 接收父组件数据
  },
  components: {
    // 定义子组件
  },
  setup(props, ctx) {
    const progress: any = ref<HTMLElement>();
    const setProgress = (value: number) => {
      progress.value.style.setProperty("--percent", value);
    };
    let val = ref(0);
    onMounted(() => {
      const timer = setInterval(() => {
        if (val.value < 100) {
          val.value += 1;
          setProgress(val.value);
        } else {
          clearInterval(timer);
        }
      }, 200);
    });
    return { progress, val };
  },
});
</script>
<style scoped lang="scss">
.progressBox {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  .progress {
    width: 300px;
    height: 100px;
    border-radius: 10px;
    background-image: linear-gradient(90deg, #35c17d calc(var(--percent) * 1%), #c5ebdc calc(var(--percent) * 1%));
    p {
      height: 100%;
      margin: 0;
      line-height: 100px;
      background: #fff;
      background-clip: text;
      color: transparent;
      background-image: linear-gradient(90deg, #c5ebdc calc(var(--percent) * 1%), #35c17d calc(var(--percent) * 1%));
    }
  }
}
/* scoped 使用得定义的样式只在本页面内生效  */
</style>
