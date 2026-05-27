/**
 * 使用 Supabase Management API 创建表结构
 * 需要设置 SUPABASE_ACCESS_TOKEN 环境变量
 * 
 * 获取 Access Token:
 * 1. 登录 Supabase Dashboard
 * 2. 进入 Settings > Access Tokens
 * 3. 生成新的 Access Token
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 从环境变量获取配置
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF

if (!SUPABASE_URL) {
  console.error('错误: 请设置 VITE_SUPABASE_URL 或 SUPABASE_URL 环境变量')
  process.exit(1)
}

// 从 URL 提取 project ref
const projectRef = PROJECT_REF || SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]

if (!projectRef) {
  console.error('错误: 无法从 URL 提取项目引用，请设置 SUPABASE_PROJECT_REF 环境变量')
  process.exit(1)
}

// 读取 SQL 文件
const sqlPath = join(__dirname, '../supabase/migrations/create_blog_posts_table.sql')
const sql = readFileSync(sqlPath, 'utf-8')

// 使用 Supabase Management API
async function createTable() {
  try {
    console.log('正在创建表结构...')
    console.log(`项目: ${projectRef}`)
    
    // 方法1: 使用 Supabase REST API (需要 service_role key)
    // 注意: 这个方法需要 service_role key，通常不推荐在客户端使用
    
    // 方法2: 使用 Supabase CLI (推荐)
    console.log('\n推荐使用 Supabase CLI 执行:')
    console.log(`npx supabase db push --project-ref ${projectRef}`)
    console.log('\n或者使用 psql 直接连接:')
    console.log(`psql "postgresql://postgres:[YOUR-PASSWORD]@db.${projectRef}.supabase.co:5432/postgres" -f ${sqlPath}`)
    
    // 方法3: 使用 Supabase Dashboard SQL Editor
    console.log('\n或者直接在 Supabase Dashboard 的 SQL Editor 中执行 SQL 文件内容')
    
  } catch (error) {
    console.error('创建表失败:', error)
    process.exit(1)
  }
}

createTable()

