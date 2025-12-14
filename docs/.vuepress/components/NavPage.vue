<template>
  <div class="m-nav-container">
    <div v-for="group in visibleGroups" :key="group.category" class="m-nav-group">
      <h2>{{ group.category }}</h2>
      <div class="m-nav-links">
        <a 
          v-for="(item, index) in group.items" 
          :key="index"
          :href="item.url" 
          class="m-nav-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div 
            v-if="item.iconType && item.iconType !== 'none' && item.icon && item.icon !== 'none'"
            class="m-nav-link-icon" 
            :class="{ 
              'no-border': item.showIconBorder === false 
            }"
          >
            <span 
              v-if="item.iconType === 'iconify'" 
              class="iconify" 
              :data-icon="item.icon"
            ></span>
            <img 
              v-else-if="item.iconType === 'image'" 
              :src="item.icon" 
              :alt="item.title" 
              loading="lazy" 
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div class="m-nav-link-content">
            <div class="m-nav-link-title">{{ item.title }}</div>
            <div class="m-nav-link-desc">{{ item.description || '' }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navData } from '../../nav/data.js'

// 常量定义
const LOAD_GROUP_COUNT = 6  // 增加初始加载数量
const SCROLL_DEBOUNCE_DELAY = 50  // 减少防抖延迟
const ICONIFY_SCRIPT_URL = 'https://code.iconify.design/2/2.1.2/iconify.min.js'
const BOTTOM_THRESHOLD = 300  // 提前触发加载的距离

// 性能优化：实现动态加载
const visibleGroups = ref([])
let scrollTimer = null
let iconifyScript = null
let observer = null

// 使用 Intersection Observer 替代滚动事件监听
const createObserver = () => {
  if ('IntersectionObserver' in window) {
    const sentinel = document.createElement('div')
    sentinel.id = 'sentinel'
    document.body.appendChild(sentinel)
    
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMoreGroups()
        }
      })
    }, {
      rootMargin: '300px' // 提前300px触发加载
    })
    
    observer.observe(sentinel)
  } else {
    // 降级到滚动事件监听
    window.addEventListener('scroll', handleScroll)
  }
}

// 页面滚动处理函数（降级方案）
const handleScroll = () => {
  // 清除之前的定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
  
  // 设置新的定时器，实现防抖效果
  scrollTimer = setTimeout(() => {
    // 检查是否接近页面底部
    const scrollY = window.scrollY || window.pageYOffset
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    
    // 当距离页面底部300px时加载更多内容
    if (scrollY + windowHeight >= documentHeight - BOTTOM_THRESHOLD) {
      loadMoreGroups()
    }
  }, SCROLL_DEBOUNCE_DELAY)
}

// 加载更多分组
const loadMoreGroups = () => {
  const currentCount = visibleGroups.value.length
  const remainingCount = navData.length - currentCount
  
  if (remainingCount <= 0) {
    // 所有分组都已加载，断开观察器
    if (observer) {
      observer.disconnect()
    }
    return
  }
  
  // 每次加载最多6个分组（原来是3个）
  const loadCount = Math.min(LOAD_GROUP_COUNT, remainingCount)
  
  const newGroups = []
  for (let i = 0; i < loadCount; i++) {
    const groupIndex = currentCount + i
    if (groupIndex < navData.length) {
      newGroups.push(navData[groupIndex])
    }
  }
  
  if (newGroups.length > 0) {
    visibleGroups.value = [...visibleGroups.value, ...newGroups]
    
    // 如果现在可能有新图标，重新扫描
    processIconifyIcons()
  }
}

// 处理 Iconify 图标
const processIconifyIcons = () => {
  const hasIconifyIcons = document.querySelectorAll('.iconify:not(.iconify-loaded)').length > 0
  if (hasIconifyIcons) {
    if (window.Iconify) {
      // 如果Iconify已经存在，直接渲染图标
      window.Iconify.scan()
      // 为所有图标添加loaded类
      const icons = document.querySelectorAll('.iconify:not(.iconify-loaded)')
      icons.forEach(icon => icon.classList.add('iconify-loaded'))
    } else {
      // 如果Iconify不存在，加载脚本
      loadIconifyScript()
    }
  }
}

// 加载 Iconify 脚本
const loadIconifyScript = () => {
  // 如果脚本已经在加载或已存在，则直接返回
  if (iconifyScript || window.Iconify) return
  
  // 创建并加载Iconify脚本
  iconifyScript = document.createElement('script')
  iconifyScript.src = ICONIFY_SCRIPT_URL
  iconifyScript.async = true
  iconifyScript.onload = () => {
    // 当Iconify加载完成后，渲染图标
    if (window.Iconify) {
      window.Iconify.scan()
      // 为所有已渲染的图标添加loaded类
      const icons = document.querySelectorAll('.iconify:not(.iconify-loaded)')
      icons.forEach(icon => icon.classList.add('iconify-loaded'))
    }
    // 清理脚本引用
    iconifyScript = null
  }
  // 错误处理，确保脚本加载失败时可以重试
  iconifyScript.onerror = () => {
    console.warn('Iconify script failed to load, retrying...')
    // 清理失败的脚本引用以便重试
    iconifyScript = null
  }
  document.head.appendChild(iconifyScript)
}

