<template>
  <div class="html-page-container">
    <!-- 加载动画 -->
    <transition name="fade">
      <div v-if="isLoading" class="iframe-loading-overlay">
        <div class="loader-content">
          <!-- 站点标题 -->
          <h1 class="site-title">ZakoWeb</h1>
          
          <!-- Glitch 风格加载动画 -->
          <div class="loader">
            <div data-glitch="Loading..." class="glitch">Loading...</div>
          </div>
          <!-- 加载文字 -->
          <div class="text-area">
            <p class="loading-subtext">正在加载页面内容</p>
          </div>
        </div>
      </div>
    </transition>
    
    <iframe 
      v-if="src"
      :src="src"
      class="html-page-iframe"
      allow="clipboard-write; download" 
      loading="lazy"
      @load="handleIframeLoad"
    ></iframe>
    <!-- 添加 allow 属性可以支持 Alist 的复制链接和下载功能 -->
  </div>
</template>

<script>
export default {
  name: 'HtmlPage',
  props: {
    src: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    handleIframeLoad() {
      // iframe 加载完成后延迟一小段时间再隐藏加载动画，确保内容已渲染
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    }
  }
}
</script>

<style scoped>
.html-page-container {
  /* 使用 relative,高度设为视口高度减去导航栏高度 */
  position: relative;
  width: 100%;
  /* 假设导航栏是64px,根据实际情况调整,或者使用 100vh */
  height: calc(100vh - 64px); 
  overflow: hidden;
  background: transparent; /* 设置背景为透明 */
}

/* 加载遮罩层 */
.iframe-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--vp-c-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

/* 布局内容 */
.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 标题样式 */
.site-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 30px 0;
  color: var(--vp-c-text-1);
  letter-spacing: 1.5px;
}

