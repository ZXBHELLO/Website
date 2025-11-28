<template>
  <Transition name="modal" appear>
    <div v-if="showWarning" class="external-link-warning-overlay" @click="cancel">
      <div class="external-link-warning-modal" @click.stop>
        <div class="warning-header">
          <h2>外部链接警告</h2>
        </div>
        
        <div class="warning-content">
          <p>您正在访问一个非本站网页，请谨慎操作：</p>
          <div class="link-display">
            <code>{{ displayedUrl }}</code>
          </div>
          
          <div class="warning-message">
            <p>请注意：</p>
            <ul>
              <li>该链接将带您离开本网站</li>
              <li>我们不对第三方网站的内容负责</li>
              <li>请确保链接来源可信</li>
            </ul>
          </div>
        </div>
        
        <div class="warning-actions">
          <button class="action-btn" @click="copyLink">
            <span v-if="copied">已复制</span>
            <span v-else>复制链接</span>
          </button>
          <button class="action-btn" @click="proceedToLink">
            跳转链接
          </button>
          <button class="action-btn" @click="cancel">
            留在本站
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const showWarning = ref(false)
const externalUrl = ref('')
const copied = ref(false)
// 计算显示的URL（只显示根域名）
const displayedUrl = computed(() => {
  try {
    const url = new URL(externalUrl.value)
    return `${url.protocol}//${url.host}/`
  } catch (e) {
    // 如果URL解析失败，返回原始URL
    return externalUrl.value
  }
})

// 显示警告对话框
const showWarningDialog = (url: string) => {
  externalUrl.value = url
  showWarning.value = true
  copied.value = false
}

// 复制链接到剪贴板
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(externalUrl.value)
    copied.value = true
    // 2秒后恢复按钮文本
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
    // 降级方案：选择文本
    const textArea = document.createElement('textarea')
    textArea.value = externalUrl.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// 跳转到链接
const proceedToLink = () => {
  window.open(externalUrl.value, '_blank', 'noopener,noreferrer')
  showWarning.value = false
}

// 返回本站（关闭对话框）
const cancel = () => {
  showWarning.value = false
}

// 通过ESC键关闭对话框
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showWarning.value) {
    cancel()
  }
}

// 处理链接点击事件
const handleLinkClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const linkElement = target.closest('a')
  
  if (linkElement) {
    const href = linkElement.getAttribute('href')
    
    // 检查是否为外部链接
    if (href && isExternalLink(href)) {
      event.preventDefault()
      showWarningDialog(href)
    }
  }
}

// 检查是否为外部链接
const isExternalLink = (url: string): boolean => {
  // 如果是相对链接（以 / 开头），则认为是本站链接
  if (url.startsWith('/')) {
    return false
  }
  
  try {
    const urlObj = new URL(url, window.location.origin)
    const currentDomain = window.location.hostname
    return urlObj.hostname !== currentDomain
  } catch (e) {
    // 如果URL解析失败，假设它是外部链接
    return true
  }
}

// 添加事件监听器
onMounted(() => {
  document.addEventListener('click', handleLinkClick)
  document.addEventListener('keydown', handleEscapeKey)
})

// 移除事件监听器
onBeforeUnmount(() => {
  document.removeEventListener('click', handleLinkClick)
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
.external-link-warning-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;

}

.external-link-warning-modal {
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.warning-header {
  padding: 20px;
  background-color: var(--vp-c-brand);
  color: white;
  text-align: center;
}

.warning-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.warning-content {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}

.warning-content p {
  margin-top: 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.6;
}

.link-display {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px;
  margin: 15px 0;
  word-break: break-all;
}

.link-display code {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-brand);
}

.warning-message {
  background-color: rgba(255, 165, 0, 0.1);
  border-left: 4px solid orange;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin: 20px 0;
}

.warning-message p {
  margin-top: 0;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.warning-message ul {
  padding-left: 20px;
  margin: 10px 0 0;
}

.warning-message li {
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.warning-actions {
  display: flex;
  padding: 20px;
  gap: 12px;
  background-color: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.action-btn {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  overflow: visible;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.action-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  pointer-events: none;
  transition: border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 rgba(80, 134, 161, 0);
}

.action-btn:hover {
  background: linear-gradient(135deg, rgba(80, 134, 161, 0.05) 0%, rgba(131, 208, 218, 0.05) 100%);
  color: var(--vp-c-text-1);
}

.action-btn:hover::before {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(80, 134, 161, 0.2);
}

@media (max-width: 600px) {
  .warning-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}

/* Modal animation styles */
.modal-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.15);
}

.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 0, 0.8, 0.15);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}


/* Modal overlay background animation */
.modal-enter-from .external-link-warning-overlay,
.modal-leave-to .external-link-warning-overlay {
  background-color: rgba(0, 0, 0, 0);
}

/* Improve performance by forcing hardware acceleration */
.external-link-warning-overlay {
  will-change: opacity;
  backface-visibility: hidden;
}
</style>