<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 mx-auto w-full max-w-[var(--max-width-wide)] px-6 py-10">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
