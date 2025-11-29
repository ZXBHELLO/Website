<template>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useSiteLocaleData } from '@vuepress/client'

const loading = ref(true)
const site = useSiteLocaleData()

// 获取站点标题
import { computed } from 'vue'

// siteTitle 用于显示站点标题，若未设置则默认显示 'ZakoWeb'
const siteTitle = computed(() => site.value.title)

let timeoutId: number | null = null
let minTimeoutId: number | null = null
// 最小加载时间（毫秒）
const MAX_LOADING_TIME = 800
const MIN_LOADING_TIME = 800

let loaded = false

// 监听页面加载完成事件
const handleLoad = () => {
  loaded = true
  // 如果已经达到最小加载时间，则隐藏加载动画
  if (minTimeoutId === null) {
    if (timeoutId) clearTimeout(timeoutId)
    loading.value = false
  }
}

onMounted(() => {
  // 设置最小加载时间
  minTimeoutId = window.setTimeout(() => {
    if (loaded) {
      loading.value = false
    }
  }, MIN_LOADING_TIME)
  
  // 设置最长加载时间，防止加载动画一直显示
  timeoutId = window.setTimeout(() => {
    loaded = true
    loading.value = false
  }, 3000)
  
  // 如果页面已经加载完成，则直接隐藏加载动画
  if (document.readyState === 'complete') {
    handleLoad()
  } else {
    window.addEventListener('load', handleLoad)
  }
})

onUnmounted(() => {
  window.removeEventListener('load', handleLoad)
  if (timeoutId !== null) clearTimeout(timeoutId)
  if (minTimeoutId !== null) clearTimeout(minTimeoutId)
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
  /* 使用 var(--delay) 变量为每个点设置动画延迟，实现依次弹跳效果 */
  animation: bounce 1.5s var(--delay) infinite cubic-bezier(0.28, 0.84, 0.42, 1);
  transform: translateY(0);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
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
  margin-top: 0;
}

@keyframes pulse {
  from { opacity: 0.7; }
  to { opacity: 1; }
}

/* 淡入淡出过渡效果 */
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>