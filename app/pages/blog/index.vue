<script setup lang="ts">
useSeoMeta({
  title: '博客',
  description: 'Ethan Wang 的技术博客 — 前端开发、Vue 生态与个人思考',
})

const selectedTag = ref<string | null>(null)

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all(),
)

const publishedPosts = computed(() =>
  (posts.value ?? []).filter(post => !post.draft),
)

const allTags = computed(() => {
  const tagSet = new Set<string>()
  for (const post of publishedPosts.value) {
    for (const tag of post.tags ?? []) {
      tagSet.add(tag)
    }
  }
  return [...tagSet].sort()
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return publishedPosts.value
  return publishedPosts.value.filter(post =>
    post.tags?.includes(selectedTag.value!),
  )
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-[var(--color-text)]">博客</h1>
    <p class="mt-3 text-[var(--color-text-muted)]">
      共 {{ publishedPosts.length }} 篇文章
    </p>

    <div v-if="allTags.length" class="mt-6">
      <TagFilter v-model="selectedTag" :tags="allTags" />
    </div>

    <div v-if="filteredPosts.length" class="mt-8 grid gap-4">
      <BlogCard v-for="post in filteredPosts" :key="post.path" :post="post" />
    </div>

    <p v-else class="mt-8 text-[var(--color-text-muted)]">
      没有找到匹配的文章。
    </p>
  </div>
</template>
