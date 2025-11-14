<template>
  <div class="m-nav-container">
    <div v-for="group in navData" :key="group.category" class="m-nav-group">
      <h2>{{ group.category }}</h2>
      <div class="m-nav-links">
        <a 
          v-for="item in group.items" 
          :key="item.id"
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
            />
          </div>
          <div class="m-nav-link-content">
            <div class="m-nav-link-title">{{ item.title }}</div>
            <div class="m-nav-link-desc">{{ item.description }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { navData } from '../../nav/data.js'
</script>

<style>
/* 为导航页面添加一些基础样式 */
/* 设置最大宽度为100%，内边距为0 */
.m-nav-layout {
  max-width: 100%;
  padding: 0;
}

/* 容器的最大宽度设置为100% */
.m-nav-layout .container {
  max-width: 100%;
}

/* 隐藏页面中的标题元素 */
.m-nav-layout .page-title {
  display: none;
}

/* 导航容器样式 */
/* 设置最大宽度、居中显示、内边距和左右边距 */
.m-nav-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 0.5rem; /* 减小边距到0.5rem */
  margin-left: 4rem; /* 左边距 */
  margin-right: 4rem; /* 右边距 */
}

/* 导航分组样式 */
/* 设置底部外边距 */
.m-nav-group {
  margin-bottom: 2rem;
}

/* 导航分组标题样式 */
/* 设置字体大小、粗细、底部外边距、颜色、下边框和底部内边距 */
.m-nav-group h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

/* 导航链接容器 */
/* 使用网格布局，设置列数、间距 */
.m-nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.8rem; /* 导航项之间的间距 */
}

/* 单个导航链接样式 */
/* 设置为弹性布局、对齐方式、内边距、边框、圆角、去除下划线、过渡效果 */
.m-nav-link {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.6rem 0.6rem 0.6rem; /* 上 右 下 左 - 统一内边距 */
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  position: relative;
  background: var(--vp-c-bg);
  transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
}

/* 添加指针箭头伪元素 */
.m-nav-link::after {
  content: '→';
  position: absolute;
  right: 0.6rem;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

/* 添加边框和阴影过渡伪元素 */
.m-nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  pointer-events: none;
  transition: border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  box-shadow: 0 0 0 rgba(80, 134, 161, 0);
}

/* 导航链接悬停效果 */
/* 背景渐变、边框和阴影淡入 */
.m-nav-link:hover {
  background: linear-gradient(135deg, rgba(80, 134, 161, 0.05) 0%, rgba(131, 208, 218, 0.05) 100%);
}

/* 悬停时边框和阴影淡入 */
.m-nav-link:hover::before {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(80, 134, 161, 0.2);
}

/* 悬停时显示指针箭头 */
.m-nav-link:hover::after {
  opacity: 1;
  transform: translateX(0);
}

/* 导航链接图标容器 */
/* 设置宽度、高度、不收缩、边距、对齐方式 */
/* 添加边框以增强视觉效果 */
.m-nav-link-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  margin-right: 0.8rem; /* 图标与文字之间的间距 */
  margin-left: 0.3rem; /* 图标与左边框的距离 */
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
/* 设置宽度、高度、适应方式、防止渲染卡顿 */
.m-nav-link-icon img {
  width: 32px;
  height: 32px;
  max-width: 32px;
  max-height: 32px;
  object-fit: contain;
  object-position: center;
}

/* 添加 Iconify 图标支持 */
/* 设置 Iconify 图标的宽度、高度和显示方式，限制最大尺寸防止卡顿 */
.m-nav-link-icon .iconify {
  width: 32px;
  height: 32px;
  display: inline-block;
  max-width: 32px;
  max-height: 32px;
}

/* 确保所有文本元素都没有下划线 */
.m-nav-link-content,
.m-nav-link-title,
.m-nav-link-desc {
  text-decoration: none;
}

/* 导航链接内容区域 */
/* 设置弹性增长 */
.m-nav-link-content {
  flex: 1;
}

/* 导航链接标题样式 */
/* 设置字体大小、粗细、颜色、底部外边距 */
.m-nav-link-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

/* 导航链接描述样式 */
/* 设置字体大小、颜色 */
.m-nav-link-desc {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

/* 响应式设计 - 平板及以下尺寸 */
@media (max-width: 768px) {
  /* 调整导航容器内边距和左右边距 */
  .m-nav-container {
    padding: 0 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  /* 调整导航链接网格列数和间距 */
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }
}

/* 响应式设计 - 手机尺寸 */
@media (max-width: 480px) {
  /* 进一步减小导航容器内边距和左右边距 */
  .m-nav-container {
    padding: 0 0.25rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  
  /* 在手机上使用单列布局，减小间距 */
  .m-nav-links {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  /* 减小导航链接内边距 */
  .m-nav-link {
    padding: 0.75rem;
  }
}
</style>