# Ethan Wang 个人博客

基于 **Nuxt 4 + Vue 3 + Nuxt Content** 搭建的个人博客，文章以 Markdown 形式管理，构建时静态预渲染。

## 技术栈

- Nuxt 4 / Vue 3
- @nuxt/content（Markdown 内容）
- UnoCSS（样式）
- @nuxt/icon（图标）
- @nuxtjs/sitemap / @nuxtjs/robots（SEO）

## 开发

```bash
pnpm install
pnpm dev
```

访问 http://localhost:3000

## 构建

```bash
pnpm build    # 生产构建（含预渲染）
pnpm preview  # 预览构建产物
pnpm generate # 纯静态生成
```

## 写文章

在 `content/blog/` 目录下创建 `.md` 文件，frontmatter 示例：

```yaml
---
title: 文章标题
description: 摘要
date: 2026-05-27
tags:
  - Nuxt
draft: false
---
```

设置 `draft: true` 可隐藏草稿，不会出现在列表页。

## 部署（Cloudflare Pages）

1. 连接 GitHub 仓库 `wangxudong0036/ethanwang.me`
2. 构建设置：
   - **构建命令**：`pnpm install && pnpm build`
   - **输出目录**：`.output/public`
   - **Node 版本**：22
3. 绑定自定义域名 `ethanwang.me`

## 部署（Vercel）

1. 导入 GitHub 仓库
2. Framework Preset 选择 **Nuxt.js**（自动识别）
3. 绑定域名 `ethanwang.me`
