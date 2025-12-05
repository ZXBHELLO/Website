<template>
  <div class="html-page-container">
    <iframe 
      v-if="src"
      :src="src"
      class="html-page-iframe"
      frameborder="0"
      scrolling="no"
    ></iframe>
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
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
  overflow: hidden;
}

.html-page-iframe {
  position: fixed;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  border: none;
  z-index: 0;
}
</style>