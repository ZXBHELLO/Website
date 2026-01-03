<script setup lang="ts">
import { computed } from 'vue'
import { VPLink } from 'vuepress-theme-plume/client'
import { useRouteLocale } from 'vuepress/client'

interface LocaleData {
  readonly star: string
  readonly issue: string
  readonly sponsor: string
}

// 定义常量数据，避免每次渲染重新分配内存
const LOCALES: Record<string, LocaleData> = {
  '/': { 
    star: '在 GitHub 上 Star', 
    issue: '遇到问题 ?', 
    sponsor: '请我喝杯奶茶 !' 
  },
  '/en/': { 
    star: 'Star on GitHub', 
    issue: 'Create Issues', 
    sponsor: 'Buy me a Bubble Tea' 
  },
}

const lang = useRouteLocale()

// 计算当前语言包，添加兜底逻辑
const t = computed(() => LOCALES[lang.value] || LOCALES['/'])
</script>

<template>
  <div class="aside-nav-wrapper">
    <!-- GitHub Star -->
    <VPLink class="nav-link" no-icon href="https://github.com/ZXBHELLO/Website">
      <i class="icon icon-star" aria-hidden="true" />
      <span class="link-text">{{ t.star }}</span>
      <i class="icon icon-arrow" aria-hidden="true" />
    </VPLink>

    <!-- Issue -->
    <VPLink class="nav-link" no-icon href="https://github.com/ZXBHELLO/Website/issues/new">
      <i class="icon icon-issue" aria-hidden="true" />
      <span class="link-text">{{ t.issue }}</span>
      <i class="icon icon-arrow" aria-hidden="true" />
    </VPLink>

    <!-- Sponsor -->
    <VPLink class="nav-link" no-icon href="/article/sponsor/">
      <i class="icon icon-tea" aria-hidden="true" />
      <span class="link-text">{{ t.sponsor }}</span>
      <i class="icon icon-arrow" aria-hidden="true" />
    </VPLink>
  </div>
</template>

<style scoped>
.aside-nav-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px; /* 增加项之间的间距 */
  padding: 12px 0;
  margin: 16px 16px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px; /* 圆角矩形背景 */
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.25s ease;
  text-decoration: none !important;
}

/* 交互优化：不仅改变文字颜色，还添加微弱背景，触感更好 */
.nav-link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft); /* 软背景色 */
  transform: translateX(2px); /* 轻微位移反馈 */
}

.link-text {
  flex: 1;
  line-height: 1.2;
}

/* --- 核心修复：图标系统 --- */

/* 通用图标类：解决暗黑模式问题的关键 */
.icon {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  background-color: currentColor; /* 图标颜色跟随文字颜色 (fill/stroke) */
  -webkit-mask: var(--svg) no-repeat center / contain;
  mask: var(--svg) no-repeat center / contain;
  flex-shrink: 0;
}

/* 
 * SVG Data URI 优化：
 * 1. 移除了 fill/stroke 颜色定义，由 CSS currentColor 控制
 * 2. 这里的 --svg 变量仅定义形状
 */

.icon-star {
  width: 1.3em; height: 1.3em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m12 1.5l3.1 6.3l6.9 1l-5 4.8l1.2 6.9l-6.2-3.2l-6.2 3.2L7 13.6L2 8.8l6.9-1z'/%3E%3C/svg%3E");
}

.icon-issue {
  width: 1.1em; height: 1.1em;
  /* 注意：Issue 图标是实心的，原 path 包含 fill，这里不需要改 stroke，只需形状 */
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3'/%3E%3Cpath d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 0 0-13 0'/%3E%3C/svg%3E");
}

.icon-tea {
  width: 1.3em; height: 1.3em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m17.95 9l-1.478 8.69c-.25 1.463-.374 2.195-.936 2.631c-1.2.931-6.039.88-7.172 0c-.562-.436-.687-1.168-.936-2.632L5.95 9M6 9l.514-1.286a5.908 5.908 0 0 1 10.972 0L18 9M5 9h14m-7 0l4-7m-5.99 12h.01m1 4h.01m1.99-2h.01'/%3E%3C/svg%3E");
}

/* 箭头图标：使用 Plume/VitePress 自带的 CSS 变量或自定义 */
.icon-arrow {
  width: 1em; height: 1em;
  opacity: 0.5;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-7-7l7 7l-7 7'/%3E%3C/svg%3E");
}

/* Hover 时让箭头更明显 */
.nav-link:hover .icon-arrow {
  opacity: 1;
}
</style>