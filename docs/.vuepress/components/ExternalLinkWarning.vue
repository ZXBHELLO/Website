<template>
  <!-- 使用 Teleport 确保弹窗挂载到 body，避免 z-index 和 overflow 问题 -->
  <Teleport to="body">
    <Transition name="modal" appear>
      <div 
        v-if="showWarning" 
        class="external-link-warning-overlay" 
        @click="cancel"
        @wheel.prevent
        @touchmove.prevent
      >
        <div class="external-link-warning-modal" @click.stop>
          <div class="warning-header">
            <h2>⚠️ 外部链接警告</h2>
          </div>
          
          <div class="warning-content">
            <p>您即将离开本站，前往第三方网站：</p>
            <div class="link-display">
              <span class="protocol">{{ urlParts.protocol }}</span>
              <span class="domain">{{ urlParts.domain }}</span>
              <span class="path">{{ urlParts.path }}</span>
            </div>
            
            <div class="warning-message">
              <p class="warning-title">安全提示：</p>
              <ul>
                <li>请仔细核对上方域名是否为您想要访问的目标。</li>
                <li>陌生链接可能包含病毒或钓鱼风险。</li>
                <li>我们无法对第三方网站的内容安全负责。</li>
              </ul>
            </div>
          </div>
          
          <div class="warning-actions">
            <button class="action-btn secondary" @click="cancel">
              取消访问
            </button>
            <button class="action-btn outline" @click="copyLink">
              <span class="btn-icon" v-if="!copied">📋</span>
              <span class="btn-icon" v-else>✅</span>
              {{ copied ? '已复制' : '复制链接' }}
            </button>
            <button class="action-btn primary" @click="proceedToLink">
              继续前往 ➜
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// --- 状态 ---
const showWarning = ref(false)
const externalUrl = ref('')
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

// --- 计算属性：优化 URL 显示 ---
const urlParts = computed(() => {
  try {
    const url = new URL(externalUrl.value)
    return {
      protocol: url.protocol + '//',
      domain: url.hostname,
      path: (url.pathname + url.search + url.hash).length > 20 
        ? (url.pathname + url.search + url.hash).substring(0, 20) + '...' 
        : (url.pathname + url.search + url.hash)
    }
  } catch (e) {
    return { protocol: '', domain: externalUrl.value, path: '' }
  }
})

// --- 方法 ---

// 锁定/解锁背景滚动
const toggleBodyLock = (lock: boolean) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = lock ? 'hidden' : ''
}

watch(showWarning, (val) => {
  toggleBodyLock(val)
})

const showWarningDialog = (url: string) => {
  externalUrl.value = url
  showWarning.value = true
  copied.value = false
}

const cancel = () => {
  showWarning.value = false
}

const proceedToLink = () => {
  showWarning.value = false
  // 使用 noopener 增强安全性
  window.open(externalUrl.value, '_blank', 'noopener,noreferrer')
}

// 优化后的复制逻辑
const copyLink = async () => {
  if (copyTimer) clearTimeout(copyTimer)
  
  const success = await copyToClipboard(externalUrl.value)
  if (success) {
    copied.value = true
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// 兼容性更好的复制函数
const copyToClipboard = async (text: string): Promise<boolean> => {
  // 1. 尝试现代 API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.warn('Clipboard API failed, falling back.')
    }
  }

  // 2. 降级方案 (修复了滚动副作用)
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    
    // 关键：防止元素导致页面滚动或可见
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    textArea.style.top = '0'
    textArea.setAttribute('readonly', '')
    
    document.body.appendChild(textArea)
    textArea.select()
    const result = document.execCommand('copy')
    document.body.removeChild(textArea)
    return result
  } catch (err) {
    return false
  }
}

// --- 核心逻辑：拦截器 ---

const isExternalLink = (url: string): boolean => {
  if (!url) return false
  
  // 1. 忽略非 HTTP 协议 (如 mailto:, tel:, javascript:, #anchor)
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false
  }

  try {
    const targetUrl = new URL(url)
    const currentDomain = window.location.hostname
    
    // 2. 允许相同的主域名 (例如允许 sub.example.com 跳转到 www.example.com)
    // 简单的实现是直接比对 hostname，若需更严格的主域判断可扩展
    return targetUrl.hostname !== currentDomain
  } catch (e) {
    // URL 解析失败，安全起见视为非外部链接或不处理
    return false 
  }
}

