<script setup lang="ts">
defineProps<{
  post: {
    title: string
    description?: string
    date: string | Date
    tags?: string[]
    path: string
  }
}>()

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="group block p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-accent)] transition-colors"
  >
    <time class="text-xs text-[var(--color-text-muted)]">{{ formatDate(post.date) }}</time>
    <h2 class="mt-2 text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
      {{ post.title }}
    </h2>
    <p v-if="post.description" class="mt-2 text-sm text-[var(--color-text-muted)] line-clamp-2">
      {{ post.description }}
    </p>
    <div v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
      >
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>
