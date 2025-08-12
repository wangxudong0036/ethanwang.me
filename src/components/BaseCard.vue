<script setup lang="ts">
// 定义组件属性
defineProps<{
  title?: string;         // 卡片标题
  subtitle?: string;      // 卡片副标题
  bordered?: boolean;     // 是否有边框
  withShadow?: boolean;   // 是否有阴影
  color?: string;         // 颜色（primary, secondary, success, danger, warning, info）
}>()
</script>

<template>
  <div 
    class="p-4 rounded-lg" 
    :class="[
      { 'border': bordered !== false },
      { 'shadow-md': withShadow },
      color ? `bg-${color}/10` : 'bg-white dark:bg-dark-800'
    ]"
  >
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-semibold" :class="color ? `text-${color}` : 'text-secondary'">{{ title }}</h3>
      <p v-if="subtitle" class="text-gray-600 dark:text-gray-400 mt-1 text-sm">{{ subtitle }}</p>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template> 