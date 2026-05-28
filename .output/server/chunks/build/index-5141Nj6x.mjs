import { defineComponent, ref, withAsyncContext, computed, unref, isRef, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_2 } from './BlogCard-C_Aw3i09.mjs';
import { k as useSeoMeta, b as useAsyncData } from './server.mjs';
import { q as queryCollection } from './client-DlX2yTkq.mjs';
import './nuxt-link-D3GeAEq5.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TagFilter",
  __ssrInlineRender: true,
  props: {
    tags: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap gap-2" }, _attrs))}><button class="${ssrRenderClass([__props.modelValue === null ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10" : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]", "text-xs px-3 py-1 rounded-full border transition-colors"])}"> 全部 </button><!--[-->`);
      ssrRenderList(__props.tags, (tag) => {
        _push(`<button class="${ssrRenderClass([__props.modelValue === tag ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10" : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]", "text-xs px-3 py-1 rounded-full border transition-colors"])}">${ssrInterpolate(tag)}</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TagFilter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "TagFilter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "博客",
      description: "Ethan Wang 的技术博客 — 前端开发、Vue 生态与个人思考"
    });
    const selectedTag = ref(null);
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "blog-list",
      () => queryCollection("blog").order("date", "DESC").all()
    )), __temp = await __temp, __restore(), __temp);
    const publishedPosts = computed(
      () => (posts.value ?? []).filter((post) => !post.draft)
    );
    const allTags = computed(() => {
      const tagSet = /* @__PURE__ */ new Set();
      for (const post of publishedPosts.value) {
        for (const tag of post.tags ?? []) {
          tagSet.add(tag);
        }
      }
      return [...tagSet].sort();
    });
    const filteredPosts = computed(() => {
      if (!selectedTag.value) return publishedPosts.value;
      return publishedPosts.value.filter(
        (post) => post.tags?.includes(selectedTag.value)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TagFilter = __nuxt_component_0;
      const _component_BlogCard = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-3xl font-bold text-[var(--color-text)]">博客</h1><p class="mt-3 text-[var(--color-text-muted)]"> 共 ${ssrInterpolate(unref(publishedPosts).length)} 篇文章 </p>`);
      if (unref(allTags).length) {
        _push(`<div class="mt-6">`);
        _push(ssrRenderComponent(_component_TagFilter, {
          modelValue: unref(selectedTag),
          "onUpdate:modelValue": ($event) => isRef(selectedTag) ? selectedTag.value = $event : null,
          tags: unref(allTags)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(filteredPosts).length) {
        _push(`<div class="mt-8 grid gap-4"><!--[-->`);
        ssrRenderList(unref(filteredPosts), (post) => {
          _push(ssrRenderComponent(_component_BlogCard, {
            key: post.path,
            post
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="mt-8 text-[var(--color-text-muted)]"> 没有找到匹配的文章。 </p>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-5141Nj6x.mjs.map
