<script setup lang="ts">
useSeoMeta({
  title: '关于',
  description: '关于 Ethan Wang — 前端开发者，Vue / Nuxt 爱好者',
})

const skills = [
  { name: 'Vue / Nuxt', icon: 'logos:vue' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'UnoCSS', icon: 'logos:unocss' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
]

const contacts = [
  { label: 'GitHub', href: 'https://github.com/wangxudong0036', icon: 'mdi:github' },
  { label: 'Email', href: 'mailto:hello@ethanwang.me', icon: 'mdi:email-outline' },
]
</script>

<template>
  <div class="max-w-[var(--max-width)]">
    <h1 class="text-3xl font-bold text-[var(--color-text)]">关于我</h1>
    <p class="mt-6 text-[var(--color-text-muted)] leading-relaxed">
      我是 Ethan Wang，一名专注于前端开发的工程师。
      日常主要使用 Vue 生态构建 Web 应用，关注代码质量、用户体验与工程效率。
    </p>
    <p class="mt-4 text-[var(--color-text-muted)] leading-relaxed">
      这个博客使用 Nuxt 4 + Nuxt Content 搭建，文章以 Markdown 形式存储在 Git 仓库中，
      构建时静态预渲染，部署到 Cloudflare Pages。
    </p>

    <section class="mt-10">
      <h2 class="text-lg font-semibold text-[var(--color-text)] mb-4">技术栈</h2>
      <div class="flex flex-wrap gap-3">
        <span
          v-for="skill in skills"
          :key="skill.name"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-sm text-[var(--color-text-muted)]"
        >
          <Icon :name="skill.icon" />
          {{ skill.name }}
        </span>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="text-lg font-semibold text-[var(--color-text)] mb-4">联系方式</h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          <Icon :name="contact.icon" />
          {{ contact.label }}
        </a>
      </div>
    </section>
  </div>
</template>