const handleLinkClick = (event: MouseEvent) => {
  // 1. 如果弹窗已打开，阻止背景点击触发新逻辑
  if (showWarning.value) return

  // 2. 允许修饰键 (Ctrl/Cmd+Click, Shift+Click 等) - 修复用户体验 BUG
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  const target = event.target as HTMLElement
  const linkElement = target.closest('a')

  if (linkElement) {
    const href = linkElement.getAttribute('href')
    const targetAttr = linkElement.getAttribute('target')

    // 如果链接已有点击事件阻止，则不处理
    if (event.defaultPrevented) return

    if (href && isExternalLink(href)) {
      event.preventDefault()
      showWarningDialog(href)
    }
  }
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showWarning.value) {
    cancel()
  }
}

// --- 生命周期 ---
onMounted(() => {
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleLinkClick, { capture: true }) // 使用捕获阶段，确保优先拦截
    document.addEventListener('keydown', handleEscapeKey)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleLinkClick, { capture: true })
    document.removeEventListener('keydown', handleEscapeKey)
    toggleBodyLock(false) // 确保销毁时解锁
  }
})
</script>

<style scoped>
/* 变量定义，兼容 VitePress */
.external-link-warning-overlay {
  --modal-bg: var(--vp-c-bg, #ffffff);
  --modal-text: var(--vp-c-text-1, #2c3e50);
  --modal-divider: var(--vp-c-divider, #e2e2e3);
  --modal-brand: var(--vp-c-brand-1, #3eaf7c);
  --modal-shadow: rgba(0, 0, 0, 0.25);
  
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px); /* 增加毛玻璃质感 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647; /* 最大的 z-index */
  overscroll-behavior: none;
}

.external-link-warning-modal {
  background-color: var(--modal-bg);
  border-radius: 16px;
  box-shadow: 0 20px 50px var(--modal-shadow);
  width: 90%;
  max-width: 460px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid var(--modal-divider);
}

.warning-header {
  padding: 16px 24px;
  background: linear-gradient(135deg, var(--modal-brand), var(--vp-c-brand-2, var(--modal-brand)));
  color: white;
}

.warning-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-content {
  padding: 24px;
}

.warning-content p {
  margin: 0 0 12px;
  color: var(--modal-text);
  font-size: 15px;
  line-height: 1.5;
}

/* URL 显示优化 */
.link-display {
  background-color: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--modal-divider);
  border-radius: 8px;
  padding: 12px;
  margin: 16px 0;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13px;
  color: var(--modal-text);
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.link-display .protocol { opacity: 0.5; margin-right: 2px; user-select: none; }
.link-display .domain { color: var(--modal-brand); font-weight: 600; }
.link-display .path { opacity: 0.7; }

/* 警告框美化 */
.warning-message {
  background-color: rgba(255, 149, 0, 0.08);
  border-left: 3px solid #ff9f0a;
  padding: 12px 16px;
  border-radius: 4px;
  margin-top: 20px;
}

.warning-title {
  font-size: 13px !important;
  font-weight: 700;
  color: #d97706 !important; /* Amber-600 */
  margin-bottom: 8px !important;
  text-transform: uppercase;
}

.warning-message ul {
  padding-left: 18px;
  margin: 0;
}

.warning-message li {
  margin-bottom: 4px;
  color: var(--vp-c-text-2, #666);
  font-size: 13px;
  line-height: 1.4;
}

/* 按钮组优化 */
.warning-actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr; /* 不等宽按钮 */
  gap: 12px;
  padding: 20px 24px;
  background-color: var(--vp-c-bg-alt, rgba(0,0,0,0.02));
  border-top: 1px solid var(--modal-divider);
}

.action-btn {
  padding: 10px 0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

/* 次要按钮 */
.action-btn.secondary {
  background: transparent;
  border: 1px solid transparent;
  color: var(--vp-c-text-2);
}
.action-btn.secondary:hover {
  background: var(--vp-c-bg-soft);
  color: var(--modal-text);
}

/* 轮廓按钮 */
.action-btn.outline {
  background: var(--vp-c-bg);
  border: 1px solid var(--modal-divider);
  color: var(--modal-text);
}
.action-btn.outline:hover {
  border-color: var(--modal-brand);
  color: var(--modal-brand);
}

/* 主按钮 */
.action-btn.primary {
  background: var(--modal-brand);
  border: 1px solid var(--modal-brand);
  color: white;
  box-shadow: 0 4px 12px rgba(62, 175, 124, 0.25);
}
.action-btn.primary:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

/* 移动端适配 */
@media (max-width: 500px) {
  .warning-actions {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .action-btn { padding: 12px 0; font-size: 14px; }
  .action-btn.primary { order: -1; } /* 移动端最重要的在最上面 */
}

/* 动画 */
@keyframes modal-pop {
  0% { opacity: 0; transform: scale(0.9) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>