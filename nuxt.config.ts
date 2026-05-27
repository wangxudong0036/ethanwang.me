// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  css: ['~/assets/styles/main.scss'],

  site: {
    url: 'https://ethanwang.me',
    name: 'Ethan Wang',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      titleTemplate: '%s | Ethan Wang',
      meta: [
        { name: 'description', content: 'Ethan Wang 的个人博客 — 记录技术思考与生活片段' },
        { name: 'author', content: 'Ethan Wang' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  content: {
    highlight: {
      theme: 'github-dark',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  robots: {
    allow: '/',
  },
})
