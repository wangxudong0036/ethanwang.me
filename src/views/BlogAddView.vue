<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const blogStore = useBlogStore()

// 表单数据
const formData = ref({
  title: '',
  content: '',
  excerpt: '',
  date: new Date().toISOString().split('T')[0], // 默认今天
  tags: [] as string[],
  category: '开发技巧',
  readTime: undefined as number | undefined
})

// 标签输入
const tagInput = ref('')

// 分类选项
const categories = ['开发技巧', '心得体会', '技术分享', '学习笔记', '其他']

// 加载状态
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// 表单验证
const isFormValid = computed(() => {
  return (
    formData.value.title.trim() !== '' &&
    formData.value.content.trim() !== '' &&
    formData.value.excerpt.trim() !== '' &&
    formData.value.date !== '' &&
    formData.value.category !== ''
  )
})

// 添加标签
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag)
    tagInput.value = ''
  }
}

// 删除标签
const removeTag = (tag: string) => {
  formData.value.tags = formData.value.tags.filter(t => t !== tag)
}

// 提交表单
const handleSubmit = async () => {
  if (!isFormValid.value) {
    errorMessage.value = '请填写所有必填字段'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // 准备提交数据
    const postData = {
      title: formData.value.title.trim(),
      content: formData.value.content.trim(),
      excerpt: formData.value.excerpt.trim(),
      date: formData.value.date,
      tags: formData.value.tags,
      category: formData.value.category,
      read_time: formData.value.readTime || null
    }

    // 调用 store 方法保存到 Supabase
    const newPost = await blogStore.createPost(postData)
    
    successMessage.value = '博客文章创建成功！'
    
    // 2秒后跳转到博客详情页
    setTimeout(() => {
      router.push(`/blog/${newPost.id}`)
    }, 2000)
  } catch (error: any) {
    console.error('创建博客失败:', error)
    errorMessage.value = error.message || '创建博客失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 取消并返回
const handleCancel = () => {
  router.back()
}

// 计算内容字数
const contentLength = computed(() => formData.value.content.length)
const excerptLength = computed(() => formData.value.excerpt.length)
</script>

<template>
  <div class="container mx-auto py-8 px-4 max-w-4xl">
    <!-- 页面标题 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-4 text-secondary">发布新文章</h1>
      <p class="text-gray-600 dark:text-gray-400">分享你的技术见解和心得体会</p>
    </div>

    <!-- 成功/错误消息 -->
    <div v-if="successMessage" class="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
      {{ errorMessage }}
    </div>

    <!-- 表单卡片 -->
    <BaseCard title="文章信息" with-shadow>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 标题 -->
        <div>
          <label for="title" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            标题 <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            placeholder="请输入文章标题"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- 摘要 -->
        <div>
          <label for="excerpt" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            摘要 <span class="text-red-500">*</span>
            <span class="text-xs text-gray-500 ml-2">({{ excerptLength }}/500)</span>
          </label>
          <textarea
            id="excerpt"
            v-model="formData.excerpt"
            required
            rows="3"
            maxlength="500"
            placeholder="请输入文章摘要，用于文章列表展示"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <!-- 内容 -->
        <div>
          <label for="content" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            内容 <span class="text-red-500">*</span>
            <span class="text-xs text-gray-500 ml-2">({{ contentLength }} 字)</span>
          </label>
          <textarea
            id="content"
            v-model="formData.content"
            required
            rows="15"
            placeholder="请输入文章内容，支持 Markdown 格式"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
          />
        </div>

        <!-- 分类和日期 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 分类 -->
          <div>
            <label for="category" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              分类 <span class="text-red-500">*</span>
            </label>
            <select
              id="category"
              v-model="formData.category"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <!-- 发布日期 -->
          <div>
            <label for="date" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              发布日期 <span class="text-red-500">*</span>
            </label>
            <input
              id="date"
              v-model="formData.date"
              type="date"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <!-- 阅读时间和标签 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 阅读时间 -->
          <div>
            <label for="readTime" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              预计阅读时间（分钟）
            </label>
            <input
              id="readTime"
              v-model.number="formData.readTime"
              type="number"
              min="1"
              placeholder="可选"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <!-- 标签输入 -->
          <div>
            <label for="tagInput" class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              标签
            </label>
            <div class="flex gap-2">
              <input
                id="tagInput"
                v-model="tagInput"
                type="text"
                placeholder="输入标签后按回车"
                @keyup.enter="addTag"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <BaseButton type="primary" @click="addTag">添加</BaseButton>
            </div>
          </div>
        </div>

        <!-- 已添加的标签 -->
        <div v-if="formData.tags.length > 0">
          <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            已添加的标签
          </label>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in formData.tags"
              :key="tag"
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              #{{ tag }}
              <button
                type="button"
                @click="removeTag(tag)"
                class="hover:text-red-500 transition-colors"
                aria-label="删除标签"
              >
                ×
              </button>
            </span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <BaseButton type="secondary" @click="handleCancel" :disabled="isLoading">
            取消
          </BaseButton>
          <BaseButton type="primary" :disabled="!isFormValid || isLoading" block>
            <span v-if="isLoading">发布中...</span>
            <span v-else>发布文章</span>
          </BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
</template>

