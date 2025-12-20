<template>
  <!-- 恢复 transition，实现淡入 + 淡出动画 -->
  <transition name="fade" appear>
    <div v-if="loading" class="page-loading">
      <div class="loader">
        <h1 class="site-title">{{ siteTitle || 'ZakoWeb' }}</h1>
        <div class="google-loader">
          <div class="dot" style="--delay: 0.1s"></div>
          <div class="dot" style="--delay: 0.2s"></div>
          <div class="dot" style="--delay: 0.3s"></div>
          <div class="dot" style="--delay: 0.4s"></div>
        </div>
        <p class="loading-text">正在加载中...</p>
        <p class="loading-subtext">请稍等片刻，精彩内容即将呈现</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSiteLocaleData } from '@vuepress/client'

const loading = ref(true)
const site = useSiteLocaleData()
const siteTitle = computed(() => site.value.title)

const MIN_LOADING_TIME = 800   // 最小显示时间
const MAX_LOADING_TIME = 8000  // 最大强制隐藏时间

let minTimer: number | null = null
let maxTimer: number | null = null
let resourcesLoaded = false

// 统一隐藏函数（仅改变响应式状态，淡出由 transition 控制）
const hideLoading = () => {
  if (!loading.value) return
  loading.value = false
  document.body.classList.add('page-loaded')
}

// 检查图片等资源是否加载完成（避免图片未加载完就隐藏）
const checkResourcesLoaded = () => {
  const images = document.querySelectorAll('img')
  if (images.length === 0) return true
  return Array.from(images).every(img => img.complete && img.naturalHeight !== 0)
}

// 标记页面资源就绪
const markPageReady = () => {
  if (resourcesLoaded) return
  resourcesLoaded = true

  // 如果最小时间已过，立即开始淡出
  if (minTimer === null) {
    hideLoading()
  }
}

onMounted(() => {
  // 1. 最小显示时间
  minTimer = window.setTimeout(() => {
    minTimer = null
    if (resourcesLoaded) {
      hideLoading()
    }
  }, MIN_LOADING_TIME)

  // 2. 最大强制隐藏（兜底）
  maxTimer = window.setTimeout(() => {
    console.warn('Loading timeout: 强制隐藏加载动画')
    resourcesLoaded = true
    hideLoading()
  }, MAX_LOADING_TIME)

  // 3. 多重就绪检测
  const tryMarkReady = () => {
    if (document.readyState === 'complete' && checkResourcesLoaded()) {
      markPageReady()
    }
  }

  // 立即检查一次
  tryMarkReady()

  // DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryMarkReady, { once: true })
  }

  // 所有资源加载完成
  window.addEventListener('load', () => {
    setTimeout(markPageReady, 100)  // 稍微延后确保图片渲染
  }, { once: true })

  // 轮询保险
  const interval = setInterval(() => {
    if (checkResourcesLoaded() && document.readyState === 'complete') {
      clearInterval(interval)
      markPageReady()
    }
  }, 500)

  window.addEventListener('load', () => clearInterval(interval), { once: true })
})

onUnmounted(() => {
  if (minTimer !== null) clearTimeout(minTimer)
  if (maxTimer !== null) clearTimeout(maxTimer)
})
</script>

<style scoped>
.page-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--vp-c-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 恢复优雅的淡入淡出动画 */
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* appear 选项使首次挂载也有淡入效果 */
.fade-appear-active {
  transition: opacity 0.3s ease-out;
}

.loader {
  text-align: center;
  padding: 20px;
}

.site-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
  color: var(--vp-c-text-1);
  letter-spacing: 1px;
}

.google-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: bounce 1.5s var(--delay) infinite cubic-bezier(0.28, 0.84, 0.42, 1);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.loading-text {
  color: var(--vp-c-text-2);
  font-size: 16px;
  margin-bottom: 8px;
  animation: pulse 1.5s ease-in-out infinite alternate;
}

.loading-subtext {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

@keyframes pulse {
  from { opacity: 0.7; }
  to { opacity: 1; }
}
</style>