const onImageLoad = (event) => {
  // 添加loaded类以触发动画
  event.target.classList.add('loaded')
}

const onImageError = (event) => {
  // 图片加载失败时显示默认占位符
  const img = event.target
  img.style.display = 'flex'
  img.style.alignItems = 'center'
  img.style.justifyContent = 'center'
  img.style.backgroundColor = 'var(--vp-c-bg)'
  img.style.color = 'var(--vp-c-text-2)'
  img.style.fontSize = '24px'
  // 使用更通用的占位符字符，避免emoji可能的兼容性问题
  img.innerText = '📁'
}

// 对于Iconify图标，我们添加一个处理函数
onMounted(() => {
  // 初始化时加载前几个分组（增加初始加载量）
  loadMoreGroups()
  
  // 创建 Intersection Observer 或添加滚动事件监听器
  createObserver()
})

onUnmounted(() => {
  // 清理观察器和滚动事件监听器和定时器
  if (observer) {
    observer.disconnect()
  } else {
    window.removeEventListener('scroll', handleScroll)
  }
  
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
  
  // 清理 Iconify 脚本
  if (iconifyScript) {
    // 不要移除已成功加载的脚本，因为其他组件可能还在使用
    // iconifyScript.remove()
    iconifyScript = null
  }
  
  // 清理 sentinel 元素
  const sentinel = document.getElementById('sentinel')
  if (sentinel) {
    sentinel.remove()
  }
})
</script>

<style>
/* 导航容器样式 */
.m-nav-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 0.5rem;
  margin-left: 4rem;
  margin-right: 4rem;
}

/* 导航分组样式 */
.m-nav-group {
  margin-bottom: 2rem;
}

/* 导航分组标题样式 */
.m-nav-group h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

/* 导航链接容器 */
.m-nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.8rem;
}

/* 单个导航链接样式 */
.m-nav-link {
  display: flex;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  position: relative;
  background: var(--vp-c-bg);
  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* 缩短过渡时间 */
}

/* 添加指针箭头伪元素 */
.m-nav-link::after {
  content: '→';
  position: absolute;
  right: 0.6rem;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), /* 缩短过渡时间 */
              transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

/* 导航链接悬停效果 */
.m-nav-link:hover {
  background: linear-gradient(135deg, rgba(80, 134, 161, 0.05) 0%, rgba(131, 208, 218, 0.05) 100%);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(80, 134, 161, 0.2);
}

/* 导航链接图标容器 */
.m-nav-link-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  margin-right: 0.8rem;
  margin-left: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.06);
}

/* 为不显示边框的图标移除边框样式 */
.m-nav-link-icon.no-border {
  border: none;
}

/* 深色模式下的图标容器背景 */
[data-theme="dark"] .m-nav-link-icon {
  background-color: rgba(255, 255, 255, 0.12);
}

/* 导航链接图标图片样式 */
.m-nav-link-icon img {
  width: 32px;
  height: 32px;
  max-width: 32px;
  max-height: 32px;
  object-fit: contain;
  object-position: center;
  /* 添加过渡效果使图片加载更平滑 */
  opacity: 0;
  transition: opacity 0.2s ease; /* 缩短过渡时间 */
}

.m-nav-link-icon img:not([src]) {
  visibility: hidden;
}

.m-nav-link-icon img.loaded {
  opacity: 1;
}

/* 添加 Iconify 图标支持 */
.m-nav-link-icon .iconify {
  width: 32px;
  height: 32px;
  display: inline-block;
  max-width: 32px;
  max-height: 32px;
  /* 添加过渡效果使图标加载更平滑 */
  opacity: 0;
  transition: opacity 0.2s ease; /* 缩短过渡时间 */
}

.m-nav-link-icon .iconify.iconify-loaded {
  opacity: 1;
}

/* 确保所有文本元素都没有下划线 */
.m-nav-link-content,
.m-nav-link-title,
.m-nav-link-desc {
  text-decoration: none;
}

/* 导航链接内容区域 */
.m-nav-link-content {
  flex: 1;
}

/* 导航链接标题样式 */
.m-nav-link-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

/* 导航链接描述样式 */
.m-nav-link-desc {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

/* 响应式设计 - 平板及以下尺寸 */
@media (max-width: 768px) {
  .m-nav-container {
    padding: 0 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }
}

/* 响应式设计 - 手机尺寸 */
@media (max-width: 480px) {
  .m-nav-container {
    padding: 0 0.25rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  
  .m-nav-links {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .m-nav-link {
    padding: 0.75rem;
  }
}
</style>