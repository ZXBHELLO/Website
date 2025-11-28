<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'

// 获取页面frontmatter数据，用于控制粒子效果的显示
const pageData = usePageFrontmatter()
// canvas元素的引用
const canvasRef = ref<HTMLCanvasElement | null>(null)
// 控制是否显示粒子效果的响应式变量
const shouldShowParticles = ref(true)
// 控制是否为暗黑模式的响应式变量
const isDarkMode = ref(false)
// 粒子效果实例
let particleEffect: ParticleEffect | null = null

/**
 * 检测当前是否为暗黑模式
 * @returns boolean 表示是否为暗黑模式
 */
const detectDarkMode = () => {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute('data-theme') === 'dark' ||
         window.matchMedia('(prefers-color-scheme: dark)').matches
}

// 定义粒子接口，描述单个粒子的属性
interface Particle {
  x: number        // 粒子x坐标
  y: number        // 粒子y坐标
  vx: number       // 粒子x轴速度
  vy: number       // 粒子y轴速度
  radius: number   // 粒子半径
  color: string    // 粒子颜色
}

// 粒子效果主类，负责管理所有粒子的创建、更新和渲染
class ParticleEffect {
  canvas: HTMLCanvasElement                    // canvas元素
  ctx: CanvasRenderingContext2D               // canvas绘图上下文
  particles: Particle[] = []                  // 粒子数组
  mouse = { x: null as number | null, y: null as number | null }  // 鼠标位置
  animationFrame: number | null = null        // 动画帧引用
  isRunning = true                            // 动画运行状态
  isDark = false                              // 是否为暗黑模式
  private resizeHandler: (() => void) | null = null      // 窗口大小变化处理函数
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null  // 鼠标移动处理函数
  private mouseOutHandler: (() => void) | null = null    // 鼠标离开窗口处理函数

  // 粒子系统配置参数
  config = {
    baseDensity: 45,          // 基础粒子密度
    maxParticles: 100,        // 最大粒子数量
    particleSpeed: 0.3,       // 粒子移动速度
    lineMaxDistance: 100,     // 粒子间连线的最大距离
    lineOpacity: 0.3,         // 连线透明度
    mouseRadius: 150,         // 鼠标影响半径
    maxConnections: 3,        // 单个粒子最多连接数
  }

  // 粒子颜色数组
  colors = ['#4CAF50', '#2196F3', '#E91E63', '#FFC107']
  // 连线颜色
  lineColor = '#CCCCCC'
  // 背景填充样式
  bgFillStyle = 'rgba(255, 255, 255, 0.02)'

