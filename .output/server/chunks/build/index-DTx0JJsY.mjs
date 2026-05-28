import { _ as __nuxt_component_0 } from './nuxt-link-D3GeAEq5.mjs';
import __nuxt_component_0$1 from './index-D98F-I_4.mjs';
import { _ as __nuxt_component_2 } from './BlogCard-C_Aw3i09.mjs';
import { defineComponent, withAsyncContext, computed, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { k as useSeoMeta, b as useAsyncData } from './server.mjs';
import { q as queryCollection } from './client-DlX2yTkq.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "首页",
      description: "Ethan Wang 的个人博客 — 记录技术思考与生活片段"
    });
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "home-recent-posts",
      () => queryCollection("blog").order("date", "DESC").all()
    )), __temp = await __temp, __restore(), __temp);
    const recentPosts = computed(
      () => (posts.value ?? []).filter((post) => !post.draft).slice(0, 3)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      const _component_BlogCard = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="py-12 md:py-20"><p class="text-sm text-[var(--color-accent)] font-medium tracking-wide uppercase"> Personal Blog </p><h1 class="mt-3 text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight"> 你好，我是 Ethan Wang </h1><p class="mt-6 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed"> 前端开发者，热爱 Vue 生态与简洁的工程实践。 在这里记录技术探索、项目经验与偶尔的随想。 </p><div class="mt-8 flex flex-wrap gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 阅读博客 `);
            _push2(ssrRenderComponent(_component_Icon, { name: "mdi:arrow-right" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" 阅读博客 "),
              createVNode(_component_Icon, { name: "mdi:arrow-right" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 了解更多 `);
          } else {
            return [
              createTextVNode(" 了解更多 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      if (unref(recentPosts).length) {
        _push(`<section class="py-10 border-t border-[var(--color-border)]"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-[var(--color-text)]">最新文章</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/blog",
          class: "text-sm text-[var(--color-accent)] hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 查看全部 `);
            } else {
              return [
                createTextVNode(" 查看全部 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid gap-4"><!--[-->`);
        ssrRenderList(unref(recentPosts), (post) => {
          _push(ssrRenderComponent(_component_BlogCard, {
            key: post.path,
            post
          }, null, _parent));
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DTx0JJsY.mjs.map
