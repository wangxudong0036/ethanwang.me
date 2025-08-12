<script setup lang="ts">
import { useCounterStore } from '../stores/counter'

// 使用Pinia存储
const counterStore = useCounterStore()
</script>

<template>
  <div class="container mx-auto py-8">
    <!-- Pinia 计数器示例 -->
    <section class="card max-w-2xl mx-auto mb-12">
      <h2 class="text-2xl font-bold mb-4 text-secondary after:content-[''] after:block after:w-12 after:h-1 after:bg-primary after:mt-2">Pinia 状态管理示例</h2>
      <div class="text-center py-4">
        <p class="text-xl font-bold mb-4">当前计数: {{ counterStore.count }}</p>
        <div class="flex justify-center gap-4">
          <button @click="counterStore.increment()" class="btn bg-success text-white hover:bg-success/90">增加</button>
          <button @click="counterStore.decrement()" class="btn bg-danger text-white hover:bg-danger/90">减少</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  line-height: 1.6;

  /* Pinia计数器样式 */
  .pinia-demo {
    margin-bottom: 3rem;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    
    .counter-container {
      text-align: center;
      
      .counter-value {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      
      .counter-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        
        .counter-button {
          padding: 0.5rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          
          &:hover {
            opacity: 0.9;
            transform: translateY(-2px);
          }
          
          &.increment {
            background-color: #4caf50;
            color: white;
          }
          
          &.decrement {
            background-color: #f44336;
            color: white;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
}
</style> 