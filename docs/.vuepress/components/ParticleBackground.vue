<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'

const pageData = usePageFrontmatter()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const shouldShowParticles = ref(true)
const isDarkMode = ref(false)
let particleEffect: ParticleEffect | null = null

const detectDarkMode = () => {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute('data-theme') === 'dark' ||
         window.matchMedia('(prefers-color-scheme: dark)').matches
}

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
  isRunning = true
  isDark = false
  private resizeHandler: (() => void) | null = null
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null
  private mouseOutHandler: (() => void) | null = null

  config = {
    baseDensity: 35,
    maxParticles: 150,
    particleSpeed: 0.4,
    lineMaxDistance: 120,
    lineOpacity: 0.4,
    mouseRadius: 180,
    maxConnections: 4,
    mobileFactor: 1.8,
  }

  colors = ['#4CAF50', '#2196F3', '#E91E63', '#FFC107']
  lineColor = '#FFFFFF'
  bgFillStyle = 'rgba(255, 255, 255, 0.02)'

  constructor(canvas: HTMLCanvasElement, isDark = false) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.isDark = isDark
    this.updateThemeColors()
    this.init()
  }

  updateThemeColors() {
    if (this.isDark) {
      this.lineColor = '#CCCCCC'
      this.bgFillStyle = 'rgba(0, 0, 0, 0.08)'
    } else {
      this.lineColor = '#999999'
      this.bgFillStyle = 'rgba(255, 255, 255, 0.02)'
    }
  }

  init() {
    this.resizeCanvas()
    this.createParticles()
    this.bindEvents()
    this.animate()
  }

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

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.createParticles(true)
  }

  createParticles(reset = false) {
    if (reset) this.particles = []

    let particleCount = Math.floor(window.innerWidth / this.config.baseDensity)
    particleCount = Math.min(particleCount, this.config.maxParticles)

    if (window.innerWidth < 768) {
      particleCount = Math.floor(particleCount / this.config.mobileFactor)
    }

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

  drawParticle(particle: Particle) {
    this.ctx.beginPath()
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = particle.color
    this.ctx.fill()
  }

  updateParticle(particle: Particle) {
    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1

    particle.x += particle.vx
    particle.y += particle.vy
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    const rgb = this.isDark ? '204, 204, 204' : '255, 255, 255'
    this.ctx.strokeStyle = `rgba(${rgb}, ${this.config.lineOpacity})`
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  getDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }

  animate = () => {
    if (!this.isRunning) return

    this.ctx.fillStyle = this.bgFillStyle
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = 0; i < this.particles.length; i++) {
      this.updateParticle(this.particles[i])
      this.drawParticle(this.particles[i])

      let connections = 0
      for (let j = i + 1; j < this.particles.length; j++) {
        const distance = this.getDistance(
          this.particles[i].x,
          this.particles[i].y,
          this.particles[j].x,
          this.particles[j].y
        )

        if (distance < this.config.lineMaxDistance && connections < this.config.maxConnections) {
          this.drawLine(
            this.particles[i].x,
            this.particles[i].y,
            this.particles[j].x,
            this.particles[j].y
          )
          connections++
        }
      }

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

    this.animationFrame = requestAnimationFrame(this.animate)
  }

  destroy() {
    this.isRunning = false
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }

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

const initParticles = () => {
  if (!canvasRef.value) return

  if (particleEffect) {
    particleEffect.destroy()
    particleEffect = null
  }

  isDarkMode.value = detectDarkMode()
  particleEffect = new ParticleEffect(canvasRef.value, isDarkMode.value)
}

const observeThemeChange = () => {
  if (typeof document === 'undefined') return

  const html = document.documentElement
  const observer = new MutationObserver(() => {
    const newDarkMode = detectDarkMode()
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

const handleMediaQueryChange = (e: MediaQueryListEvent) => {
  if (e.matches !== isDarkMode.value && shouldShowParticles.value) {
    initParticles()
  }
}

const updateParticleVisibility = () => {
  const frontmatterData = pageData.value as any
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

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleMediaQueryChange)

  return () => {
    if (disconnectObserver) disconnectObserver()
    mediaQuery.removeEventListener('change', handleMediaQueryChange)
  }
})

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
}
</style>
