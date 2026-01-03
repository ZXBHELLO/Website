<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'

const pageData = usePageFrontmatter()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const shouldShowParticles = ref(true)
const isDarkMode = ref(false)
let particleEffect: ParticleEffect | null = null

// --- 工具函数 ---

// 简单的防抖函数，避免 Resize 频繁触发
const debounce = (fn: Function, delay: number) => {
  let timer: any = null
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

const detectDarkMode = () => {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute('data-theme') === 'dark' ||
         window.matchMedia('(prefers-color-scheme: dark)').matches
}

// 检测移动端 (使用媒体查询，比 innerWidth 更高效)
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}

// --- 核心类 ---

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

class ParticleEffect {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  particles: Particle[] = []
  mouse = { x: null as number | null, y: null as number | null }
  animationFrame: number | null = null
  isRunning = false
  isDark = false
  dpr = 1 // 设备像素比

  // 事件处理引用
  private resizeHandler: (() => void) | null = null
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null
  private mouseOutHandler: (() => void) | null = null
  private visibilityHandler: (() => void) | null = null

  config = {
    // 基础密度：每多少平方像素分配一个粒子 (越大粒子越少)
    areaDensity: 8000, 
    maxParticles: 150, // 限制最大数量，防止超大屏卡顿
    particleSpeed: 0.8, //稍微降低速度，看起来更优雅
    lineMaxDistance: 110,
    mouseRadius: 160,
    maxConnections: 5,
  }

  colors = ['#4CAF50', '#2196F3', '#E91E63', '#FFC107']
  lineRgbaColor = 'rgba(204, 204, 204, 0.6)'

  constructor(canvas: HTMLCanvasElement, isDark = false) {
    this.canvas = canvas
    // 获取 DPR，确保高清屏清晰度
    this.dpr = window.devicePixelRatio || 1
    const ctx = canvas.getContext('2d', { alpha: true }) // alpha: true 允许透明背景
    if (!ctx) throw new Error('Failed to get context')
    this.ctx = ctx
    this.isDark = isDark
    this.updateThemeColors()
    this.init()
  }

  updateThemeColors() {
    if (this.isDark) {
      this.lineRgbaColor = 'rgba(47, 79, 79, 0.6)'
      // 暗黑模式粒子颜色稍微调亮一点
      this.colors = ['#66BB6A', '#42A5F5', '#EC407A', '#FFCA28']
    } else {
      this.lineRgbaColor = 'rgba(100, 100, 100, 0.6)'
      this.colors = ['#4CAF50', '#2196F3', '#E91E63', '#FFC107']
    }
  }

  init() {
    this.handleResize() // 立即执行一次
    this.bindEvents()
  }

  bindEvents() {
    // 防抖 Resize，优化性能
    this.resizeHandler = debounce(() => this.handleResize(), 200)
    
    this.mouseMoveHandler = (e: MouseEvent) => {
      // 鼠标坐标需要根据 canvas 实际显示大小映射（虽然这里全屏不需要，但保留逻辑是个好习惯）
      this.mouse.x = e.clientX * this.dpr
      this.mouse.y = e.clientY * this.dpr
    }
    
    this.mouseOutHandler = () => {
      this.mouse.x = null
      this.mouse.y = null
    }

    // 页面不可见时暂停动画，节省电量
    this.visibilityHandler = () => {
      if (document.hidden) {
        this.stopAnimation()
      } else {
        this.startAnimation()
      }
    }

    window.addEventListener('resize', this.resizeHandler!)
    window.addEventListener('mousemove', this.mouseMoveHandler!)
    window.addEventListener('mouseout', this.mouseOutHandler!)
    document.addEventListener('visibilitychange', this.visibilityHandler!)
  }

