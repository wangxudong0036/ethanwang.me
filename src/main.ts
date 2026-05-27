// 1. 第三方库和框架
import { createApp } from 'vue'

// 2. 路由和状态管理
import router from './router'
import pinia from './stores'

// 3. UnoCSS样式（确保在自定义样式之前）
import 'virtual:uno.css'

// 4. 全局样式文件（从通用到特定）
import './style.scss'
import './uno.css' // 自定义UnoCSS补充样式

// 5. 根组件
import App from './App.vue'

// 创建应用实例
const app = createApp(App)

app.use(pinia)
app.use(router)

// 初始化 Supabase 认证（可选，如果需要全局认证状态）
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.init()

app.mount('#app')
