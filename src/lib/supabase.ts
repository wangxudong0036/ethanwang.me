import { createClient } from '@supabase/supabase-js'

// 从环境变量获取 Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 验证环境变量
if (!supabaseUrl) {
  throw new Error('缺少环境变量: VITE_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('缺少环境变量: VITE_SUPABASE_ANON_KEY')
}

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // 自动刷新会话
    autoRefreshToken: true,
    // 持久化会话到本地存储
    persistSession: true,
    // 检测 URL 中的认证回调
    detectSessionInUrl: true
  }
})

// 导出类型（如果需要）
export type { Database } from './types/supabase'

