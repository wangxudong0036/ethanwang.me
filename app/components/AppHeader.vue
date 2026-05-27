<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

const links = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '博客' },
  { to: '/about', label: '关于' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
    <div class="mx-auto max-w-[var(--max-width-wide)] flex items-center justify-between px-6 py-4">
      <NuxtLink to="/" class="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)]">
        Ethan Wang
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm transition-colors"
          :class="isActive(link.to) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button
        class="md:hidden text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        aria-label="切换菜单"
        @click="mobileOpen = !mobileOpen"
      >
        <Icon :name="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="text-xl" />
      </button>
    </div>

    <nav
      v-if="mobileOpen"
      class="md:hidden border-t border-[var(--color-border)] px-6 py-4 flex flex-col gap-4"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-sm"
        :class="isActive(link.to) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
