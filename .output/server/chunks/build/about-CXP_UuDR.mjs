import __nuxt_component_0 from './index-D98F-I_4.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { k as useSeoMeta } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'consola';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'nuxtseo-shared/utils';
import 'node:path';
import 'better-sqlite3';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "关于",
      description: "关于 Ethan Wang — 前端开发者，Vue / Nuxt 爱好者"
    });
    const skills = [
      { name: "Vue / Nuxt", icon: "logos:vue" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "UnoCSS", icon: "logos:unocss" },
      { name: "Node.js", icon: "logos:nodejs-icon" }
    ];
    const contacts = [
      { label: "GitHub", href: "https://github.com/wangxudong0036", icon: "mdi:github" },
      { label: "Email", href: "mailto:hello@ethanwang.me", icon: "mdi:email-outline" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[var(--max-width)]" }, _attrs))}><h1 class="text-3xl font-bold text-[var(--color-text)]">关于我</h1><p class="mt-6 text-[var(--color-text-muted)] leading-relaxed"> 我是 Ethan Wang，一名专注于前端开发的工程师。 日常主要使用 Vue 生态构建 Web 应用，关注代码质量、用户体验与工程效率。 </p><p class="mt-4 text-[var(--color-text-muted)] leading-relaxed"> 这个博客使用 Nuxt 4 + Nuxt Content 搭建，文章以 Markdown 形式存储在 Git 仓库中， 构建时静态预渲染，部署到 Cloudflare Pages。 </p><section class="mt-10"><h2 class="text-lg font-semibold text-[var(--color-text)] mb-4">技术栈</h2><div class="flex flex-wrap gap-3"><!--[-->`);
      ssrRenderList(skills, (skill) => {
        _push(`<span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-sm text-[var(--color-text-muted)]">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: skill.icon
        }, null, _parent));
        _push(` ${ssrInterpolate(skill.name)}</span>`);
      });
      _push(`<!--]--></div></section><section class="mt-10"><h2 class="text-lg font-semibold text-[var(--color-text)] mb-4">联系方式</h2><div class="flex flex-wrap gap-4"><!--[-->`);
      ssrRenderList(contacts, (contact) => {
        _push(`<a${ssrRenderAttr("href", contact.href)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: contact.icon
        }, null, _parent));
        _push(` ${ssrInterpolate(contact.label)}</a>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-CXP_UuDR.mjs.map
