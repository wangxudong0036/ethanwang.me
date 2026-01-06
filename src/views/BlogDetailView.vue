<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore, type BlogPost } from '../stores/blog'
import BaseCard from '../components/BaseCard.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// 获取当前文章
const post = computed(() => {
  const id = route.params.id as string
  return blogStore.getPostById(id)
})

// 获取相关文章（同分类的其他文章）
const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogStore.getPostsByCategory(post.value.category)
    .filter((p: BlogPost) => p.id !== post.value?.id)
    .slice(0, 3)
})

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 跳转到文章详情
const goToDetail = (id: string) => {
  router.push(`/blog/${id}`)
}

// 返回博客列表
const goBack = () => {
  router.push('/blog')
}

// 页面挂载时，如果文章不存在，跳转到博客列表
onMounted(() => {
  if (!post.value) {
    router.push('/blog')
  }
})

// 转义 HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

// 格式化 Markdown 内容为 HTML（简单版本）
function formatContent(content: string): string {
  // 将 Markdown 标题转换为 HTML
  content = content.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-secondary">$1</h1>')
  content = content.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 text-secondary">$1</h2>')
  content = content.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">$1</h3>')
  
  // 将代码块转换为 HTML
  content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">${escapeHtml(code.trim())}</code></pre>`
  })
  
  // 将行内代码转换为 HTML
  content = content.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
  
  // 将段落转换为 HTML
  content = content.split('\n\n').map(para => {
    if (para.trim() && !para.match(/^<[h|p|d|u|o|l]/)) {
      return `<p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">${para.trim()}</p>`
    }
    return para
  }).join('\n')
  
  // 将列表转换为 HTML
  content = content.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2 text-gray-700 dark:text-gray-300">$1</li>')
  // 使用 [\s\S] 代替 s 标志以兼容 ES2017
  content = content.replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="list-disc mb-4">$1</ul>')
  
  return content
}
</script>

<template>
  <div v-if="post" class="container mx-auto py-8 px-4">
    <!-- 返回按钮 -->
    <button
      @click="goBack"
      class="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      返回博客列表
    </button>

    <!-- 文章内容 -->
    <article class="max-w-4xl mx-auto">
      <!-- 文章头部信息 -->
      <header class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 text-sm rounded bg-primary/10 text-primary">
            {{ post.category }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(post.date) }}
          </span>
          <span v-if="post.readTime" class="text-sm text-gray-500 dark:text-gray-400">
            {{ post.readTime }} 分钟阅读
          </span>
        </div>
        
        <h1 class="text-4xl font-bold mb-4 text-secondary">
          {{ post.title }}
        </h1>
        
        <!-- 标签 -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <!-- 文章正文 -->
      <div class="card prose prose-lg dark:prose-invert max-w-none">
        <div class="blog-content" v-html="formatContent(post.content)"></div>
      </div>
    </article>

    <!-- 相关文章 -->
    <div v-if="relatedPosts.length > 0" class="max-w-4xl mx-auto mt-12">
      <h2 class="text-2xl font-bold mb-6 text-secondary">相关文章</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseCard
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
          class="cursor-pointer hover:shadow-lg transition-shadow"
          @click="goToDetail(relatedPost.id)"
        >
          <h3 class="text-lg font-semibold mb-2 text-secondary hover:text-primary transition-colors">
            {{ relatedPost.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {{ relatedPost.excerpt }}
          </p>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatDate(relatedPost.date) }}
          </span>
        </BaseCard>
      </div>
    </div>
  </div>

  <!-- 文章不存在 -->
  <div v-else class="container mx-auto py-8 px-4 text-center">
    <p class="text-gray-500 dark:text-gray-400 text-lg mb-4">文章不存在</p>
    <button
      @click="goBack"
      class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
    >
      返回博客列表
    </button>
  </div>
</template>


<style lang="scss" scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.blog-content) {
  h1, h2, h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
  
  code {
    font-family: 'Courier New', monospace;
  }
  
  pre {
    margin: 1rem 0;
  }
  
  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
}
</style>

