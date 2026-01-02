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
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useSiteLocaleData } from '@vuepress/client'

// 配置项
const MIN_LOADING_TIME = 800   // 最小展示时间，防止闪烁
const MAX_LOADING_TIME = 8000  // 超时强制结束时间

// 状态管理
const loading = ref(true)
const site = useSiteLocaleData()
const siteTitle = computed(() => site.value.title)

// 定时器引用 (使用 ReturnType 确保 TS 类型正确)
let minTimer: ReturnType<typeof setTimeout> | null = null
let maxTimer: ReturnType<typeof setTimeout> | null = null
let pollTimer: ReturnType<typeof setInterval> | null = null

// 资源状态
let isMinTimePassed = false
let isResourcesReady = false

/**
 * 锁定/解锁页面滚动
 * 防止加载层存在时用户滚动底层页面
 */
const toggleScrollLock = (lock: boolean) => {
  if (typeof document === 'undefined') return
  if (lock) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    document.body.classList.add('page-loaded') // 保持原有的类名添加逻辑
  }
}

/**
 * 执行隐藏动画
 */
const hideLoading = () => {
  if (!loading.value) return
  
  loading.value = false
  toggleScrollLock(false) // 解锁滚动
  
  // 清理所有定时器
  cleanupTimers()
}

/**
 * 检查关键资源状态
 * 优化检测逻辑，避免对 document 无意义的频繁遍历
 */
const checkResourcesLoaded = (): boolean => {
  if (document.readyState !== 'complete') return false
  
  // 仅检测首屏关键图片 (性能优化: 不再遍历全站图片)
  // 获取视口内的图片或前10张图片
  const images = Array.from(document.querySelectorAll('img')).slice(0, 10)
  if (images.length === 0) return true
  
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

  // 2. 最小时间计时器
  minTimer = setTimeout(() => {
    isMinTimePassed = true
    tryComplete()
  }, MIN_LOADING_TIME)

  // 3. 最大强制兜底计时器
  maxTimer = setTimeout(() => {
    console.warn('[Loader] Timeout forcing hide')
    isMinTimePassed = true 
    isResourcesReady = true
    hideLoading()
  }, MAX_LOADING_TIME)

  // 4. 事件监听与轮询策略
  const onWindowLoad = () => {
    // 稍微延迟以等待Vue渲染队列
    setTimeout(setResourcesReady, 100)
  }

  if (document.readyState === 'complete') {
    onWindowLoad()
  } else {
    window.addEventListener('load', onWindowLoad, { once: true })
  }

  // 5. 轮询保险 (针对图片加载缓慢但 window.load 已触发的情况)
  // 频率设为 200ms，更加灵敏
  pollTimer = setInterval(() => {
    if (checkResourcesLoaded()) {
      setResourcesReady()
      if (pollTimer) clearInterval(pollTimer)
    }
  }, 200)
})

onUnmounted(() => {
  cleanupTimers()
  // 确保组件销毁时恢复滚动，防止意外卡死
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
  overscroll-behavior: none; /* 防止滚动穿透 */
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
  gap: 12px; /* 增加间距 */
  margin-bottom: 30px;
  height: 60px; /* 预留跳动空间 */
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
  /* 使用品牌色，如果未定义则回退到蓝色 */
  background: var(--vp-c-brand, #3498db); 
  /* 增加微妙的渐变，更有立体感 */
  background-image: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.05) 100%);
  animation: jump 1.5s var(--delay) infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
  will-change: transform;
}

/* 阴影样式 */
.shadow {
  width: 20px;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  margin-top: 4px;
  animation: shadow-scale 1.5s var(--delay) infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
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

/* 标题和文字的上浮淡入 */
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 小球跳动 + 挤压形变 */
@keyframes jump {
  0% { transform: translateY(0) scale(1.1, 0.9); } /* 准备起跳的压扁 */
  10% { transform: translateY(0) scale(1.1, 0.9); }
  35% { transform: translateY(-35px) scale(0.9, 1.1); } /* 空中拉伸 */
  55% { transform: translateY(0) scale(1, 1); } /* 落地 */
  65% { transform: translateY(-10px) scale(0.95, 1.05); } /* 小弹跳 */
  80% { transform: translateY(0) scale(1, 1); }
  100% { transform: translateY(0) scale(1.1, 0.9); }
}

/* 阴影缩放 */
@keyframes shadow-scale {
  0% { transform: scale(1); opacity: 1; }
  10% { transform: scale(1); opacity: 1; }
  35% { transform: scale(0.5); opacity: 0.3; } /* 小球在最高点时阴影最小 */
  55% { transform: scale(1); opacity: 1; }
  65% { transform: scale(0.8); opacity: 0.6; }
  80% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* Vue Transition Fade 效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* 退出时稍微放大，制造"屏障消散"的感觉 */
  transform: scale(1.05);
  pointer-events: none;
}
</style>