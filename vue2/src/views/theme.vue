<!-- 模块说明 -->
<template>
  <div class="container">
    <div class="header">
      <div class="title">主题切换</div>
      <div class="shade"></div>

      <div class="controls">
        <p class="control">
          <span class="control-key">内间距大小:</span>
          <input class="control-value"
                 type="range"
                 id="quantum"
                 min="4"
                 max="8"
                 step="1">
        </p>
        <p class="control">
          <span class="control-key">单列宽度:</span>
          <input class="control-value"
                 type="range"
                 id="columns"
                 min="1"
                 max="4"
                 step="1">
        </p>
        <p class="control">
          <span class="control-key">外间距大小:</span>
          <input class="control-value"
                 type="range"
                 id="gutter"
                 min="1"
                 max="5"
                 step="1">
        </p>
      </div>
    </div>
    <div class="grid">
      <!-- 可以看到这里通过style="--primary-color: #F44336; --primary-color-text: #FFF;"重新设置了css的变量值，因为css变量也遵从权重准则 -->
      <div class="cell"
           style="--primary-color: #F44336; --primary-color-text: #FFF;">
        <header class="cell-header">
          <div class="cell-title">
            红色
          </div>
        </header>
        <main class="cell-content">
          单击卡片上的按钮可以设置整个示例中的默认配色方案。
        </main>
        <div class="cell-actions">
          <button class="picker-button">
            使用此颜色作为主题色
            <div class="ripple"></div>
          </button>
        </div>
      </div>
      <div class="cell"
           style="--primary-color: #E91E63; --primary-color-text: #FFF;">
        <header class="cell-header">
          <div class="cell-title">
            Pink
          </div>
        </header>
        <main class="cell-content">
          卡片上的颜色不会收到全局css变量的影响，因为它们是在卡片级别单独定义的，也和普通股的 CSS 规则一样遵循优先级排序。
        </main>
        <div class="cell-actions">
          <button class="picker-button">
            使用此颜色作为主题色
            <div class="ripple"></div>
          </button>
        </div>
      </div>
      <div class="cell"
           style="--primary-color: #9C27B0; --primary-color-text: #FFF;">
        <header class="cell-header">
          <div class="cell-title">
            紫色
          </div>
        </header>
        <main class="cell-content">
          使用上面的控件来调整影响整个页面的一些属性。
        </main>
        <div class="cell-actions">
          <button class="picker-button">
            使用此颜色作为主题色
            <div class="ripple"></div>
          </button>
        </div>
      </div>
      <div class="cell"
           style="--primary-color: #00BCD4; --primary-color-text: #424242;">
        <header class="cell-header">
          <div class="cell-title">
            Cyan
          </div>
        </header>
        <main class="cell-content">
          通过拖拽控件可以任意调整主题间距、列宽等
        </main>
        <div class="cell-actions">
          <button class="picker-button">
            使用此颜色作为主题色
            <div class="ripple"></div>
          </button>
        </div>
      </div>
      <div class="cell"
           style="--primary-color: #009688; --primary-color-text: #FFF;">
        <header class="cell-header">
          <div class="cell-title">
            Teal
          </div>
        </header>
        <main class="cell-content">
          通过重新计算网格上单元格的相对大小来更改可以显示的列数。
        </main>
        <div class="cell-actions">
          <button class="picker-button">
            使用此颜色作为主题色
            <div class="ripple"></div>
          </button>
        </div>
      </div>
      <div class="cell"
           style="--primary-color: #4CAF50; --primary-color-text: #424242;">
        <header class="cell-header">
          <div class="cell-title">
            Green
          </div>
        </header>
        <main class="cell-content">
          如果觉得视图太拥挤或者太空旷，可以通过调整外间距可以自由控制每个元素的空间占比。
        </main>
        <div class="cell-actions">
          <button class="picker-button">
            使用此颜色作为主题色
            <div class="ripple"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件注册
  components: {},
  mixins: [],
  props: [],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 辅助函数 用来获取css的key和value。注意：css变量页和普通的css键值（如padding、color等）一样可以获取和重新设置。css变量和普通的css样式的key唯一的差别就是加一个前缀-- 
    getVariable (styles, propertyName) {
      return String(styles.getPropertyValue(propertyName)).trim();
    },
    // 辅助函数 用来设置root根元素的变量值，也就是用来动态生成主题的方法
    setDocumentVariable (propertyName, value) {
      document.documentElement.style.setProperty(propertyName, value);
    },
    chooseDefaultColor (event) {
      //此处的target就是 点击的某一个按钮，从event.target获取当前dom节点。
      //然后用window.getComputedStyle来获取绑定在dom节点中的style。
      var styles = window.getComputedStyle(event.target);

      // 获取style中的个性化的背景色和文字颜色
      var primary = this.getVariable(styles, '--primary-color');
      var text = this.getVariable(styles, '--primary-color-text');
      // 将各个不同的个性化色值，设置成root根元素的色值，从而达到变更全局css变量的目的，进而实现主题切换
      this.setDocumentVariable('--primary-color', primary);
      this.setDocumentVariable('--primary-color-text', text);
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/css/base.css';
</style>
