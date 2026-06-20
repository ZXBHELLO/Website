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
              <span class="btn-icon">✕</span>
              取消访问
            </button>
            
            <button class="action-btn outline" @click="copyLink">
              <span class="btn-icon">{{ copied ? '✅' : '📋' }}</span>
              {{ copied ? '已复制' : '复制链接' }}
            </button>
            
            <button class="action-btn primary" @click="proceedToLink">
              <span class="btn-icon">↗️</span>
              继续前往
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
  window.open(externalUrl.value, '_blank', 'noopener,noreferrer')
}

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

const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.warn('Clipboard API failed, falling back.')
    }
  }

  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
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
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false

  try {
    const targetUrl = new URL(url)
    const currentDomain = window.location.hostname
    return targetUrl.hostname !== currentDomain
  } catch (e) {
    return false 
  }
}

const handleLinkClick = (event: MouseEvent) => {
  if (showWarning.value) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  const target = event.target as HTMLElement
  const linkElement = target.closest('a')

  if (linkElement) {
    const href = linkElement.getAttribute('href')
    if (href && isExternalLink(href) && !event.defaultPrevented) {
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
    document.addEventListener('click', handleLinkClick, { capture: true })
    document.addEventListener('keydown', handleEscapeKey)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleLinkClick, { capture: true })
    document.removeEventListener('keydown', handleEscapeKey)
    toggleBodyLock(false)
  }
})
</script>

<style scoped>
.external-link-warning-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
  overscroll-behavior: none;
}

.external-link-warning-modal {
  background-color: var(--vp-c-bg, #ffffff);
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  width: 92%;
  max-width: 480px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  animation: modal-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.warning-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, #f87171, #ef4444);
  color: white;
}

.warning-header h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.warning-content {
  padding: 28px 24px 20px;
}

.warning-content p {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
  font-size: 15.5px;
  line-height: 1.6;
}

.link-display {
  background-color: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px 16px;
  margin: 18px 0;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13.8px;
  color: var(--vp-c-text-1);
  word-break: break-all;
  line-height: 1.5;
}

.link-display .protocol { opacity: 0.6; }
.link-display .domain { color: #ef4444; font-weight: 600; }
.link-display .path { opacity: 0.75; }

/* 安全提示容器 - 与弹窗主体有明显区别 + 文字清晰 */
.warning-message {
  background-color: var(--vp-c-warning-soft, #fffbeb);        /* 使用主题变量，支持深色模式 */
  border-left: 5px solid #f59e0b;
  padding: 16px 18px;
  border-radius: 8px;
  margin: 22px 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.warning-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--vp-c-warning-text, #b45309);                   /* 深橙色，确保清晰 */
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.warning-message ul {
  padding-left: 20px;
  margin: 0;
}

.warning-message li {
  margin-bottom: 7px;
  color: var(--vp-c-text-1, #374151);                   /* 深灰色，确保高对比度可读 */
  font-size: 13.6px;
  line-height: 1.5;
}

.warning-actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 三个按钮等宽 */
  gap: 12px;
  padding: 22px 24px;
  background-color: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
}

.action-btn {
  padding: 11px 0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-icon {
  font-size: 16px;
  line-height: 1;
}

.action-btn.secondary {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.action-btn.secondary:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.action-btn.outline {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action-btn.outline:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.action-btn.primary {
  background: #ef4444;
  color: white;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
}

.action-btn.primary:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(239, 68, 68, 0.35);
}

/* 移动端优化 */
@media (max-width: 500px) {
  .external-link-warning-modal {
    width: 96%;
    border-radius: 16px;
  }
  .warning-actions {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

/* 动画 */
@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.88) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>