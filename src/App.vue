<script setup lang="ts">
import ParticleBackground from './components/ParticleBackground.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
    <!-- 粒子背景效果 -->
    <ParticleBackground />
    
    <!-- 顶部导航栏 -->
    <AppHeader />
    
    <!-- 主要内容区域 -->
    <div class="max-w-6xl mx-auto px-4 relative z-10 pt-20">
      <main class="backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-lg">
        <router-view />
      </main>
      
      <footer class="py-6 mt-12 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-700">
        <p>
          <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style="color: inherit;">CC BY-NC-SA 4.0</a>
          2025-PRESENT © Ethan Wang
        </p>
      </footer>
    </div>
  </div>
</template>
