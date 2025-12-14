<template>
  <!-- 主容器：整个导航页的内容区域 -->
  <div class="m-nav-container" ref="containerRef">
    <!-- 遍历可见的分类组（实现懒加载） -->
    <div v-for="group in visibleGroups" :key="group.category" class="m-nav-group">
      <!-- 分类标题 -->
      <h2>{{ group.category }}</h2>
      <!-- 卡片网格容器 -->
      <div class="m-nav-links">
        <!-- 遍历当前分类下的所有链接项 -->
        <a
          v-for="(item, index) in group.items"
          :key="index"
          :href="item.url"
          class="m-nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <!-- 图标区域：仅在配置了有效图标时显示 -->
          <div
            v-if="item.iconType && item.iconType !== 'none' && item.icon && item.icon !== 'none'"
            class="m-nav-link-icon"
            :class="{ 'no-border': item.showIconBorder === false }"
          >
            <!-- Iconify 图标 -->
            <span
              v-if="item.iconType === 'iconify'"
              class="iconify"
              :data-icon="item.icon"
            ></span>
            <!-- 图片图标 -->
            <img
              v-else-if="item.iconType === 'image'"
              :src="item.icon"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <!-- 文字内容区域 -->
          <div class="m-nav-link-content">
            <div class="m-nav-link-title">{{ item.title }}</div>
            <div class="m-nav-link-desc">{{ item.description || '' }}</div>
          </div>
        </a>
      </div>
    </div>
    <!-- 哨兵元素：用于 IntersectionObserver 检测底部，触发加载更多 -->
    <div ref="sentinelRef" id="sentinel"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { navData } from '../../nav/data.js'

// 常量配置
const LOAD_GROUP_COUNT = 6                  // 每次懒加载的分类组数量
const BOTTOM_THRESHOLD = 300                // 距离底部多少像素时触发加载
const ICONIFY_SCRIPT_URL = 'https://code.iconify.design/2/2.1.2/iconify.min.js'

// 响应式状态
const visibleGroups = ref([])               // 当前已渲染的分类组
const containerRef = ref(null)              // 主容器引用
const sentinelRef = ref(null)               // 哨兵元素引用

// 内部变量
let observer = null                         // IntersectionObserver 实例
let scrollHandler = null                    // 回退滚动监听函数
let scrollTimer = null                      // 防抖定时器
let iconifyScriptLoading = false            // Iconify 脚本是否正在加载

// 创建 IntersectionObserver，实现接近底部时自动加载更多分类
const createObserver = () => {
  if (!('IntersectionObserver' in window) || !sentinelRef.value) {
    setupScrollFallback()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        loadMoreGroups()
      }
    },
    {
      root: containerRef.value?.scrollHeight > containerRef.value?.clientHeight ? containerRef.value : null,
      rootMargin: `${BOTTOM_THRESHOLD}px`
    }
  )

  observer.observe(sentinelRef.value)
}

// 浏览器不支持 IntersectionObserver 时的回退方案：监听 scroll 事件
const setupScrollFallback = () => {
  const scrollElement = containerRef.value || window

  scrollHandler = () => {
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      let shouldLoad = false
      if (scrollElement === window) {
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_THRESHOLD) {
          shouldLoad = true
        }
      } else {
        const { scrollTop, clientHeight, scrollHeight } = scrollElement
        if (scrollTop + clientHeight >= scrollHeight - BOTTOM_THRESHOLD) {
          shouldLoad = true
        }
      }
      if (shouldLoad) loadMoreGroups()
    }, 50)
  }

  if (scrollElement === window) {
    window.addEventListener('scroll', scrollHandler, { passive: true })
  } else {
    scrollElement.addEventListener('scroll', scrollHandler, { passive: true })
  }
}

// 加载更多分类组
const loadMoreGroups = () => {
  const currentCount = visibleGroups.value.length
  if (currentCount >= navData.length) {
    if (observer) observer.disconnect()
    return
  }

  const loadCount = Math.min(LOAD_GROUP_COUNT, navData.length - currentCount)
  const newGroups = navData.slice(currentCount, currentCount + loadCount)
  visibleGroups.value = [...visibleGroups.value, ...newGroups]

  // DOM 更新完成后处理新添加的图标
  nextTick(() => {
    processIconifyIcons()
  })
}

// 处理 Iconify 图标渲染（核心修复：确保初始加载和后续加载都能正确显示）
const processIconifyIcons = () => {
  // 如果 Iconify 已就绪，直接扫描并添加 loaded 类（触发淡入动画）
  if (window.Iconify) {
    window.Iconify.scan()
    document.querySelectorAll('.iconify:not(.iconify-loaded)').forEach(icon => {
      icon.classList.add('iconify-loaded')
    })
    return
  }

  // 若脚本尚未加载且未在加载中，则动态插入脚本
  if (!iconifyScriptLoading && !document.querySelector(`script[src="${ICONIFY_SCRIPT_URL}"]`)) {
    iconifyScriptLoading = true
    const script = document.createElement('script')
    script.src = ICONIFY_SCRIPT_URL
    script.async = true
    script.onload = () => {
      iconifyScriptLoading = false
      if (window.Iconify) {
        // 脚本加载完成立即全局扫描
        window.Iconify.scan()
        // 延时再次扫描 + 添加类，确保所有图标都被处理
        setTimeout(() => {
          window.Iconify.scan()
          document.querySelectorAll('.iconify:not(.iconify-loaded)').forEach(icon => {
            icon.classList.add('iconify-loaded')
          })
        }, 100)
      }
    }
    script.onerror = () => {
      iconifyScriptLoading = false
      console.warn('Iconify script failed to load')
    }
    document.head.appendChild(script)
  }
}

