import { _ as __nuxt_component_0 } from './nuxt-link-D3GeAEq5.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlogCard",
  __ssrInlineRender: true,
  props: {
    post: {}
  },
  setup(__props) {
    function formatDate(date) {
      return new Date(date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.post.path,
        class: "group block p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-accent)] transition-colors"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<time class="text-xs text-[var(--color-text-muted)]"${_scopeId}>${ssrInterpolate(formatDate(__props.post.date))}</time><h2 class="mt-2 text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors"${_scopeId}>${ssrInterpolate(__props.post.title)}</h2>`);
            if (__props.post.description) {
              _push2(`<p class="mt-2 text-sm text-[var(--color-text-muted)] line-clamp-2"${_scopeId}>${ssrInterpolate(__props.post.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.post.tags?.length) {
              _push2(`<div class="mt-3 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.post.tags, (tag) => {
                _push2(`<span class="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"${_scopeId}>${ssrInterpolate(tag)}</span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("time", { class: "text-xs text-[var(--color-text-muted)]" }, toDisplayString(formatDate(__props.post.date)), 1),
              createVNode("h2", { class: "mt-2 text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors" }, toDisplayString(__props.post.title), 1),
              __props.post.description ? (openBlock(), createBlock("p", {
                key: 0,
                class: "mt-2 text-sm text-[var(--color-text-muted)] line-clamp-2"
              }, toDisplayString(__props.post.description), 1)) : createCommentVNode("", true),
              __props.post.tags?.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "mt-3 flex flex-wrap gap-2"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.post.tags, (tag) => {
                  return openBlock(), createBlock("span", {
                    key: tag,
                    class: "text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }, toDisplayString(tag), 1);
                }), 128))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "BlogCard" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=BlogCard-C_Aw3i09.mjs.map
