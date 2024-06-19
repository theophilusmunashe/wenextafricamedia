import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';

const _sfc_main = {
  __name: "Loader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "loader-wrap" }, _attrs))}><svg viewBox="0 0 1000 1000" preserveAspectRatio="none"><path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path></svg><div class="loader-wrap-heading"><span><h2 class="load-text"><span>S</span><span>o</span><span>u</span><span>r</span><span>c</span><span>e</span><span>s</span><span>-</span><span>C</span><span>o</span><span>n</span><span>s</span><span>u</span><span>l</span><span>t</span><span>a</span><span>n</span><span>t</span><span>s</span></h2></span></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Loader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/assets/imgs/logo-light.png");

export { _sfc_main as _, _imports_0 as a };
//# sourceMappingURL=virtual_public-BFwKEG61.mjs.map
