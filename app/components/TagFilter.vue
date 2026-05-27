<script setup lang="ts">
const props = defineProps<{
  tags: string[]
  modelValue: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

function select(tag: string | null) {
  emit('update:modelValue', tag)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      class="text-xs px-3 py-1 rounded-full border transition-colors"
      :class="modelValue === null
        ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10'
        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]'"
      @click="select(null)"
    >
      全部
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      class="text-xs px-3 py-1 rounded-full border transition-colors"
      :class="modelValue === tag
        ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10'
        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]'"
      @click="select(tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>