  unbindEvents() {
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler)
    if (this.mouseMoveHandler) window.removeEventListener('mousemove', this.mouseMoveHandler)
    if (this.mouseOutHandler) window.removeEventListener('mouseout', this.mouseOutHandler)
    if (this.visibilityHandler) document.removeEventListener('visibilitychange', this.visibilityHandler)
  }

  handleResize() {
    // 移动端策略：直接停止并清空，不运行动画
    if (isMobileDevice()) {
      this.stopAnimation()
      this.particles = []
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      return
    }

    // 处理 Retina 屏幕
    const width = window.innerWidth
    const height = window.innerHeight
    
    // 设置 Canvas 的物理像素大小
    this.canvas.width = width * this.dpr
    this.canvas.height = height * this.dpr
    
    // 缩放 Canvas 上下文，使得绘图操作可以使用逻辑像素单位 (或者像这里一样，直接放大所有坐标)
    // 这里我们选择直接放大坐标系逻辑，保证清晰度
    // 注意：下面的 createParticles 会基于 width * dpr 来生成位置
    
    this.createParticles()
    this.startAnimation()
  }

  createParticles() {
    this.particles = []
    const width = this.canvas.width
    const height = this.canvas.height

    // 基于面积计算粒子数量，而不是单看宽度
    // 这样 4K 屏和 1080P 屏的密度感是一致的
    const area = width * height
    let particleCount = Math.floor(area / (this.config.areaDensity * this.dpr)) // 根据DPR调整密度
    
    // 限制最大/最小数量
    particleCount = Math.min(particleCount, this.config.maxParticles)
    particleCount = Math.max(particleCount, 30) 

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * this.config.particleSpeed * this.dpr, // 速度也需要适配DPR
        vy: (Math.random() - 0.5) * this.config.particleSpeed * this.dpr,
        radius: (Math.random() * 2 + 1) * this.dpr, // 半径适配DPR
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
      })
    }
  }

  startAnimation() {
    if (!this.isRunning && !isMobileDevice()) {
      this.isRunning = true
      this.animate()
    }
  }

  stopAnimation() {
    this.isRunning = false
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  }

  animate = () => {
    if (!this.isRunning) return

    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const pLength = this.particles.length
    // 根据DPR调整连线距离判断标准
    const connectDist = this.config.lineMaxDistance * this.dpr
    const mouseDist = this.config.mouseRadius * this.dpr

    for (let i = 0; i < pLength; i++) {
      const p1 = this.particles[i]
      
      // 更新位置
      p1.x += p1.vx
      p1.y += p1.vy

      // 边界反弹
      if (p1.x < 0 || p1.x > this.canvas.width) p1.vx *= -1
      if (p1.y < 0 || p1.y > this.canvas.height) p1.vy *= -1

      // 绘制粒子
      this.ctx.beginPath()
      this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
      this.ctx.fillStyle = p1.color
      this.ctx.fill()

      // 连线逻辑
      let connections = 0
      for (let j = i + 1; j < pLength; j++) {
        if (connections >= this.config.maxConnections) break
        
        const p2 = this.particles[j]
        // 使用勾股定理平方比较，避免开方运算，提升性能 (dx*dx + dy*dy < dist*dist)
        const dx = p2.x - p1.x
        const dy = p2.y - p1.y
        const distSq = dx * dx + dy * dy
        
        if (distSq < connectDist * connectDist) {
          this.ctx.strokeStyle = this.lineRgbaColor
          this.ctx.lineWidth = 1 * this.dpr // 线宽也适配DPR
          this.ctx.beginPath()
          this.ctx.moveTo(p1.x, p1.y)
          this.ctx.lineTo(p2.x, p2.y)
          this.ctx.stroke()
          connections++
        }
      }

      // 鼠标互动
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p1.x
        const dy = this.mouse.y - p1.y
        const distSq = dx * dx + dy * dy
        
        if (distSq < mouseDist * mouseDist) {
           // 靠近鼠标时，线条稍微明显一点
          this.ctx.strokeStyle = this.lineRgbaColor
          this.ctx.lineWidth = 1.2 * this.dpr
          this.ctx.beginPath()
          this.ctx.moveTo(p1.x, p1.y)
          this.ctx.lineTo(this.mouse.x, this.mouse.y)
          this.ctx.stroke()
        }
      }
    }

    this.animationFrame = requestAnimationFrame(this.animate)
  }

  destroy() {
    this.stopAnimation()
    this.unbindEvents()
    // 释放 Canvas 引用，帮助 GC
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles = []
  }
}

// --- Vue 逻辑 ---

const initParticles = () => {
  if (!canvasRef.value) return
  
  if (particleEffect) {
    particleEffect.destroy()
    particleEffect = null
  }

  // 移动端直接不初始化，节省资源
  if (isMobileDevice()) {
    shouldShowParticles.value = false
    return
  }

  isDarkMode.value = detectDarkMode()
  particleEffect = new ParticleEffect(canvasRef.value, isDarkMode.value)
}

const observeThemeChange = () => {
  if (typeof document === 'undefined') return

  const observer = new MutationObserver(() => {
    const newDarkMode = detectDarkMode()
    // 仅当主题真正变化且效果正在运行时才更新
    if (newDarkMode !== isDarkMode.value && particleEffect) {
      isDarkMode.value = newDarkMode
      particleEffect.isDark = newDarkMode
      particleEffect.updateThemeColors() // 不需要完全重建实例，只需更新颜色配置
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  return () => observer.disconnect()
}

// 监听配置变化
watch(() => pageData.value, (newVal: any) => {
  const disableParticle = newVal?.disableParticle || false
  if (disableParticle || isMobileDevice()) {
    shouldShowParticles.value = false
    particleEffect?.destroy()
    particleEffect = null
  } else {
    shouldShowParticles.value = true
    nextTick(() => {
       if (!particleEffect && canvasRef.value) initParticles()
    })
  }
}, { deep: true, immediate: true })

onMounted(() => {
  // 初始化时如果是移动端，直接标记不显示
  if (isMobileDevice()) {
    shouldShowParticles.value = false
    return
  }
  
  // 挂载 Canvas
  nextTick(() => {
    if (shouldShowParticles.value) initParticles()
  })

  const stopObserver = observeThemeChange()
  
  // 监听系统主题
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleSysTheme = (e: MediaQueryListEvent) => {
    if (particleEffect) {
       particleEffect.isDark = e.matches
       particleEffect.updateThemeColors()
    }
  }
  mediaQuery.addEventListener('change', handleSysTheme)

  // 返回清理函数
  return () => {
    stopObserver && stopObserver()
    mediaQuery.removeEventListener('change', handleSysTheme)
  }
})

onUnmounted(() => {
  particleEffect?.destroy()
  particleEffect = null
})
</script>

<template>
  <canvas
    v-show="shouldShowParticles"
    ref="canvasRef"
    class="particle-canvas"
  />
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  /* 确保 Canvas 样式大小占满屏幕，物理像素由 JS 控制 */
  width: 100vw; 
  height: 100vh;
  pointer-events: none;
  /* 启用硬件加速 */
  will-change: transform; 
  transform: translateZ(0);
}

@media (max-width: 768px) {
  .particle-canvas {
    display: none; /* 双重保险，确保移动端不渲染 */
  }
}

@media print {
  .particle-canvas {
    display: none;
  }
}
</style>