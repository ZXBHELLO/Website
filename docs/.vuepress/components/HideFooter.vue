<template>
  <div></div>
</template>

<script>
export default {
  name: 'HideFooter',
  mounted() {
    this.hideFooter();
  },
  methods: {
    hideFooter() {
      // 查找并隐藏页脚元素
      const footer = document.querySelector('footer.vp-footer');
      if (footer) {
        footer.style.display = 'none';
      }
    }
  },
  // 当组件被销毁时，恢复页脚显示（可选）
  beforeDestroy() {
    const footer = document.querySelector('footer.vp-footer');
    if (footer) {
      footer.style.display = '';
    }
  }
}
</script>