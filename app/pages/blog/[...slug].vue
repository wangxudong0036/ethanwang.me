<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!page.value || page.value.draft) {
  throw createError({ statusCode: 404, message: '文章未找到' })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description ?? page.value.title,
  ogTitle: page.value.title,
  ogDescription: page.value.description ?? page.value.title,
  ogType: 'article',
  articlePublishedTime: page.value.date?.toISOString?.() ?? String(page.value.date),
})

const { data: allPosts } = await useAsyncData('blog-all-for-nav', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all(),
)

const surroundings = computed(() => {
  const published = (allPosts.value ?? []).filter(post => !post.draft)
  const index = published.findIndex(post => post.path === route.path)
  if (index === -1) return []
  return [published[index - 1], published[index + 1]].filter(Boolean)
})

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: page.value.title,
        description: page.value.description,
        datePublished: page.value.date,
        author: {
          '@type': 'Person',
          name: 'Ethan Wang',
        },
      }),
    },
  ],
})
</script>

<template>
  <article v-if="page" class="max-w-[var(--max-width)]">
    <header class="mb-8">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] mb-6"
      >
        <Icon name="mdi:arrow-left" />
        返回博客
      </NuxtLink>
      <time class="text-sm text-[var(--color-text-muted)]">{{ formatDate(page.date) }}</time>
      <h1 class="mt-2 text-3xl md:text-4xl font-bold text-[var(--color-text)]">
        {{ page.title }}
      </h1>
      <p v-if="page.description" class="mt-3 text-[var(--color-text-muted)]">
        {{ page.description }}
      </p>
      <div v-if="page.tags?.length" class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="tag in page.tags"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
        >
          {{ tag }}
        </span>
      </div>
    </header>

    <div class="prose">
      <ContentRenderer :value="page" />
    </div>

    <nav
      v-if="surroundings.length"
      class="mt-12 pt-8 border-t border-[var(--color-border)] grid sm:grid-cols-2 gap-4"
    >
      <NuxtLink
        v-if="surroundings[0]"
        :to="surroundings[0].path"
        class="group p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
      >
        <span class="text-xs text-[var(--color-text-muted)]">上一篇</span>
        <p class="mt-1 text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
          {{ surroundings[0].title }}
        </p>
      </NuxtLink>
      <NuxtLink
        v-if="surroundings[1]"
        :to="surroundings[1].path"
        class="group p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors sm:text-right"
      >
        <span class="text-xs text-[var(--color-text-muted)]">下一篇</span>
        <p class="mt-1 text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
          {{ surroundings[1].title }}
        </p>
      </NuxtLink>
    </nav>
  </article>
</template>
