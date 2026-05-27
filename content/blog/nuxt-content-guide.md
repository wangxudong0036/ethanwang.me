---
title: 用 Nuxt Content 搭建 Markdown 博客
description: 介绍如何使用 Nuxt Content v3 的 collection 机制管理 Markdown 文章。
date: 2026-05-22
tags:
  - Nuxt
  - Vue
draft: false
---

# 用 Nuxt Content 搭建 Markdown 博客

Nuxt Content 让 Markdown 文件变成了一等公民的内容源。只需在 `content/blog/` 目录下创建 `.md` 文件，框架会自动解析 frontmatter 并生成路由。

## Collection 配置

在 `content.config.ts` 中定义 collection：

```typescript
defineCollection({
  type: 'page',
  source: 'blog/**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
})
```

## 查询文章

使用 `queryCollection` 获取文章列表：

```typescript
const posts = await queryCollection('blog')
  .order('date', 'DESC')
  .all()
```

## 渲染内容

详情页使用 `<ContentRenderer>` 组件即可渲染 Markdown 正文，代码高亮由 Shiki 自动处理。

这种方案的优势是：**零后端、Git 版本管理、构建时预渲染**，非常适合个人博客。
