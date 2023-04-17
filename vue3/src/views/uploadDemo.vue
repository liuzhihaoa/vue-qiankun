<template>
<div>
<label htmlFor="my-file">请选择一个文件：</label>
  <input type="file" id="my-file" name="my-file" @change="handleFileChange" />
   <input type="button" value="停止" @lick="handleStop" />
</div>
<div class="progress-frame">
    <div class="progress"></div>
</div>
</template>
<script lang='ts'>
// 解构
import { defineComponent
} from 'vue'
// 模块化
export default defineComponent({
name:'upload-demo', //组件名称
props: {
// 接收父组件数据
},
components: {
// 定义子组件
},
setup(props, ctx){
// 这里没有this,直接使用props里数据
return {}
}
})
</script>
<style scoped>
/* scoped 使用得定义的样式只在本页面内生效  */
</style>
 