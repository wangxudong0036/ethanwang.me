<script setup lang="ts">
import { ref, computed } from 'vue'

// 搜索关键词
const searchKeyword = ref('')

// 选中的分类
const activeCategory = ref('all')

// 所有分类
const categories = [
  { id: 'all', name: '全部', icon: '📚' },
  { id: 'layout', name: '布局', icon: '📐' },
  { id: 'spacing', name: '间距', icon: '📏' },
  { id: 'sizing', name: '尺寸', icon: '📦' },
  { id: 'colors', name: '颜色', icon: '🎨' },
  { id: 'typography', name: '字体', icon: '✍️' },
  { id: 'borders', name: '边框', icon: '🔲' },
  { id: 'effects', name: '效果', icon: '✨' },
  { id: 'transforms', name: '变换', icon: '🔄' },
  { id: 'interactivity', name: '交互', icon: '👆' },
  { id: 'shortcuts', name: '快捷方式', icon: '⚡' }
]

// 类名数据
const classGroups = {
  layout: [
    { class: 'flex', desc: '弹性布局', example: 'flex' },
    { class: 'inline-flex', desc: '行内弹性布局', example: 'inline-flex' },
    { class: 'grid', desc: '网格布局', example: 'grid' },
    { class: 'inline-grid', desc: '行内网格布局', example: 'inline-grid' },
    { class: 'block', desc: '块级元素', example: 'block' },
    { class: 'inline-block', desc: '行内块元素', example: 'inline-block' },
    { class: 'inline', desc: '行内元素', example: 'inline' },
    { class: 'hidden', desc: '隐藏元素', example: 'hidden' },
    { class: 'relative', desc: '相对定位', example: 'relative' },
    { class: 'absolute', desc: '绝对定位', example: 'absolute' },
    { class: 'fixed', desc: '固定定位', example: 'fixed' },
    { class: 'sticky', desc: '粘性定位', example: 'sticky' },
    { class: 'flex-row', desc: '横向排列', example: 'flex-row' },
    { class: 'flex-col', desc: '纵向排列', example: 'flex-col' },
    { class: 'items-center', desc: '垂直居中', example: 'items-center' },
    { class: 'justify-center', desc: '水平居中', example: 'justify-center' },
    { class: 'justify-between', desc: '两端对齐', example: 'justify-between' },
    { class: 'justify-around', desc: '环绕对齐', example: 'justify-around' },
    { class: 'justify-evenly', desc: '均匀分布', example: 'justify-evenly' },
    { class: 'items-start', desc: '顶部对齐', example: 'items-start' },
    { class: 'items-end', desc: '底部对齐', example: 'items-end' },
    { class: 'items-stretch', desc: '拉伸对齐', example: 'items-stretch' },
    { class: 'flex-wrap', desc: '允许换行', example: 'flex-wrap' },
    { class: 'flex-nowrap', desc: '不换行', example: 'flex-nowrap' },
    { class: 'flex-1', desc: '弹性增长', example: 'flex-1' },
    { class: 'flex-auto', desc: '自动弹性', example: 'flex-auto' },
    { class: 'flex-none', desc: '不弹性', example: 'flex-none' },
    { class: 'grid-cols-1', desc: '1列网格', example: 'grid-cols-1' },
    { class: 'grid-cols-2', desc: '2列网格', example: 'grid-cols-2' },
    { class: 'grid-cols-3', desc: '3列网格', example: 'grid-cols-3' },
    { class: 'grid-cols-4', desc: '4列网格', example: 'grid-cols-4' },
    { class: 'gap-2', desc: '间距2', example: 'gap-2' },
    { class: 'gap-4', desc: '间距4', example: 'gap-4' },
    { class: 'gap-8', desc: '间距8', example: 'gap-8' }
  ],
  spacing: [
    { class: 'm-0', desc: '外边距0', example: 'm-0' },
    { class: 'm-1', desc: '外边距1', example: 'm-1' },
    { class: 'm-2', desc: '外边距2', example: 'm-2' },
    { class: 'm-4', desc: '外边距4', example: 'm-4' },
    { class: 'm-8', desc: '外边距8', example: 'm-8' },
    { class: 'mx-auto', desc: '水平居中', example: 'mx-auto' },
    { class: 'my-2', desc: '垂直外边距2', example: 'my-2' },
    { class: 'mt-4', desc: '上外边距4', example: 'mt-4' },
    { class: 'mb-4', desc: '下外边距4', example: 'mb-4' },
    { class: 'ml-4', desc: '左外边距4', example: 'ml-4' },
    { class: 'mr-4', desc: '右外边距4', example: 'mr-4' },
    { class: 'p-0', desc: '内边距0', example: 'p-0' },
    { class: 'p-1', desc: '内边距1', example: 'p-1' },
    { class: 'p-2', desc: '内边距2', example: 'p-2' },
    { class: 'p-4', desc: '内边距4', example: 'p-4' },
    { class: 'p-8', desc: '内边距8', example: 'p-8' },
    { class: 'px-4', desc: '水平内边距4', example: 'px-4' },
    { class: 'py-2', desc: '垂直内边距2', example: 'py-2' },
    { class: 'pt-4', desc: '上内边距4', example: 'pt-4' },
    { class: 'pb-4', desc: '下内边距4', example: 'pb-4' },
    { class: 'pl-4', desc: '左内边距4', example: 'pl-4' },
    { class: 'pr-4', desc: '右内边距4', example: 'pr-4' },
    { class: 'space-x-2', desc: '子元素水平间距2', example: 'space-x-2' },
    { class: 'space-y-4', desc: '子元素垂直间距4', example: 'space-y-4' }
  ],
  sizing: [
    { class: 'w-full', desc: '宽度100%', example: 'w-full' },
    { class: 'w-1/2', desc: '宽度50%', example: 'w-1/2' },
    { class: 'w-1/3', desc: '宽度33.33%', example: 'w-1/3' },
    { class: 'w-1/4', desc: '宽度25%', example: 'w-1/4' },
    { class: 'w-auto', desc: '自动宽度', example: 'w-auto' },
    { class: 'w-fit', desc: '适应内容', example: 'w-fit' },
    { class: 'w-screen', desc: '视口宽度', example: 'w-screen' },
    { class: 'h-full', desc: '高度100%', example: 'h-full' },
    { class: 'h-screen', desc: '视口高度', example: 'h-screen' },
    { class: 'h-auto', desc: '自动高度', example: 'h-auto' },
    { class: 'min-h-screen', desc: '最小高度视口', example: 'min-h-screen' },
    { class: 'max-w-xs', desc: '最大宽度xs', example: 'max-w-xs' },
    { class: 'max-w-sm', desc: '最大宽度sm', example: 'max-w-sm' },
    { class: 'max-w-md', desc: '最大宽度md', example: 'max-w-md' },
    { class: 'max-w-lg', desc: '最大宽度lg', example: 'max-w-lg' },
    { class: 'max-w-xl', desc: '最大宽度xl', example: 'max-w-xl' },
    { class: 'max-w-2xl', desc: '最大宽度2xl', example: 'max-w-2xl' },
    { class: 'max-w-4xl', desc: '最大宽度4xl', example: 'max-w-4xl' },
    { class: 'max-w-6xl', desc: '最大宽度6xl', example: 'max-w-6xl' },
    { class: 'max-w-full', desc: '最大宽度100%', example: 'max-w-full' }
  ],
  colors: [
    { class: 'bg-white', desc: '白色背景', example: 'bg-white' },
    { class: 'bg-black', desc: '黑色背景', example: 'bg-black' },
    { class: 'bg-gray-100', desc: '灰色背景100', example: 'bg-gray-100' },
    { class: 'bg-gray-200', desc: '灰色背景200', example: 'bg-gray-200' },
    { class: 'bg-gray-500', desc: '灰色背景500', example: 'bg-gray-500' },
    { class: 'bg-gray-900', desc: '灰色背景900', example: 'bg-gray-900' },
    { class: 'bg-primary', desc: '主色背景', example: 'bg-primary' },
    { class: 'bg-secondary', desc: '次色背景', example: 'bg-secondary' },
    { class: 'bg-success', desc: '成功色背景', example: 'bg-success' },
    { class: 'bg-warning', desc: '警告色背景', example: 'bg-warning' },
    { class: 'bg-danger', desc: '危险色背景', example: 'bg-danger' },
    { class: 'bg-info', desc: '信息色背景', example: 'bg-info' },
    { class: 'text-white', desc: '白色文字', example: 'text-white' },
    { class: 'text-black', desc: '黑色文字', example: 'text-black' },
    { class: 'text-gray-500', desc: '灰色文字500', example: 'text-gray-500' },
    { class: 'text-gray-700', desc: '灰色文字700', example: 'text-gray-700' },
    { class: 'text-primary', desc: '主色文字', example: 'text-primary' },
    { class: 'text-secondary', desc: '次色文字', example: 'text-secondary' },
    { class: 'text-success', desc: '成功色文字', example: 'text-success' },
    { class: 'text-warning', desc: '警告色文字', example: 'text-warning' },
    { class: 'text-danger', desc: '危险色文字', example: 'text-danger' },
    { class: 'text-info', desc: '信息色文字', example: 'text-info' },
    { class: 'bg-opacity-50', desc: '背景透明度50%', example: 'bg-opacity-50' },
    { class: 'bg-opacity-90', desc: '背景透明度90%', example: 'bg-opacity-90' },
    { class: 'text-opacity-75', desc: '文字透明度75%', example: 'text-opacity-75' }
  ],
  typography: [
    { class: 'text-xs', desc: '超小字体', example: 'text-xs' },
    { class: 'text-sm', desc: '小字体', example: 'text-sm' },
    { class: 'text-base', desc: '基础字体', example: 'text-base' },
    { class: 'text-lg', desc: '大字体', example: 'text-lg' },
    { class: 'text-xl', desc: '超大字体', example: 'text-xl' },
    { class: 'text-2xl', desc: '2倍字体', example: 'text-2xl' },
    { class: 'text-3xl', desc: '3倍字体', example: 'text-3xl' },
    { class: 'text-4xl', desc: '4倍字体', example: 'text-4xl' },
    { class: 'font-thin', desc: '细体', example: 'font-thin' },
    { class: 'font-light', desc: '轻体', example: 'font-light' },
    { class: 'font-normal', desc: '正常体', example: 'font-normal' },
    { class: 'font-medium', desc: '中等体', example: 'font-medium' },
    { class: 'font-semibold', desc: '半粗体', example: 'font-semibold' },
    { class: 'font-bold', desc: '粗体', example: 'font-bold' },
    { class: 'font-extrabold', desc: '超粗体', example: 'font-extrabold' },
    { class: 'text-left', desc: '左对齐', example: 'text-left' },
    { class: 'text-center', desc: '居中', example: 'text-center' },
    { class: 'text-right', desc: '右对齐', example: 'text-right' },
    { class: 'text-justify', desc: '两端对齐', example: 'text-justify' },
    { class: 'uppercase', desc: '大写', example: 'uppercase' },
    { class: 'lowercase', desc: '小写', example: 'lowercase' },
    { class: 'capitalize', desc: '首字母大写', example: 'capitalize' },
    { class: 'italic', desc: '斜体', example: 'italic' },
    { class: 'underline', desc: '下划线', example: 'underline' },
    { class: 'line-through', desc: '删除线', example: 'line-through' },
    { class: 'no-underline', desc: '无下划线', example: 'no-underline' },
    { class: 'leading-tight', desc: '紧密行高', example: 'leading-tight' },
    { class: 'leading-normal', desc: '正常行高', example: 'leading-normal' },
    { class: 'leading-relaxed', desc: '宽松行高', example: 'leading-relaxed' },
    { class: 'tracking-tight', desc: '紧密字距', example: 'tracking-tight' },
    { class: 'tracking-normal', desc: '正常字距', example: 'tracking-normal' },
    { class: 'tracking-wide', desc: '宽松字距', example: 'tracking-wide' }
  ],
  borders: [
    { class: 'border', desc: '边框', example: 'border' },
    { class: 'border-0', desc: '无边框', example: 'border-0' },
    { class: 'border-2', desc: '2px边框', example: 'border-2' },
    { class: 'border-4', desc: '4px边框', example: 'border-4' },
    { class: 'border-t', desc: '上边框', example: 'border-t' },
    { class: 'border-b', desc: '下边框', example: 'border-b' },
    { class: 'border-l', desc: '左边框', example: 'border-l' },
    { class: 'border-r', desc: '右边框', example: 'border-r' },
    { class: 'border-gray-200', desc: '灰色边框200', example: 'border-gray-200' },
    { class: 'border-gray-500', desc: '灰色边框500', example: 'border-gray-500' },
    { class: 'border-primary', desc: '主色边框', example: 'border-primary' },
    { class: 'rounded', desc: '圆角', example: 'rounded' },
    { class: 'rounded-sm', desc: '小圆角', example: 'rounded-sm' },
    { class: 'rounded-lg', desc: '大圆角', example: 'rounded-lg' },
    { class: 'rounded-xl', desc: '超大圆角', example: 'rounded-xl' },
    { class: 'rounded-full', desc: '完全圆角', example: 'rounded-full' },
    { class: 'rounded-t-lg', desc: '上圆角', example: 'rounded-t-lg' },
    { class: 'rounded-b-lg', desc: '下圆角', example: 'rounded-b-lg' },
    { class: 'rounded-l-lg', desc: '左圆角', example: 'rounded-l-lg' },
    { class: 'rounded-r-lg', desc: '右圆角', example: 'rounded-r-lg' }
  ],
  effects: [
    { class: 'shadow', desc: '阴影', example: 'shadow' },
    { class: 'shadow-sm', desc: '小阴影', example: 'shadow-sm' },
    { class: 'shadow-md', desc: '中等阴影', example: 'shadow-md' },
    { class: 'shadow-lg', desc: '大阴影', example: 'shadow-lg' },
    { class: 'shadow-xl', desc: '超大阴影', example: 'shadow-xl' },
    { class: 'shadow-2xl', desc: '2倍阴影', example: 'shadow-2xl' },
    { class: 'shadow-none', desc: '无阴影', example: 'shadow-none' },
    { class: 'opacity-0', desc: '完全透明', example: 'opacity-0' },
    { class: 'opacity-50', desc: '50%透明', example: 'opacity-50' },
    { class: 'opacity-100', desc: '完全不透明', example: 'opacity-100' },
    { class: 'backdrop-blur-sm', desc: '背景模糊小', example: 'backdrop-blur-sm' },
    { class: 'backdrop-blur-md', desc: '背景模糊中', example: 'backdrop-blur-md' },
    { class: 'backdrop-blur-lg', desc: '背景模糊大', example: 'backdrop-blur-lg' },
    { class: 'blur-sm', desc: '模糊小', example: 'blur-sm' },
    { class: 'blur-md', desc: '模糊中', example: 'blur-md' },
    { class: 'blur-lg', desc: '模糊大', example: 'blur-lg' }
  ],
  transforms: [
    { class: 'transform', desc: '启用变换', example: 'transform' },
    { class: 'scale-50', desc: '缩放50%', example: 'scale-50' },
    { class: 'scale-100', desc: '缩放100%', example: 'scale-100' },
    { class: 'scale-110', desc: '缩放110%', example: 'scale-110' },
    { class: 'scale-150', desc: '缩放150%', example: 'scale-150' },
    { class: 'rotate-0', desc: '旋转0度', example: 'rotate-0' },
    { class: 'rotate-45', desc: '旋转45度', example: 'rotate-45' },
    { class: 'rotate-90', desc: '旋转90度', example: 'rotate-90' },
    { class: 'rotate-180', desc: '旋转180度', example: 'rotate-180' },
    { class: 'translate-x-0', desc: 'X轴平移0', example: 'translate-x-0' },
    { class: 'translate-x-4', desc: 'X轴平移4', example: 'translate-x-4' },
    { class: 'translate-y-4', desc: 'Y轴平移4', example: 'translate-y-4' },
    { class: 'skew-x-0', desc: 'X轴倾斜0', example: 'skew-x-0' },
    { class: 'skew-y-0', desc: 'Y轴倾斜0', example: 'skew-y-0' },
    { class: 'origin-center', desc: '变换原点居中', example: 'origin-center' },
    { class: 'origin-top', desc: '变换原点顶部', example: 'origin-top' },
    { class: 'origin-bottom', desc: '变换原点底部', example: 'origin-bottom' }
  ],
  interactivity: [
    { class: 'cursor-pointer', desc: '指针光标', example: 'cursor-pointer' },
    { class: 'cursor-not-allowed', desc: '禁止光标', example: 'cursor-not-allowed' },
    { class: 'cursor-wait', desc: '等待光标', example: 'cursor-wait' },
    { class: 'select-none', desc: '不可选择', example: 'select-none' },
    { class: 'select-text', desc: '可选择文字', example: 'select-text' },
    { class: 'select-all', desc: '全选', example: 'select-all' },
    { class: 'pointer-events-none', desc: '禁用指针事件', example: 'pointer-events-none' },
    { class: 'pointer-events-auto', desc: '启用指针事件', example: 'pointer-events-auto' },
    { class: 'resize', desc: '可调整大小', example: 'resize' },
    { class: 'resize-none', desc: '不可调整大小', example: 'resize-none' },
    { class: 'outline-none', desc: '无轮廓', example: 'outline-none' },
    { class: 'outline', desc: '有轮廓', example: 'outline' }
  ],
  shortcuts: [
    { class: 'btn', desc: '按钮基础样式', example: 'btn' },
    { class: 'btn-primary', desc: '主色按钮', example: 'btn-primary' },
    { class: 'btn-secondary', desc: '次色按钮', example: 'btn-secondary' },
    { class: 'card', desc: '卡片样式', example: 'card' },
    { class: 'container', desc: '容器样式', example: 'container' },
    { class: 'flex-center', desc: '弹性居中', example: 'flex-center' },
    { class: 'grid-center', desc: '网格居中', example: 'grid-center' }
  ]
}

