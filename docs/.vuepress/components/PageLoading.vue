<template>
  <transition name="fade">
    <div v-if="loading" class="page-loading" @wheel.prevent @touchmove.prevent>
      <div class="loader-content">
        <!-- 站点标题 -->
        <h1 class="site-title">{{ siteTitle || 'ZakoWeb' }}</h1>
        
        <!-- 动画主体 -->
        <div class="google-loader">
          <div class="dot-wrapper">
            <div class="dot" style="--delay: 0s"></div>
            <div class="shadow" style="--delay: 0s"></div>
          </div>
          <div class="dot-wrapper">
            <div class="dot" style="--delay: 0.2s"></div>
            <div class="shadow" style="--delay: 0.2s"></div>
          </div>
          <div class="dot-wrapper">
            <div class="dot" style="--delay: 0.4s"></div>
            <div class="shadow" style="--delay: 0.4s"></div>
          </div>
          <div class="dot-wrapper">
            <div class="dot" style="--delay: 0.6s"></div>
            <div class="shadow" style="--delay: 0.6s"></div>
          </div>
        </div>

        <!-- 加载文字 -->
        <div class="text-area">
          <p class="loading-text">正在加载中...</p>
          <p class="loading-subtext">请稍等片刻，精彩即将呈现</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSiteLocaleData } from '@vuepress/client'

// --- 配置项 ---
const MIN_LOADING_TIME = 800   // 最小展示时间，防止闪烁
const MAX_LOADING_TIME = 8000  // 超时强制结束时间
const POLL_INTERVAL = 200      // 资源检测轮询间隔

// --- 状态管理 ---
const loading = ref(true)
const site = useSiteLocaleData()
const siteTitle = computed(() => site.value.title)

// 定时器引用 (使用 ReturnType 确保 TS 类型正确)
let minTimer: ReturnType<typeof setTimeout> | null = null
let maxTimer: ReturnType<typeof setTimeout> | null = null
let pollTimer: ReturnType<typeof setInterval> | null = null

// 逻辑状态
let isMinTimePassed = false
let isResourcesReady = false

/**
 * 锁定/解锁页面滚动
 * 防止加载层存在时用户滚动底层页面
 */
const toggleScrollLock = (lock: boolean) => {
  if (typeof document === 'undefined') return
  const body = document.body
  
  if (lock) {
    body.style.overflow = 'hidden'
  } else {
    body.style.overflow = ''
    body.classList.add('page-loaded') // 保持原有的类名添加逻辑，用于触发可能的入场动画
  }
}

/**
 * 执行隐藏动画
 */
const hideLoading = () => {
  if (!loading.value) return
  
  loading.value = false
  toggleScrollLock(false) // 解锁滚动
  cleanupTimers() // 清理所有定时器
}

/**
 * 检查关键资源状态
 * 优化：仅检测首屏关键图片 (性能优化: 不再遍历全站图片)
 */
const checkResourcesLoaded = (): boolean => {
  if (typeof document === 'undefined') return true
  
  // 1. 如果 document 状态已经是 complete，直接通过
  if (document.readyState === 'complete') return true

  // 2. 仅检测前 8 张图片（通常覆盖首屏）
  // Array.from 防止在旧浏览器报错，slice 避免遍历成百上千张图
  const images = Array.from(document.querySelectorAll('img')).slice(0, 8)
  
  // 如果没有图片，认为就绪
  if (images.length === 0) return true
  
  // 检查是否所有关键图片都已完成加载且没有碎图
  return images.every(img => img.complete && img.naturalHeight !== 0)
}

/**
 * 尝试完成加载
 * 只有当 [最小时间已到] 且 [资源准备就绪] 时才会触发
 */
const tryComplete = () => {
  if (isMinTimePassed && isResourcesReady) {
    hideLoading()
  }
}

/**
 * 标记资源已就绪
 */
const setResourcesReady = () => {
  if (isResourcesReady) return
  isResourcesReady = true
  tryComplete()
}

/**
 * 清理函数
 */
const cleanupTimers = () => {
  if (minTimer) clearTimeout(minTimer)
  if (maxTimer) clearTimeout(maxTimer)
  if (pollTimer) clearInterval(pollTimer)
  minTimer = null
  maxTimer = null
  pollTimer = null
}

