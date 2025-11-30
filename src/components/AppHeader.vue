<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// 初始化暗色模式状态
const isDarkMode = ref(false)

// 在组件挂载时初始化设置
onMounted(() => {
  // 检查本地存储中的主题设置
  const savedTheme = localStorage.getItem('theme')
  
  // 检查系统偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  // 如果有保存的主题设置，使用它；否则使用系统偏好
  isDarkMode.value = savedTheme === 'dark' || (savedTheme === null && prefersDark)
  
  // 应用主题
  applyTheme()
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === null) {
      isDarkMode.value = e.matches
      applyTheme()
    }
  })
})

// 监听isDarkMode变化，应用主题
watch(isDarkMode, () => {
  applyTheme()
})

// 切换暗色/亮色模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  // 保存主题偏好到本地存储
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

// 应用主题到HTML元素
const applyTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <header class="fixed top-0 right-0 w-full py-4 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <nav class="max-w-6xl mx-auto px-4 flex items-center justify-end space-x-6">
      <router-link to="/" class="text-gray-700 dark:text-gray-200 font-medium hover:text-primary dark:hover:text-primary transition-colors">首页</router-link>
      <span class="text-gray-400">|</span>
      <router-link to="/about" class="text-gray-700 dark:text-gray-200 font-medium hover:text-primary dark:hover:text-primary transition-colors">关于</router-link>
      <span class="text-gray-400">|</span>
      <router-link to="/resume" class="text-gray-700 dark:text-gray-200 font-medium hover:text-primary dark:hover:text-primary transition-colors">简历</router-link>
      <span class="text-gray-400">|</span>
      
      <!-- 暗色/亮色主题切换按钮 -->
      <button 
        @click="toggleDarkMode"
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        :aria-label="isDarkMode ? '亮色模式' : '暗色模式'"
        :title="isDarkMode ? '亮色模式' : '暗色模式'"
      >
        <!-- 太阳图标 - 亮色模式 -->
        <svg
          v-if="isDarkMode"
          class="w-5 h-5 text-gray-700 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          />
        </svg>
        <!-- 月亮图标 - 暗色模式 -->
        <svg
          v-else
          class="w-5 h-5 text-gray-700 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </nav>
  </header>
</template>