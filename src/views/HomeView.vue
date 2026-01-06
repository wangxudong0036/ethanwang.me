<script setup lang="ts">
import HorseCanvas from '../components/HorseCanvas.vue'
</script>

<template>
  <div class="container mx-auto py-8">
    <!-- Canvas 画马 -->
    <section class="card max-w-4xl mx-auto mb-12">
      <h2 class="text-2xl font-bold mb-4 text-secondary text-center after:content-[''] after:block after:w-12 after:h-1 after:bg-primary after:mt-2 after:mx-auto">
        2026 马年
      </h2>
      <div class="flex justify-center items-center p-4">
        <div class="canvas-container">
          <HorseCanvas />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.canvas-container {
  width: 100%;
  max-width: 600px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  .horse-canvas {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    background: transparent;
  }
}

.dark .canvas-container {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

@media (max-width: 768px) {
  .canvas-container {
    padding: 10px;
  }
}
</style> 