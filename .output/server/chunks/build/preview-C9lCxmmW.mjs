import { _ as _sfc_main$1, a as _sfc_main$2 } from './ProgressScroll-DEN5fYvl.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {
  __name: "preview",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      link: [{ rel: "stylesheet", href: "/landing-preview/css/preview-style.css" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonCursor = _sfc_main$1;
      const _component_CommonProgressScroll = _sfc_main$2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonCursor, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonProgressScroll, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/preview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=preview-C9lCxmmW.mjs.map
