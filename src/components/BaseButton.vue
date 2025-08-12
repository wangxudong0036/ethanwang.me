<script setup lang="ts">
// 定义组件属性
defineProps<{
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // 按钮类型
  size?: 'sm' | 'md' | 'lg';  // 按钮大小
  outline?: boolean;          // 是否为轮廓按钮
  rounded?: boolean;          // 是否为圆角按钮
  block?: boolean;            // 是否为块级按钮
  disabled?: boolean;         // 是否禁用
}>()

// 定义事件
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 点击处理
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    class="transition-all duration-200 font-medium"
    :class="[
      // 尺寸类
      size === 'sm' ? 'px-3 py-1 text-sm' : 
      size === 'lg' ? 'px-6 py-3 text-lg' : 
      'px-4 py-2 text-base',
      
      // 圆角类
      rounded ? 'rounded-full' : 'rounded-lg',
      
      // 块级按钮
      block ? 'w-full' : '',
      
      // 禁用状态
      disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md hover:-translate-y-1',
      
      // 类型样式
      outline
        ? `border border-${type || 'primary'} text-${type || 'primary'} bg-transparent hover:bg-${type || 'primary'}/10`
        : type === 'primary' ? 'bg-primary text-white hover:bg-primary/90' :
          type === 'secondary' ? 'bg-secondary text-white hover:bg-secondary/90' :
          type === 'success' ? 'bg-success text-white hover:bg-success/90' :
          type === 'danger' ? 'bg-danger text-white hover:bg-danger/90' :
          type === 'warning' ? 'bg-warning text-white hover:bg-warning/90' :
          type === 'info' ? 'bg-info text-white hover:bg-info/90' :
          type === 'light' ? 'bg-light text-gray-800 hover:bg-light/90' :
          type === 'dark' ? 'bg-dark text-white hover:bg-dark/90' :
          'bg-primary text-white hover:bg-primary/90'
    ]"
  >
    <slot></slot>
  </button>
</template> 