/* Glitch 加载器容器 */
.loader {
  position: relative;
  margin-bottom: 20px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Glitch 效果核心样式 */
.glitch {
  font-size: 36px;
  font-weight: 700;
  color: var(--vp-c-brand, #3498db);
  position: relative;
  letter-spacing: 2px;
}

.glitch::before,
.glitch::after {
  content: attr(data-glitch);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--vp-c-bg);
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

/* 深色模式下的 Glitch 颜色调整 */
:root[class~="dark"] .glitch::before {
  text-shadow: -2px 0 #ff006e;
}

:root[class~="dark"] .glitch::after {
  text-shadow: -2px 0 #00f5d4;
}

/* 文本区域 */
.text-area {
  text-align: center;
}

.loading-subtext {
  color: var(--vp-c-text-3);
  font-size: 13px;
  margin: 0;
  opacity: 0.8;
}

.html-page-iframe {
  /* 改为 absolute,相对于 container 定位,而不是相对于浏览器窗口 */
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  /* z-index 0 可能会被背景遮挡,通常不需要设置,或者设为 1 */
}

/* Vue Transition Fade 效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
  pointer-events: none;
}

/* Glitch 动画关键帧 - 版本 1 */
@keyframes glitch-anim {
  0% {
    clip: rect(12px, 9999px, 52px, 0);
    transform: skew(0.65deg);
  }
  5% {
    clip: rect(82px, 9999px, 12px, 0);
    transform: skew(0.35deg);
  }
  10% {
    clip: rect(32px, 9999px, 92px, 0);
    transform: skew(0.15deg);
  }
  15% {
    clip: rect(62px, 9999px, 22px, 0);
    transform: skew(0.85deg);
  }
  20% {
    clip: rect(12px, 9999px, 82px, 0);
    transform: skew(0.25deg);
  }
  25% {
    clip: rect(92px, 9999px, 42px, 0);
    transform: skew(0.55deg);
  }
  30% {
    clip: rect(22px, 9999px, 72px, 0);
    transform: skew(0.45deg);
  }
  35% {
    clip: rect(52px, 9999px, 12px, 0);
    transform: skew(0.75deg);
  }
  40% {
    clip: rect(82px, 9999px, 62px, 0);
    transform: skew(0.15deg);
  }
  45% {
    clip: rect(42px, 9999px, 92px, 0);
    transform: skew(0.65deg);
  }
  50% {
    clip: rect(12px, 9999px, 32px, 0);
    transform: skew(0.35deg);
  }
  55% {
    clip: rect(72px, 9999px, 52px, 0);
    transform: skew(0.85deg);
  }
  60% {
    clip: rect(22px, 9999px, 82px, 0);
    transform: skew(0.25deg);
  }
  65% {
    clip: rect(92px, 9999px, 22px, 0);
    transform: skew(0.55deg);
  }
  70% {
    clip: rect(32px, 9999px, 72px, 0);
    transform: skew(0.45deg);
  }
  75% {
    clip: rect(62px, 9999px, 12px, 0);
    transform: skew(0.75deg);
  }
  80% {
    clip: rect(12px, 9999px, 92px, 0);
    transform: skew(0.15deg);
  }
  85% {
    clip: rect(82px, 9999px, 42px, 0);
    transform: skew(0.65deg);
  }
  90% {
    clip: rect(42px, 9999px, 62px, 0);
    transform: skew(0.35deg);
  }
  95% {
    clip: rect(52px, 9999px, 32px, 0);
    transform: skew(0.85deg);
  }
  100% {
    clip: rect(22px, 9999px, 82px, 0);
    transform: skew(0.25deg);
  }
}

/* Glitch 动画关键帧 - 版本 2 */
@keyframes glitch-anim2 {
  0% {
    clip: rect(62px, 9999px, 22px, 0);
    transform: skew(0.75deg);
  }
  5% {
    clip: rect(12px, 9999px, 82px, 0);
    transform: skew(0.25deg);
  }
  10% {
    clip: rect(92px, 9999px, 42px, 0);
    transform: skew(0.55deg);
  }
  15% {
    clip: rect(32px, 9999px, 72px, 0);
    transform: skew(0.45deg);
  }
  20% {
    clip: rect(72px, 9999px, 12px, 0);
    transform: skew(0.85deg);
  }
  25% {
    clip: rect(22px, 9999px, 92px, 0);
    transform: skew(0.15deg);
  }
  30% {
    clip: rect(82px, 9999px, 32px, 0);
    transform: skew(0.65deg);
  }
  35% {
    clip: rect(42px, 9999px, 62px, 0);
    transform: skew(0.35deg);
  }
  40% {
    clip: rect(12px, 9999px, 52px, 0);
    transform: skew(0.75deg);
  }
  45% {
    clip: rect(52px, 9999px, 22px, 0);
    transform: skew(0.25deg);
  }
  50% {
    clip: rect(92px, 9999px, 82px, 0);
    transform: skew(0.55deg);
  }
  55% {
    clip: rect(32px, 9999px, 12px, 0);
    transform: skew(0.45deg);
  }
  60% {
    clip: rect(62px, 9999px, 72px, 0);
    transform: skew(0.85deg);
  }
  65% {
    clip: rect(22px, 9999px, 42px, 0);
    transform: skew(0.15deg);
  }
  70% {
    clip: rect(82px, 9999px, 92px, 0);
    transform: skew(0.65deg);
  }
  75% {
    clip: rect(42px, 9999px, 32px, 0);
    transform: skew(0.35deg);
  }
  80% {
    clip: rect(12px, 9999px, 62px, 0);
    transform: skew(0.75deg);
  }
  85% {
    clip: rect(72px, 9999px, 22px, 0);
    transform: skew(0.25deg);
  }
  90% {
    clip: rect(52px, 9999px, 82px, 0);
    transform: skew(0.55deg);
  }
  95% {
    clip: rect(92px, 9999px, 12px, 0);
    transform: skew(0.45deg);
  }
  100% {
    clip: rect(32px, 9999px, 52px, 0);
    transform: skew(0.85deg);
  }
}
</style>