<script setup lang="ts">
// 不再直接导入HomeView组件，而是通过路由加载
</script>

<template>
  <div class="min-h-screen bg-light dark:bg-dark">
    <div class="max-w-6xl mx-auto px-4">
      <header class="py-6">
        <nav class="flex items-center justify-center space-x-6">
          <router-link to="/" class="text-gray-700 dark:text-gray-200 font-medium hover:text-primary dark:hover:text-primary transition-colors">首页</router-link>
          <span class="text-gray-400">|</span>
          <router-link to="/about" class="text-gray-700 dark:text-gray-200 font-medium hover:text-primary dark:hover:text-primary transition-colors">关于</router-link>
          <span class="text-gray-400">|</span>
          <router-link to="/resume" class="text-gray-700 dark:text-gray-200 font-medium hover:text-primary dark:hover:text-primary transition-colors">简历</router-link>
        </nav>
      </header>
      
      <main>
        <router-view />
      </main>
      
      <footer class="py-6 mt-12 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-700">
        <p>使用 Vue 3 + TypeScript + Vite + Vue Router + Pinia + UnoCSS 构建</p>
      </footer>
    </div>
  </div>
</template>
