<script setup lang="ts">
useSeoMeta({
  title: '首页',
  description: 'Ethan Wang 的个人博客 — 记录技术思考与生活片段',
})

const { data: posts } = await useAsyncData('home-recent-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all(),
)

const recentPosts = computed(() =>
  (posts.value ?? [])
    .filter(post => !post.draft)
    .slice(0, 3),
)
</script>

<template>
  <div>
    <section class="py-12 md:py-20">
      <p class="text-sm text-[var(--color-accent)] font-medium tracking-wide uppercase">
        Personal Blog
      </p>
      <h1 class="mt-3 text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight">
        你好，我是 Ethan Wang
      </h1>
      <p class="mt-6 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed">
        前端开发者，热爱 Vue 生态与简洁的工程实践。
        在这里记录技术探索、项目经验与偶尔的随想。
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          阅读博客
          <Icon name="mdi:arrow-right" />
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
        >
          了解更多
        </NuxtLink>
      </div>
    </section>

    <section v-if="recentPosts.length" class="py-10 border-t border-[var(--color-border)]">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-[var(--color-text)]">最新文章</h2>
        <NuxtLink to="/blog" class="text-sm text-[var(--color-accent)] hover:underline">
          查看全部
        </NuxtLink>
      </div>
      <div class="grid gap-4">
        <BlogCard v-for="post in recentPosts" :key="post.path" :post="post" />
      </div>
    </section>
  </div>
</template>
