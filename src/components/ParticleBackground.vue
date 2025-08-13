<template>
  <div class="particle-background">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number
let particles: Particle[] = []
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

// 粒子配置
const config = {
  particleCount: 50,
  maxSpeed: 1,
  minSize: 2,
  maxSize: 4,
  colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'],
  connectionDistance: 150,
  connectionOpacity: 0.2
}

// 创建粒子
function createParticle(): Particle {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * config.maxSpeed,
    vy: (Math.random() - 0.5) * config.maxSpeed,
    size: Math.random() * (config.maxSize - config.minSize) + config.minSize,
    opacity: Math.random() * 0.6 + 0.4,
    color: config.colors[Math.floor(Math.random() * config.colors.length)]
  }
}

// 初始化粒子
function initParticles() {
  particles = []
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(createParticle())
  }
}

// 更新粒子位置
function updateParticles() {
  particles.forEach(particle => {
    particle.x += particle.vx
    particle.y += particle.vy

    // 边界检测
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx = -particle.vx
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy = -particle.vy
    }

    // 保持粒子在画布内
    particle.x = Math.max(0, Math.min(canvas.width, particle.x))
    particle.y = Math.max(0, Math.min(canvas.height, particle.y))
  })
}

// 绘制粒子
function drawParticles() {
  if (!ctx) return

  particles.forEach((particle) => {
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = particle.color
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })
}

// 绘制连接线
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < config.connectionDistance) {
        const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity
        ctx.save()
        ctx.globalAlpha = opacity
        ctx.strokeStyle = '#6366f1'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
        ctx.restore()
      }
    }
  }
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  updateParticles()
  drawConnections()
  drawParticles()
  
  animationId = requestAnimationFrame(animate)
}

// 调整画布大小
function resizeCanvas() {
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  console.log('Canvas resized to:', canvas.width, canvas.height)
  
  // 重新初始化粒子以适应新尺寸
  if (particles.length === 0) {
    initParticles()
  }
}

// 鼠标交互
function handleMouseMove(event: MouseEvent) {
  const mouseX = event.clientX
  const mouseY = event.clientY
  
  particles.forEach(particle => {
    const dx = mouseX - particle.x
    const dy = mouseY - particle.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 100) {
      const force = (100 - distance) / 100
      particle.vx += (dx / distance) * force * 0.01
      particle.vy += (dy / distance) * force * 0.01
    }
  })
}

onMounted(async () => {
  console.log('ParticleBackground mounted')
  await nextTick()
  
  if (!canvasRef.value) {
    console.error('Canvas ref not found')
    return
  }
  
  canvas = canvasRef.value
  const context = canvas.getContext('2d')
  if (!context) {
    console.error('Canvas context not found')
    return
  }
  
  ctx = context
  
  // 设置canvas尺寸
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  console.log('Canvas initialized:', canvas.width, canvas.height)
  
  initParticles()
  console.log('Particles initialized:', particles.length)
  animate()
  
  // 添加事件监听器
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.particle-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>