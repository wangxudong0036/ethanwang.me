<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-[var(--color-border)] mt-auto">
    <div class="mx-auto max-w-[var(--max-width-wide)] px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
      <p>&copy; {{ year }} Ethan Wang. All rights reserved.</p>
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/wangxudong0036"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 hover:text-[var(--color-accent)]"
        >
          <Icon name="mdi:github" />
          GitHub
        </a>
        <a
          href="mailto:hello@ethanwang.me"
          class="flex items-center gap-1.5 hover:text-[var(--color-accent)]"
        >
          <Icon name="mdi:email-outline" />
          Email
        </a>
      </div>
    </div>
  </footer>
</template>