// 获取所有类名
const allClasses = computed(() => {
  if (activeCategory.value === 'all') {
    return Object.values(classGroups).flat()
  }
  return classGroups[activeCategory.value as keyof typeof classGroups] || []
})

// 过滤后的类名
const filteredClasses = computed(() => {
  if (!searchKeyword.value) {
    return allClasses.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return allClasses.value.filter(item => 
    item.class.toLowerCase().includes(keyword) || 
    item.desc.toLowerCase().includes(keyword)
  )
})

// 复制到剪贴板
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 可以添加提示消息
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div class="container mx-auto py-8">
    <div class="card max-w-7xl mx-auto">
      <!-- 标题 -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2 text-secondary text-center">
          UnoCSS 类名参考
        </h1>
        <p class="text-center text-gray-500 dark:text-gray-400">
          浏览和搜索所有可用的 UnoCSS 工具类
        </p>
      </div>

      <!-- 搜索框 -->
      <div class="mb-6">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索类名或描述..."
          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <!-- 分类标签 -->
      <div class="mb-6 flex flex-wrap gap-2 justify-center">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
            activeCategory === category.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          <span class="mr-2">{{ category.icon }}</span>
          {{ category.name }}
        </button>
      </div>

      <!-- 类名列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in filteredClasses"
          :key="item.class"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group"
        >
          <div class="flex items-start justify-between mb-2">
            <code
              class="text-sm font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-primary font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              @click="copyToClipboard(item.class)"
              :title="'点击复制: ' + item.class"
            >
              {{ item.class }}
            </code>
            <button
              @click="copyToClipboard(item.class)"
              class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-primary"
              title="复制"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {{ item.desc }}
          </p>
          <div class="text-xs text-gray-500 dark:text-gray-500 italic">
            示例: <span class="font-mono">{{ item.example }}</span>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div
        v-if="filteredClasses.length === 0"
        class="text-center py-12 text-gray-500 dark:text-gray-400"
      >
        <p class="text-lg">未找到匹配的类名</p>
        <p class="text-sm mt-2">尝试使用其他关键词搜索</p>
      </div>

      <!-- 统计信息 -->
      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          共显示 <span class="font-semibold text-primary">{{ filteredClasses.length }}</span> 个类名
          <span v-if="activeCategory !== 'all'">
            （{{ categories.find(c => c.id === activeCategory)?.name }}分类）
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
code {
  user-select: all;
}
</style>