  /**
   * 构造函数
   * @param canvas Canvas元素
   * @param isDark 是否为暗黑模式
   */
  constructor(canvas: HTMLCanvasElement, isDark = false) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.isDark = isDark
    this.updateThemeColors()
    this.init()
  }

  /**
   * 根据主题更新颜色配置
   */
  updateThemeColors() {
    if (this.isDark) {
      this.lineColor = '#2F4F4F'
      this.bgFillStyle = 'rgba(0, 0, 0, 0.08)'
    } else {
      this.lineColor = '#C0C0C0'
      this.bgFillStyle = 'rgba(255, 255, 255, 0.02)'
    }
  }

  /**
   * 初始化粒子效果
   */
  init() {
    this.resizeCanvas()
    this.createParticles()
    this.bindEvents()
    this.animate()
  }

  /**
   * 绑定事件监听器
   */
  bindEvents() {
    this.resizeHandler = () => this.resizeCanvas()
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    }
    this.mouseOutHandler = () => {
      this.mouse.x = null
      this.mouse.y = null
    }

    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('mousemove', this.mouseMoveHandler)
    window.addEventListener('mouseout', this.mouseOutHandler)
  }

  /**
   * 调整canvas大小以适应窗口
   */
  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.createParticles(true)
    
    // 如果是移动设备，隐藏canvas
    if (window.innerWidth < 768) {
      this.canvas.style.display = 'none'
    } else {
      this.canvas.style.display = 'block'
    }
  }

  /**
   * 创建粒子
   * @param reset 是否重置粒子数组
   */
  createParticles(reset = false) {
    if (reset) this.particles = []

    const isMobile = window.innerWidth < 768
    
    // 在移动设备上完全禁用粒子效果
    if (isMobile) {
      this.particles = []
      return
    }

    // 根据窗口宽度和设备类型计算粒子数量
    let baseDensity = this.config.baseDensity
    let maxParticles = this.config.maxParticles

    let particleCount = Math.floor(window.innerWidth / baseDensity)
    particleCount = Math.min(particleCount, maxParticles)

    // 创建指定数量的粒子
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        radius: Math.random() * 1.5 + 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
      })
    }
  }

  /**
   * 绘制单个粒子
   * @param particle 粒子对象
   */
  drawParticle(particle: Particle) {
    this.ctx.beginPath()
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = particle.color
    this.ctx.fill()
  }

  /**
   * 更新粒子位置
   * @param particle 粒子对象
   */
  updateParticle(particle: Particle) {
    // 碰撞边界检测，遇到边界则反向运动
    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1

    // 更新粒子位置
    particle.x += particle.vx
    particle.y += particle.vy
  }

  /**
   * 绘制连接线
   * @param x1 起点x坐标
   * @param y1 起点y坐标
   * @param x2 终点x坐标
   * @param y2 终点y坐标
   */
  drawLine(x1: number, y1: number, x2: number, y2: number) {
    // 将十六进制颜色转换为 RGB
    const hex = this.lineColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`
    this.ctx.lineWidth = 1.2
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  /**
   * 计算两点间距离
   * @param x1 点1的x坐标
   * @param y1 点1的y坐标
   * @param x2 点2的x坐标
   * @param y2 点2的y坐标
   * @returns 两点间距离
   */
  getDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }

  /**
   * 动画循环函数
   */
  animate = () => {
    if (!this.isRunning) return

    // 清空 canvas，移除拖影效果
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // 遍历所有粒子
    for (let i = 0; i < this.particles.length; i++) {
      // 更新并绘制粒子
      this.updateParticle(this.particles[i])
      this.drawParticle(this.particles[i])

      // 连接附近的粒子
      let connections = 0
      for (let j = i + 1; j < this.particles.length; j++) {
        // 优化：提前检查是否已达到最大连接数
        if (connections >= this.config.maxConnections) break;
        
        const distance = this.getDistance(
          this.particles[i].x,
          this.particles[i].y,
          this.particles[j].x,
          this.particles[j].y
        )

        // 如果距离小于阈值且未达到最大连接数，则绘制连线
        if (distance < this.config.lineMaxDistance) {
          this.drawLine(
            this.particles[i].x,
            this.particles[i].y,
            this.particles[j].x,
            this.particles[j].y
          )
          connections++
        }
      }

      // 如果鼠标在canvas上，连接靠近鼠标的粒子
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mouseDistance = this.getDistance(
          this.particles[i].x,
          this.particles[i].y,
          this.mouse.x,
          this.mouse.y
        )
        if (mouseDistance < this.config.mouseRadius) {
          this.drawLine(
            this.particles[i].x,
            this.particles[i].y,
            this.mouse.x,
            this.mouse.y
          )
        }
      }
    }

    // 使用节流优化动画性能
    if (this.isRunning) {
      this.animationFrame = requestAnimationFrame(this.animate)
    }
  }

  /**
   * 销毁粒子效果，清理资源
   */
  destroy() {
    this.isRunning = false
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }

    // 移除事件监听器
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler)
    }
    if (this.mouseOutHandler) {
      window.removeEventListener('mouseout', this.mouseOutHandler)
    }
  }
}

/**
 * 初始化粒子效果
 */
const initParticles = () => {
  if (!canvasRef.value) return

  // 如果已存在粒子效果实例，先销毁
  if (particleEffect) {
    particleEffect.destroy()
    particleEffect = null
  }

  // 检测暗黑模式并创建新的粒子效果实例
  isDarkMode.value = detectDarkMode()
  particleEffect = new ParticleEffect(canvasRef.value, isDarkMode.value)
}

/**
 * 监听主题变化
 * @returns 解除监听的函数
 */
const observeThemeChange = () => {
  if (typeof document === 'undefined') return

  const html = document.documentElement
  // 创建MutationObserver监听data-theme属性变化
  const observer = new MutationObserver(() => {
    const newDarkMode = detectDarkMode()
    // 主题变化时重新初始化粒子效果
    if (newDarkMode !== isDarkMode.value && shouldShowParticles.value) {
      initParticles()
    }
  })

  observer.observe(html, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  return () => observer.disconnect()
}

/**
 * 处理媒体查询变化（系统暗黑模式切换）
 * @param e MediaQueryListEvent事件对象
 */
const handleMediaQueryChange = (e: MediaQueryListEvent) => {
  if (e.matches !== isDarkMode.value && shouldShowParticles.value) {
    initParticles()
  }
}

/**
 * 根据页面frontmatter更新粒子可见性
 */
const updateParticleVisibility = () => {
  const frontmatterData = pageData.value as any
  // 从frontmatter中读取disableParticle配置
  const disableParticle = frontmatterData?.disableParticle || false

  if (disableParticle) {
    shouldShowParticles.value = false
    if (particleEffect) {
      particleEffect.destroy()
      particleEffect = null
    }
  } else {
    shouldShowParticles.value = true
  }
}

// 监听页面frontmatter变化
watch(() => pageData.value, () => {
  updateParticleVisibility()
}, { deep: true })

// 当 shouldShowParticles 变为 true 时，在 canvas 挂载后初始化粒子
watch(() => shouldShowParticles.value, (newVal) => {
  if (newVal) {
    nextTick(() => {
      if (canvasRef.value) {
        initParticles()
      }
    })
  }
})

// 组件挂载时执行
onMounted(() => {
  // 初始化时检查页面配置
  const frontmatterData = pageData.value as any
  const disableParticle = frontmatterData?.disableParticle || false

  if (disableParticle) {
    shouldShowParticles.value = false
  } else {
    shouldShowParticles.value = true
    // onMounted 时 canvas 已经存在，直接初始化
    if (canvasRef.value) {
      initParticles()
    }
  }

  const disconnectObserver = observeThemeChange()

  // 监听系统暗黑模式变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleMediaQueryChange)

  // 返回清理函数
  return () => {
    if (disconnectObserver) disconnectObserver()
    mediaQuery.removeEventListener('change', handleMediaQueryChange)
  }
})

// 组件卸载时执行清理
onUnmounted(() => {
  if (particleEffect) {
    particleEffect.destroy()
    particleEffect = null
  }
  shouldShowParticles.value = false
})
</script>

<template>
  <canvas
    v-if="shouldShowParticles"
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
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-drag: none;
}

@media print {
  .particle-canvas {
    display: none;
  }
}

</style>