<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore, type BlogPost } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

// 当前选中的分类和标签
const selectedCategory = ref<string>('全部')
const selectedTag = ref<string>('')
const searchKeyword = ref<string>('')

// 获取所有分类
const categories = computed(() => ['全部', ...blogStore.getAllCategories])

// 获取所有标签
const tags = computed(() => blogStore.getAllTags)

// 过滤后的文章列表
const filteredPosts = computed(() => {
  let posts = blogStore.allPosts

  // 按分类过滤
  if (selectedCategory.value !== '全部') {
    posts = posts.filter((post: BlogPost) => post.category === selectedCategory.value)
  }

  // 按标签过滤
  if (selectedTag.value) {
    posts = posts.filter((post: BlogPost) => post.tags.includes(selectedTag.value))
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    posts = posts.filter((post: BlogPost) => 
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
    )
  }

  return posts
})

// 跳转到文章详情
const goToDetail = (id: string) => {
  router.push(`/blog/${id}`)
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <!-- 页面标题 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-4 text-secondary">博客日志</h1>
      <p class="text-gray-600 dark:text-gray-400">记录日常开发心得与技术分享</p>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="mb-8 space-y-4">
      <!-- 搜索框 -->
      <div class="max-w-md mx-auto">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索文章..."
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- 分类和标签筛选 -->
      <div class="flex flex-wrap justify-center gap-4">
        <!-- 分类筛选 -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">分类：</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category; selectedTag = ''"
              :class="[
                'px-3 py-1 rounded-full text-sm transition-colors',
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- 标签筛选 -->
        <div v-if="tags.length > 0" class="flex items-center gap-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">标签：</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in tags"
              :key="tag"
              @click="selectedTag = selectedTag === tag ? '' : tag"
              :class="[
                'px-3 py-1 rounded-full text-sm transition-colors',
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              ]"
            >
              #{{ tag }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div v-if="filteredPosts.length > 0" class="space-y-6 max-w-4xl mx-auto">
      <article
        v-for="post in filteredPosts"
        :key="post.id"
        class="card cursor-pointer hover:shadow-lg transition-shadow"
        @click="goToDetail(post.id)"
      >
        <div class="flex flex-col md:flex-row md:items-start gap-4">
          <!-- 文章内容 -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span class="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                {{ post.category }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(post.date) }}
              </span>
              <span v-if="post.readTime" class="text-sm text-gray-500 dark:text-gray-400">
                {{ post.readTime }} 分钟阅读
              </span>
            </div>
            
            <h2 class="text-2xl font-bold mb-3 text-secondary hover:text-primary transition-colors">
              {{ post.title }}
            </h2>
            
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {{ post.excerpt }}
            </p>
            
            <!-- 标签 -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- 空状态 -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-lg">暂无文章</p>
      <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">
        {{ searchKeyword || selectedCategory !== '全部' || selectedTag ? '尝试调整筛选条件' : '还没有发布任何文章' }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