onMounted(() => {
  // 1. 初始锁定滚动
  toggleScrollLock(true)

  // 2. 最小时间计时器 (确保动画至少播放一小会儿，避免闪屏)
  minTimer = setTimeout(() => {
    isMinTimePassed = true
    tryComplete()
  }, MIN_LOADING_TIME)

  // 3. 最大强制兜底计时器 (防止某个资源卡死导致加载页永不消失)
  maxTimer = setTimeout(() => {
    // console.warn('[Loader] Loading timeout, forcing render.')
    isMinTimePassed = true 
    isResourcesReady = true
    hideLoading()
  }, MAX_LOADING_TIME)

  // 4. 资源检测策略
  // 策略 A: 如果挂载时已经是 complete 状态，立即就绪
  if (document.readyState === 'complete') {
    setResourcesReady()
  } else {
    // 策略 B: 监听 window load 事件
    window.addEventListener('load', setResourcesReady, { once: true })
    
    // 策略 C: 轮询保险 (针对 SPA 路由变化或 load 事件已过的情况)
    pollTimer = setInterval(() => {
      if (checkResourcesLoaded()) {
        setResourcesReady()
        if (pollTimer) clearInterval(pollTimer) // 检测到就绪后立即停止轮询
      }
    }, POLL_INTERVAL)
  }
})

onUnmounted(() => {
  cleanupTimers()
  // 关键修复：组件销毁时必须解锁滚动，防止页面卡死
  toggleScrollLock(false)
})
</script>

<style scoped>
/* 容器设置 */
.page-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* 兼容旧版 */
  height: 100dvh; /* 移动端动态高度适配 */
  background-color: var(--vp-c-bg); /* VitePress 背景色变量 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overscroll-behavior: none; /* 防止移动端滚动穿透/下拉刷新 */
  touch-action: none; /* 禁止触摸操作 */
}

/* 布局内容 */
.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 80%;
}

/* 标题样式 */
.site-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 40px 0;
  color: var(--vp-c-text-1);
  letter-spacing: 1.5px;
  opacity: 0;
  animation: slideUpFade 0.8s ease-out forwards;
}

/* 谷歌风格加载器容器 */
.google-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  height: 60px;
}

.dot-wrapper {
  position: relative;
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 小球样式 */
.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-brand, #3498db); 
  /* 增加微妙的渐变，更有立体感 */
  background-image: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.05) 100%);
  /* 优化贝塞尔曲线，使跳动更有弹性 */
  animation: jump 1.5s var(--delay) infinite cubic-bezier(0.28, 0.84, 0.42, 1);
  will-change: transform;
}

/* 阴影样式 */
.shadow {
  width: 20px;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  margin-top: 4px;
  animation: shadow-scale 1.5s var(--delay) infinite cubic-bezier(0.28, 0.84, 0.42, 1);
  filter: blur(2px);
  will-change: transform, opacity;
}

/* 深色模式适配 */
:root[class~="dark"] .shadow {
  background: rgba(255, 255, 255, 0.15);
}

/* 文本区域 */
.text-area {
  text-align: center;
  opacity: 0;
  animation: slideUpFade 0.8s ease-out 0.3s forwards;
}

.loading-text {
  color: var(--vp-c-text-2);
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 6px 0;
  letter-spacing: 0.5px;
}

.loading-subtext {
  color: var(--vp-c-text-3);
  font-size: 13px;
  margin: 0;
  opacity: 0.8;
}

/* 动画定义 */

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 优化后的小球跳动：更符合物理直觉的挤压与拉伸 */
@keyframes jump {
  0%, 100% { transform: translateY(0) scale(1.05, 0.95); } /* 落地挤压 */
  10% { transform: translateY(0) scale(1.1, 0.9); } /* 蓄力 */
  40% { transform: translateY(-35px) scale(0.9, 1.1); } /* 滞空拉伸 */
  65% { transform: translateY(0) scale(1.05, 0.95); } /* 落地 */
  75% { transform: translateY(-8px) scale(0.98, 1.02); } /* 小反弹 */
  85% { transform: translateY(0) scale(1, 1); } /* 静止 */
}

@keyframes shadow-scale {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  10% { transform: scale(1); opacity: 0.8; }
  40% { transform: scale(0.5); opacity: 0.2; }
  65% { transform: scale(1); opacity: 0.8; }
  75% { transform: scale(0.8); opacity: 0.5; }
  85% { transform: scale(1); opacity: 0.8; }
}

/* Vue Transition Fade 效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1); /* 退出时稍微放大，像是"扑面而来"的消散 */
  pointer-events: none; /* 关键：允许用户在淡出过程中点击底层元素 */
}
</style>