import { defineConfig } from 'unocss'
import { 
  presetUno, 
  presetAttributify, 
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  // 启用预设
  presets: [
    presetUno(), // 默认预设，包含常用的工具类
    presetAttributify(), // 启用属性模式，如 bg="blue-500"
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle'
      }
    }) // 图标预设
  ],
  // 转换器
  transformers: [
    transformerDirectives(), // 支持@apply指令
    transformerVariantGroup() // 支持(hover:bg-gray-100 focus:bg-gray-200)组
  ],
  // 主题配置
  theme: {
    colors: {
      primary: '#3498db',
      secondary: '#2c3e50',
      success: '#4caf50',
      warning: '#f39c12',
      danger: '#f44336',
      info: '#2196f3',
      light: '#f8f9fa',
      dark: '#343a40'
    },
    // 断点配置
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  // 自定义简写规则
  shortcuts: {
    'btn': 'py-2 px-4 rounded-lg font-medium transition-all duration-200',
    'btn-primary': 'btn bg-primary text-white hover:bg-opacity-90',
    'btn-secondary': 'btn bg-secondary text-white hover:bg-opacity-90',
    'card': 'bg-white rounded-lg shadow p-4 dark:bg-dark dark:text-light',
    'container': 'max-w-6xl mx-auto px-4',
    'flex-center': 'flex items-center justify-center',
    'grid-center': 'grid place-items-center'
  },
  // 确保css正确生成
  safelist: 'sm:hidden sm:block md:hidden md:block lg:hidden lg:block'.split(' ')
}) 