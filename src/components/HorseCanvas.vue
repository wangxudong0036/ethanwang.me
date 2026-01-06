<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// 定义组件属性
interface Props {
  width?: number
  height?: number
  strokeColor?: string
  fillColor?: string
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 600,
  height: 500,
  strokeColor: '#2c3e50',
  fillColor: '#34495e',
  autoResize: true
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null

// 绘制马的函数
const drawHorse = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // 清空画布
  ctx.clearRect(0, 0, width, height)
  
  // 设置缩放比例，使马适应画布
  const scale = Math.min(width, height) / 400
  ctx.save()
  ctx.scale(scale, scale)
  
  // 设置绘制样式
  ctx.strokeStyle = props.strokeColor
  ctx.fillStyle = props.fillColor
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  
  // 居中绘制
  const centerX = width / (2 * scale)
  const centerY = height / (2 * scale)
  const offsetX = centerX - 200
  const offsetY = centerY - 200
  
  ctx.translate(offsetX, offsetY)
  
  // 绘制马的头部
  ctx.beginPath()
  // 头部轮廓
  ctx.moveTo(120, 80)
  ctx.quadraticCurveTo(140, 60, 160, 70)
  ctx.quadraticCurveTo(180, 75, 190, 90)
  ctx.quadraticCurveTo(195, 100, 190, 110)
  ctx.quadraticCurveTo(185, 120, 175, 125)
  ctx.quadraticCurveTo(165, 130, 150, 125)
  ctx.quadraticCurveTo(135, 120, 125, 110)
  ctx.quadraticCurveTo(115, 100, 120, 90)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  // 绘制耳朵
  ctx.beginPath()
  ctx.moveTo(150, 75)
  ctx.lineTo(145, 60)
  ctx.lineTo(155, 65)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  // 绘制眼睛
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(165, 95, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(166, 95, 3, 0, Math.PI * 2)
  ctx.fill()
  
  // 绘制鼻孔
  ctx.fillStyle = props.fillColor
  ctx.beginPath()
  ctx.arc(180, 105, 3, 0, Math.PI * 2)
  ctx.fill()
  
  // 绘制颈部
  ctx.beginPath()
  ctx.moveTo(140, 120)
  ctx.quadraticCurveTo(130, 140, 120, 160)
  ctx.quadraticCurveTo(110, 180, 100, 200)
  ctx.lineWidth = 8
  ctx.stroke()
  
  // 绘制身体
  ctx.beginPath()
  ctx.moveTo(100, 200)
  ctx.quadraticCurveTo(90, 220, 85, 240)
  ctx.quadraticCurveTo(80, 260, 90, 280)
  ctx.quadraticCurveTo(100, 300, 120, 310)
  ctx.quadraticCurveTo(140, 315, 160, 310)
  ctx.quadraticCurveTo(180, 305, 190, 290)
  ctx.quadraticCurveTo(195, 275, 190, 260)
  ctx.quadraticCurveTo(185, 245, 175, 235)
  ctx.quadraticCurveTo(165, 225, 150, 220)
  ctx.quadraticCurveTo(135, 215, 120, 220)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  // 绘制前腿
  ctx.lineWidth = 6
  // 左前腿
  ctx.beginPath()
  ctx.moveTo(120, 220)
  ctx.lineTo(115, 280)
  ctx.lineTo(110, 320)
  ctx.stroke()
  // 右前腿
  ctx.beginPath()
  ctx.moveTo(150, 220)
  ctx.lineTo(145, 280)
  ctx.lineTo(140, 320)
  ctx.stroke()
  
  // 绘制后腿
  // 左后腿
  ctx.beginPath()
  ctx.moveTo(160, 310)
  ctx.lineTo(155, 330)
  ctx.lineTo(150, 360)
  ctx.stroke()
  // 右后腿
  ctx.beginPath()
  ctx.moveTo(190, 290)
  ctx.lineTo(185, 310)
  ctx.lineTo(180, 340)
  ctx.stroke()
  
  // 绘制尾巴
  ctx.beginPath()
  ctx.moveTo(190, 260)
  ctx.quadraticCurveTo(210, 250, 220, 240)
  ctx.quadraticCurveTo(215, 235, 210, 230)
  ctx.quadraticCurveTo(205, 225, 200, 230)
  ctx.quadraticCurveTo(195, 235, 190, 240)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  // 绘制鬃毛
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(140, 120)
  ctx.quadraticCurveTo(135, 100, 130, 90)
  ctx.quadraticCurveTo(125, 85, 120, 90)
  ctx.quadraticCurveTo(115, 95, 120, 100)
  ctx.quadraticCurveTo(125, 105, 130, 110)
  ctx.quadraticCurveTo(135, 115, 140, 120)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  ctx.restore()
}

// 初始化画布
const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // 设置画布尺寸
  if (props.autoResize) {
    const container = canvas.parentElement
    if (container) {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width || props.width
      canvas.height = Math.min(rect.height || props.height, props.height)
    } else {
      canvas.width = props.width
      canvas.height = props.height
    }
  } else {
    canvas.width = props.width
    canvas.height = props.height
  }
  
  // 绘制马
  drawHorse(ctx, canvas.width, canvas.height)
}

// 处理窗口大小变化
const handleResize = () => {
  if (props.autoResize) {
    initCanvas()
  }
}

// 监听属性变化
watch(() => [props.width, props.height, props.strokeColor, props.fillColor], () => {
  initCanvas()
})

onMounted(() => {
  initCanvas()
  if (props.autoResize) {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (props.autoResize) {
    window.removeEventListener('resize', handleResize)
  }
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="horse-canvas-container">
    <canvas
      ref="canvasRef"
      class="horse-canvas"
    ></canvas>
  </div>
</template>

<style lang="scss" scoped>
.horse-canvas-container {
  width: 100%;
  height: 100%;
  
  .horse-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>