// 图片图标加载成功：添加 loaded 类触发淡入
const onImageLoad = (event) => {
  event.target.classList.add('loaded')
}

// 图片图标加载失败：显示文件夹占位符
const onImageError = (event) => {
  const img = event.target
  img.style.display = 'flex'
  img.style.alignItems = 'center'
  img.style.justifyContent = 'center'
  img.style.backgroundColor = 'var(--vp-c-bg)'
  img.style.color = 'var(--vp-c-text-2)'
  img.style.fontSize = '24px'
  img.innerText = '📁'
}

// 组件挂载完成后的初始化逻辑
onMounted(() => {
  // 初始渲染前 LOAD_GROUP_COUNT 个分类
  visibleGroups.value = navData.slice(0, LOAD_GROUP_COUNT)
  
  // 首次处理图标
  processIconifyIcons()

  // 多次延时调用，确保即使脚本加载较慢也能捕获到所有图标
  setTimeout(() => processIconifyIcons(), 300)
  setTimeout(() => processIconifyIcons(), 800)

  // 若还有更多分类，则开启懒加载
  if (visibleGroups.value.length < navData.length) {
    createObserver()
  }
})

// 组件卸载时清理资源
onUnmounted(() => {
  if (observer) observer.disconnect()
  if (scrollHandler) {
    const scrollElement = containerRef.value || window
    if (scrollElement === window) {
      window.removeEventListener('scroll', scrollHandler)
    } else {
      scrollElement.removeEventListener('scroll', scrollHandler)
    }
  }
  if (scrollTimer) clearTimeout(scrollTimer)
})
</script>

<style>
/* 主容器：充分利用屏幕宽度，智能留白 */
.m-nav-container {
  width: 100%;
  max-width: none;
  margin: 0 auto;
  padding: 0 max(1.5rem, 4vw);
  box-sizing: border-box;
}

/* 分类组间距 */
.m-nav-group {
  margin-bottom: 2.8rem;
}

/* 分类标题样式 */
.m-nav-group h2 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.7rem;
}

/* 卡片网格布局 */
.m-nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
}

/* 单个导航卡片基础样式 */
.m-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  text-decoration: none !important;
  background: var(--vp-c-bg);
  height: 92px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  /* 初始 transform 状态 + 硬件加速优化，确保缩放动画流畅 */
  transform: scale(1);
  transform-origin: center;
  backface-visibility: hidden;
  will-change: transform, border-color, box-shadow;

  /* 平滑过渡：缩放、边框颜色、阴影 */
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 0.4s ease,
              box-shadow 0.4s ease;
}

/* 悬停效果：轻微缩放 + 蓝色边框 + 阴影 */
.m-nav-link:hover {
  transform: scale(1.02);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 30px rgba(80, 134, 161, 0.22);
  z-index: 10;
}

/* 图标容器 */
.m-nav-link-icon {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
}

/* 可选：移除图标边框 */
.m-nav-link-icon.no-border {
  border: none;
}

/* 暗色模式下图标背景微调 */
[data-theme="dark"] .m-nav-link-icon {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 图标淡入动画 */
.m-nav-link-icon img,
.m-nav-link-icon .iconify {
  width: 34px;
  height: 34px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.m-nav-link-icon img.loaded,
.m-nav-link-icon .iconify.iconify-loaded {
  opacity: 1;
}

/* 文字内容区域：垂直居中 + 防止溢出换行 */
.m-nav-link-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

/* 标题：单行省略 */
.m-nav-link-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.4rem;
}

/* 描述：单行省略 */
.m-nav-link-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 响应式调整：不同屏幕宽度下的网格和卡片尺寸 */
@media (max-width: 1400px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  }
  .m-nav-link {
    height: 88px;
    padding: 0.9rem;
  }
}

@media (max-width: 1024px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .m-nav-container {
    padding: 0 1.2rem;
  }
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  .m-nav-link {
    height: 84px;
  }
  .m-nav-link:hover {
    transform: scale(1.015);
  }
}

@media (max-width: 480px) {
  .m-nav-container {
    padding: 0 0.8rem;
  }
  .m-nav-links {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }
  .m-nav-link:hover {
    transform: scale(1.01);
  }
  .m-nav-link {
    height: 92px;
    padding: 1rem;
  }
}

/* 哨兵元素占位 */
#sentinel {
  height: 20px;
  width: 100%;
}
</style>