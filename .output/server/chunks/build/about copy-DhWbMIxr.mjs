import { _ as _sfc_main$2 } from './virtual_public-DtKfMkMj.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './Menu-BFis53zK.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-BU9vMVzG.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_7 } from './NextProject-DFbER5VW.mjs';
import { _ as _sfc_main$4 } from './Footer1-CY2Y8zy_.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './nuxt-link-P6SDANQl.mjs';
import 'vue-router';
import './virtual_public-Bxc5qqGJ.mjs';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vid-sec sub-bg pb-70" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="vid-intro"><div class="video-container"><video autoplay loop muted><source${ssrRenderAttr("src", _imports_0)} type="video/mp4"></video></div></div></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AboutCopy/Video.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "about copy",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `WeNext Africa Media: Projects`,
      bodyAttrs: {
        class: "main-bg"
      },
      script: [
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$2;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$3;
      const _component_AboutCopyVideo = __nuxt_component_3;
      const _component_ProjectOneNextProject = __nuxt_component_7;
      const _component_CommonFooter1 = _sfc_main$4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><br><br><br><br><br><br><br><br>`);
      _push(ssrRenderComponent(_component_AboutCopyVideo, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectOneNextProject, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about copy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about copy-DhWbMIxr.mjs.map
