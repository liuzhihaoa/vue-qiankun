<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-08 11:02:03
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-10-08 15:39:06
 * @description: 
-->
<template>
  <div className="screen-wrapper">
    <div className="screen"
         id="screen">
      <div className="demo-root">
        <header v-fit:left>头部</header>
        <main>
          <div v-fit:left
               className="demo-left"></div>
          <div v-fit:left
               className="demo-center"></div>
          <div v-fit:left
               className="demo-right"></div>
        </main>
        <footer v-fit:left>底部</footer>
      </div>
    </div>
    <footer className="large-footer"></footer>
  </div>
</template>
<script lang='ts'>
// 解构
import { defineComponent, onMounted, onUnmounted } from 'vue'
// 模块化
export default defineComponent({
  name: 'screenDemo', //组件名称
  props: {
    // 接收父组件数据
  },
  components: {
    // 定义子组件
  },
  setup(props, ctx) {
    // 这里没有this,直接使用props里数据
    const handleScreenAuto = (): void => {
      const designDraftWidth = 1920 //设计稿的宽度
      const designDraftHeight = 960 //设计稿的高度
      //根据屏幕的变化适配的比例
      const scale =
        document.documentElement.clientWidth /
          document.documentElement.clientHeight <
        designDraftWidth / designDraftHeight
          ? document.documentElement.clientWidth / designDraftWidth
          : document.documentElement.clientHeight / designDraftHeight
      //缩放比例
      // ;(document.querySelector(
      //   '#screen'
      // ) as any).style.transform = `scale(${scale}) translate(-50%)`
    }
    onMounted(() => {
      //初始化自适应  ----在刚显示的时候就开始适配一次
      //handleScreenAuto()
      //绑定自适应函数   ---防止浏览器栏变化后不再适配
      //window.onresize = () => handleScreenAuto()
    })
    onUnmounted(() => {
      window.onresize = null
    })
    return { handleScreenAuto }
  },
})
</script>
<style scoped lang="scss">
/* scoped 使用得定义的样式只在本页面内生效  */
.screen-wrapper {
  height: 100%;
  width: 100%;
  position: absolute;
  .screen {
    display: inline-block;
    height: 100%;
    width: 100%;
    .demo-root {
      width: 100%;
      height: 100%;
      header {
        width: 3840px;
        height: 1000px;
        background: rgba(53, 150, 206, 0.3);
        font-size: 40px;
        text-align: center;
        line-height: 200px;
      }
      main {
        display: flex;
        height: 660px;
        div {
          width: 640px;
          height: 100%;
        }
        .demo-left {
          background: rgba(206, 52, 154, 0.3);
        }
        .demo-center {
          background: rgba(13, 30, 179, 0.3);
        }
        .demo-right {
          background: rgba(64, 163, 6, 0.849);
        }
      }
      footer {
        width: 100%;
        height: 100px;
        font-size: 40px;
        text-align: center;
        line-height: 100px;
        background: rgba(19, 211, 115, 0.3);
      }
    }
  }
}
</style>
 