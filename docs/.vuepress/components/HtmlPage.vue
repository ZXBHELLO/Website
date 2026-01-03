<template>
  <div class="html-page-container">
    <iframe 
      v-if="src"
      :src="src"
      class="html-page-iframe"
      allow="clipboard-write; download" 
      loading="lazy"
    ></iframe>
    <!-- 添加 allow 属性可以支持 Alist 的复制链接和下载功能 -->
  </div>
</template>

<script>
export default {
  name: 'HtmlPage',
  props: {
    src: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped>
.html-page-container {
  /* 使用 relative，高度设为视口高度减去导航栏高度 */
  position: relative;
  width: 100%;
  /* 假设导航栏是64px，根据实际情况调整，或者使用 100vh */
  height: calc(100vh - 64px); 
  overflow: hidden;
  background: #f4f4f4; /* 添加背景色，防止加载时白屏太突兀 */
}

.html-page-iframe {
  /* 改为 absolute，相对于 container 定位，而不是相对于浏览器窗口 */
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  /* z-index 0 可能会被背景遮挡，通常不需要设置，或者设为 1 */
}
</style>