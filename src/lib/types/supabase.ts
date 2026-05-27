// Supabase 数据库类型定义
// 使用 Supabase CLI 生成类型定义：
// npx supabase gen types typescript --project-id your-project-id > src/lib/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          date: string
          tags: string[] | null
          category: string
          read_time: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          date: string
          tags?: string[] | null
          category: string
          read_time?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          date?: string
          tags?: string[] | null
          category?: string
          read_time?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

