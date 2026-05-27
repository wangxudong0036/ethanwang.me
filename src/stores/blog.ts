import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/types/supabase'

// 博客文章接口
export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string // 摘要
  date: string // 发布日期
  tags: string[] // 标签
  category: string // 分类（如：开发技巧、心得体会等）
  readTime?: number // 预计阅读时间（分钟）
}

// Supabase 数据库类型
type BlogPostRow = Database['public']['Tables']['blog_posts']['Row']
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [
      {
        id: '1',
        title: 'Vue 3 Composition API 最佳实践',
        excerpt: '分享在使用 Vue 3 Composition API 时的一些最佳实践和常见陷阱，帮助开发者写出更优雅的代码。',
        content: `# Vue 3 Composition API 最佳实践

## 引言

Vue 3 的 Composition API 为我们提供了更灵活的组织代码的方式。在这篇文章中，我将分享一些在实际项目中使用 Composition API 的最佳实践。

## 1. 使用 setup 语法糖

\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
</script>
\`\`\`

使用 \`<script setup>\` 可以让代码更简洁，无需手动返回变量。

## 2. 合理使用 ref 和 reactive

- 对于基本类型，使用 \`ref\`
- 对于对象，根据是否需要响应式来决定使用 \`ref\` 还是 \`reactive\`

## 3. 使用 computed 缓存计算结果

避免在模板中进行复杂计算，使用 \`computed\` 可以自动缓存结果。

## 总结

Composition API 让我们的代码更加模块化和可复用，合理使用这些特性可以大大提升开发效率。`,
        date: '2025-01-15',
        tags: ['Vue 3', 'TypeScript', '前端开发'],
        category: '开发技巧',
        readTime: 5
      },
      {
        id: '2',
        title: 'TypeScript 类型系统深入理解',
        excerpt: '深入探讨 TypeScript 的类型系统，包括泛型、条件类型、映射类型等高级特性。',
        content: `# TypeScript 类型系统深入理解

## 泛型的使用

TypeScript 的泛型让我们可以创建可重用的组件，这些组件可以处理多种类型。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg
}
\`\`\`

## 条件类型

条件类型允许我们根据类型关系选择类型：

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T
\`\`\`

## 映射类型

映射类型允许我们基于旧类型创建新类型：

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
\`\`\`

掌握这些高级特性，可以让我们的类型定义更加精确和灵活。`,
        date: '2025-01-10',
        tags: ['TypeScript', '类型系统'],
        category: '开发技巧',
        readTime: 8
      },
      {
        id: '3',
        title: '2025 年学习计划与目标',
        excerpt: '新的一年，新的开始。记录下今年的学习计划和目标，希望能够持续成长。',
        content: `# 2025 年学习计划与目标

## 技术栈学习

### 前端框架
- 深入学习 Vue 3 的高级特性
- 学习 React 18 的新特性
- 探索 Svelte 框架

### 后端技术
- 学习 Node.js 性能优化
- 掌握 GraphQL 的使用
- 了解微服务架构

## 个人成长

1. 坚持写技术博客，每月至少 4 篇
2. 参与开源项目贡献
3. 提升英语水平，阅读英文技术文档

## 总结

制定计划只是第一步，更重要的是坚持执行。希望年底回顾时，能够看到自己的成长。`,
        date: '2025-01-01',
        tags: ['学习计划', '个人成长'],
        category: '心得体会',
        readTime: 3
      }
    ] as BlogPost[]
  }),

  getters: {
    // 获取所有文章
    allPosts: (state) => state.posts.sort((a: BlogPost, b: BlogPost) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ),

    // 根据 ID 获取文章
    getPostById: (state) => (id: string) => {
      return state.posts.find((post: BlogPost) => post.id === id)
    },

    // 根据分类获取文章
    getPostsByCategory: (state) => (category: string) => {
      return state.posts
        .filter((post: BlogPost) => post.category === category)
        .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
    },

    // 根据标签获取文章
    getPostsByTag: (state) => (tag: string) => {
      return state.posts
        .filter((post: BlogPost) => post.tags.includes(tag))
        .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
    },

    // 获取所有分类
    getAllCategories: (state) => {
      const categories = new Set<string>(state.posts.map((post: BlogPost) => post.category))
      return Array.from(categories)
    },

    // 获取所有标签
    getAllTags: (state) => {
      const tags = new Set<string>(state.posts.flatMap((post: BlogPost) => post.tags))
      return Array.from(tags)
    }
  },

  actions: {
    // 从 Supabase 加载所有文章
    async loadPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false })

        if (error) throw error

        // 转换数据库格式到应用格式
        this.posts = (data || []).map((row: BlogPostRow) => ({
          id: row.id,
          title: row.title,
          content: row.content,
          excerpt: row.excerpt,
          date: row.date,
          tags: row.tags || [],
          category: row.category,
          readTime: row.read_time || undefined
        }))
      } catch (error) {
        console.error('加载博客文章失败:', error)
        throw error
      }
    },

    // 创建新文章并保存到 Supabase
    async createPost(postData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
      try {
        // 准备插入数据
        const insertData: BlogPostInsert = {
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          date: postData.date,
          tags: postData.tags,
          category: postData.category,
          read_time: postData.readTime || null
        }

        const { data, error } = await supabase
          .from('blog_posts')
          .insert(insertData)
          .select()
          .single()

        if (error) throw error

        // 转换数据库格式到应用格式
        const newPost: BlogPost = {
          id: data.id,
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          date: data.date,
          tags: data.tags || [],
          category: data.category,
          readTime: data.read_time || undefined
        }

        // 更新本地状态
        this.posts.unshift(newPost)

        return newPost
      } catch (error) {
        console.error('创建博客文章失败:', error)
        throw error
      }
    },

    // 更新文章
    async updatePost(id: string, updatedPost: Partial<BlogPost>): Promise<void> {
      try {
        // 准备更新数据
        const updateData: Partial<BlogPostInsert> = {}
        if (updatedPost.title !== undefined) updateData.title = updatedPost.title
        if (updatedPost.content !== undefined) updateData.content = updatedPost.content
        if (updatedPost.excerpt !== undefined) updateData.excerpt = updatedPost.excerpt
        if (updatedPost.date !== undefined) updateData.date = updatedPost.date
        if (updatedPost.tags !== undefined) updateData.tags = updatedPost.tags
        if (updatedPost.category !== undefined) updateData.category = updatedPost.category
        if (updatedPost.readTime !== undefined) updateData.read_time = updatedPost.readTime || null

        const { error } = await supabase
          .from('blog_posts')
          .update(updateData)
          .eq('id', id)

        if (error) throw error

        // 更新本地状态
        const index = this.posts.findIndex((post: BlogPost) => post.id === id)
        if (index !== -1) {
          this.posts[index] = { ...this.posts[index], ...updatedPost }
        }
      } catch (error) {
        console.error('更新博客文章失败:', error)
        throw error
      }
    },

    // 删除文章
    async deletePost(id: string): Promise<void> {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id)

        if (error) throw error

        // 更新本地状态
        const index = this.posts.findIndex((post: BlogPost) => post.id === id)
        if (index !== -1) {
          this.posts.splice(index, 1)
        }
      } catch (error) {
        console.error('删除博客文章失败:', error)
        throw error
      }
    },

    // 添加新文章（本地，已废弃，保留用于兼容）
    addPost(post: BlogPost) {
      this.posts.push(post)
    }
  }
})

