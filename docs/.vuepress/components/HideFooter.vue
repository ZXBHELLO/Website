<template>
  <div></div>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { onMounted, onUnmounted, watch } from 'vue'

const FOOTER_SELECTOR = 'footer.vp-footer';
let isFooterHidden = false;

const pageData = usePageFrontmatter()

const setFooterVisibility = (visible: boolean) => {
  // 查找并设置页脚元素可见性
  const footer = document.querySelector(FOOTER_SELECTOR) as HTMLElement | null;
  if (footer) {
    footer.style.display = visible ? '' : 'none';
    isFooterHidden = !visible;
  }
}

const updateFooterVisibility = () => {
  const frontmatterData = pageData.value
  const disableFooter = frontmatterData?.disableFooter || false
  
  setFooterVisibility(!disableFooter);
}

// 监听页面frontmatter变化
watch(() => pageData.value, () => {
  updateFooterVisibility()
}, { deep: true })

onMounted(() => {
  updateFooterVisibility()
})

onUnmounted(() => {
  // 只有当页脚当前被隐藏时才恢复显示
  if (isFooterHidden) {
    setFooterVisibility(true);
  }
})
</script>