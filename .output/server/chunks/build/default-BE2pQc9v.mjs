import { _ as __nuxt_component_0$1 } from './nuxt-link-D3GeAEq5.mjs';
import __nuxt_component_0$2 from './index-D98F-I_4.mjs';
import { mergeProps, defineComponent, ref, watch, withCtx, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, h as useRoute } from './server.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const mobileOpen = ref(false);
    const links = [
      { to: "/", label: "首页" },
      { to: "/blog", label: "博客" },
      { to: "/about", label: "关于" }
    ];
    function isActive(path) {
      if (path === "/") return route.path === "/";
      return route.path.startsWith(path);
    }
    watch(() => route.path, () => {
      mobileOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md" }, _attrs))}><div class="mx-auto max-w-[var(--max-width-wide)] flex items-center justify-between px-6 py-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ethan Wang `);
          } else {
            return [
              createTextVNode(" Ethan Wang ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center gap-8"><!--[-->`);
      ssrRenderList(links, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: ["text-sm transition-colors", isActive(link.to) ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><button class="md:hidden text-[var(--color-text-muted)] hover:text-[var(--color-text)]" aria-label="切换菜单">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(mobileOpen) ? "mdi:close" : "mdi:menu",
        class: "text-xl"
      }, null, _parent));
      _push(`</button></div>`);
      if (unref(mobileOpen)) {
        _push(`<nav class="md:hidden border-t border-[var(--color-border)] px-6 py-4 flex flex-col gap-4"><!--[-->`);
        ssrRenderList(links, (link) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: link.to,
            to: link.to,
            class: ["text-sm", isActive(link.to) ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(link.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "AppHeader" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-[var(--color-border)] mt-auto" }, _attrs))}><div class="mx-auto max-w-[var(--max-width-wide)] px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]"><p>© ${ssrInterpolate(unref(year))} Ethan Wang. All rights reserved.</p><div class="flex items-center gap-4"><a href="https://github.com/wangxudong0036" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-[var(--color-accent)]">`);
      _push(ssrRenderComponent(_component_Icon, { name: "mdi:github" }, null, _parent));
      _push(` GitHub </a><a href="mailto:hello@ethanwang.me" class="flex items-center gap-1.5 hover:text-[var(--color-accent)]">`);
      _push(ssrRenderComponent(_component_Icon, { name: "mdi:email-outline" }, null, _parent));
      _push(` Email </a></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "AppFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_AppFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main class="flex-1 mx-auto w-full max-w-[var(--max-width-wide)] px-6 py-10">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-BE2pQc9v.mjs.map
