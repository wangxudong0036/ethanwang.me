/**
 * Supabase 使用示例
 * 这些示例展示了如何在项目中使用 Supabase 进行各种操作
 */

import { supabase } from '../supabase'

// ==================== 认证示例 ====================

/**
 * 用户注册
 */
export async function signUpExample(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // 额外的用户元数据
        display_name: '新用户'
      }
    }
  })

  if (error) {
    console.error('注册失败:', error.message)
    return null
  }

  return data
}

/**
 * 用户登录
 */
export async function signInExample(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('登录失败:', error.message)
    return null
  }

  return data
}

/**
 * 用户登出
 */
export async function signOutExample() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('登出失败:', error.message)
    return false
  }

  return true
}

// ==================== 数据库操作示例 ====================

/**
 * 查询所有数据
 */
export async function selectAllExample(tableName: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')

  if (error) {
    console.error('查询失败:', error.message)
    return null
  }

  return data
}

/**
 * 条件查询
 */
export async function selectWithConditionExample(tableName: string, column: string, value: any) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq(column, value)

  if (error) {
    console.error('查询失败:', error.message)
    return null
  }

  return data
}

/**
 * 插入数据
 */
export async function insertExample(tableName: string, record: Record<string, any>) {
  const { data, error } = await supabase
    .from(tableName)
    .insert(record)
    .select()

  if (error) {
    console.error('插入失败:', error.message)
    return null
  }

  return data
}

/**
 * 更新数据
 */
export async function updateExample(
  tableName: string,
  updates: Record<string, any>,
  column: string,
  value: any
) {
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq(column, value)
    .select()

  if (error) {
    console.error('更新失败:', error.message)
    return null
  }

  return data
}

/**
 * 删除数据
 */
export async function deleteExample(tableName: string, column: string, value: any) {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq(column, value)

  if (error) {
    console.error('删除失败:', error.message)
    return false
  }

  return true
}

// ==================== 实时订阅示例 ====================

/**
 * 订阅表变化
 */
export function subscribeToTableExample(
  tableName: string,
  callback: (payload: any) => void
) {
  const channel = supabase
    .channel(`${tableName}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: tableName
      },
      callback
    )
    .subscribe()

  // 返回取消订阅的函数
  return () => {
    supabase.removeChannel(channel)
  }
}

// ==================== 存储示例 ====================

/**
 * 上传文件
 */
export async function uploadFileExample(
  bucketName: string,
  filePath: string,
  file: File
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('上传失败:', error.message)
    return null
  }

  return data
}

/**
 * 获取文件 URL
 */
export function getFileUrlExample(bucketName: string, filePath: string) {
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath)

  return data.publicUrl
}

/**
 * 下载文件
 */
export async function downloadFileExample(bucketName: string, filePath: string) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .download(filePath)

  if (error) {
    console.error('下载失败:', error.message)
    return null
  }

  return data
}

// ==================== 博客相关示例 ====================

/**
 * 获取所有博客文章
 */
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('获取文章失败:', error.message)
    return []
  }

  return data || []
}

/**
 * 根据 ID 获取文章
 */
export async function getBlogPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('获取文章失败:', error.message)
    return null
  }

  return data
}

/**
 * 创建新文章
 */
export async function createBlogPost(post: {
  title: string
  content: string
  excerpt?: string
  category?: string
  tags?: string[]
}) {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...post,
      created_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('创建文章失败:', error.message)
    return null
  }

  return data
}

