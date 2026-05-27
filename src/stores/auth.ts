import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!user.value)
  const isGuest = computed(() => !user.value)

  // 初始化：检查当前会话
  const init = async () => {
    console.log(supabase)
    try {
      loading.value = true
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      
      session.value = currentSession
      user.value = currentSession?.user ?? null

      // 监听认证状态变化
      supabase.auth.onAuthStateChange((_event, newSession) => {
        session.value = newSession
        user.value = newSession?.user ?? null
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : '初始化认证失败'
      console.error('Auth init error:', err)
    } finally {
      loading.value = false
    }
  }

  // 注册
  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })

      if (signUpError) throw signUpError

      user.value = data.user
      session.value = data.session
      
      return { user: data.user, session: data.session }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '注册失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 登录
  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      user.value = data.user
      session.value = data.session
      
      return { user: data.user, session: data.session }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登录失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 登出
  const signOut = async () => {
    try {
      loading.value = true
      error.value = null
      
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) throw signOutError

      user.value = null
      session.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登出失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 重置密码
  const resetPassword = async (email: string) => {
    try {
      loading.value = true
      error.value = null
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (resetError) throw resetError
    } catch (err) {
      error.value = err instanceof Error ? err.message : '重置密码失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 更新用户信息
  const updateUser = async (updates: { email?: string; password?: string; data?: Record<string, any> }) => {
    try {
      loading.value = true
      error.value = null
      
      const { data: updatedData, error: updateError } = await supabase.auth.updateUser(updates)

      if (updateError) throw updateError

      user.value = updatedData.user
      
      return updatedData.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新用户信息失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // 状态
    user,
    session,
    loading,
    error,
    // 计算属性
    isAuthenticated,
    isGuest,
    // 方法
    init,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateUser
  }
})

