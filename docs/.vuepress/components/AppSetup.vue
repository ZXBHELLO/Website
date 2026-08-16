<template>
  <!-- 粒子背景效果组件 -->
  <ParticleBackground />
</template>

<script setup lang="ts">
// @ts-nocheck
import { onMounted, watch, nextTick, ref } from 'vue'
import { useRouter } from '@vuepress/client'

const router = useRouter()
const currentPath = ref(router?.route?.path ?? window.location.pathname)

/**
 * Details 容器折叠展开动画
 * 使用 JS 辅助计算内容高度，配合 CSS 过渡实现平滑动画
 */
function setupDetailsAnimation() {
  // 等待 DOM 渲染完成
  nextTick(() => {
    const detailsList = document.querySelectorAll('.vp-doc details.hint-container')

    detailsList.forEach((detailsEl: HTMLDetailsElement) => {
      // 跳过已处理过的元素
      if (detailsEl.dataset.detailsAnimated === 'true') return
      detailsEl.dataset.detailsAnimated = 'true'

      // 找到 summary 元素和内容包装器
      const summary = detailsEl.querySelector('summary')
      if (!summary) return

      // 找到所有 summary 之后的兄弟元素作为内容
      const getContentElements = () =>
        Array.from(detailsEl.children).filter((el) => el.tagName !== 'SUMMARY')

      // 创建统一的内容包装器（如果还没有的话）
      let contentWrapper = detailsEl.querySelector(':scope > .details-content-wrapper') as HTMLElement | null

      if (!contentWrapper) {
        contentWrapper = document.createElement('div')
        contentWrapper.className = 'details-content-wrapper'

        const contentElements = getContentElements()
        contentElements.forEach((el) => contentWrapper!.appendChild(el))
        detailsEl.appendChild(contentWrapper)
      }

      // 设置初始状态
      if (detailsEl.open) {
        // 如果初始就是打开的，直接设置高度为 auto
        contentWrapper.style.height = 'auto'
        contentWrapper.style.opacity = '1'
        contentWrapper.style.transform = 'translateY(0)'
      } else {
        contentWrapper.style.height = '0px'
        contentWrapper.style.opacity = '0'
        contentWrapper.style.transform = 'translateY(-4px)'
      }

      // 处理 summary 的点击事件
      const handleClick = (e: Event) => {
        e.preventDefault()

        const isOpen = detailsEl.open
        const wrapper = contentWrapper!

        if (isOpen) {
          // 关闭动画：先从当前高度过渡到 0
          const currentHeight = wrapper.scrollHeight
          wrapper.style.height = `${currentHeight}px`

          // 强制 reflow
          wrapper.offsetHeight

          // 触发过渡到 0
          requestAnimationFrame(() => {
            wrapper.style.height = '0px'
            wrapper.style.opacity = '0'
            wrapper.style.transform = 'translateY(-4px)'
          })

          // 动画结束后移除 open 属性
          const onTransitionEnd = (ev: TransitionEvent) => {
            if (ev.propertyName !== 'height') return
            detailsEl.removeAttribute('open')
            wrapper.removeEventListener('transitionend', onTransitionEnd)
          }
          wrapper.addEventListener('transitionend', onTransitionEnd)
        } else {
          // 打开动画：先设置 open 属性让内容有真实高度
          detailsEl.setAttribute('open', '')

          // 获取真实高度
          const targetHeight = wrapper.scrollHeight

          // 从 0 开始过渡
          wrapper.style.height = '0px'
          wrapper.style.opacity = '0'
          wrapper.style.transform = 'translateY(-4px)'

          // 强制 reflow
          wrapper.offsetHeight

          // 触发过渡到目标高度
          requestAnimationFrame(() => {
            wrapper.style.height = `${targetHeight}px`
            wrapper.style.opacity = '1'
            wrapper.style.transform = 'translateY(0)'
          })

          // 动画结束后设置为 auto，适配响应式布局内容变化
          const onTransitionEnd = (ev: TransitionEvent) => {
            if (ev.propertyName !== 'height') return
            wrapper.style.height = 'auto'
            wrapper.removeEventListener('transitionend', onTransitionEnd)
          }
          wrapper.addEventListener('transitionend', onTransitionEnd)
        }
      }

      summary.addEventListener('click', handleClick)
    })
  })
}

// 页面加载完成后初始化
onMounted(() => {
  setupDetailsAnimation()
})

// 监听路由变化，在新页面渲染完成后重新初始化
watch(
  currentPath,
  () => {
    // 延迟等待 DOM 渲染
    setTimeout(() => {
      setupDetailsAnimation()
    }, 150)
  }
)

// 订阅 router 变化更新 path
if (router && typeof router.afterEach === 'function') {
  router.afterEach((to: any) => {
    currentPath.value = to.path
  })
} else {
  // 兜底：使用 popstate 监听浏览器历史变化
  window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname
  })
}
</script>