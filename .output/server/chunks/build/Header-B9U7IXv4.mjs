import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Header",
  __ssrInlineRender: true,
  props: ["isCenter"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "portfolio-header section-padding ontop main-bg" }, _attrs))}><div class="container mt-80"><div class="row"><div class="col-12"><div class="${ssrRenderClass(`cont ${__props.isCenter ? "text-center" : ""}`)}"><h1 class="fz-80 fw-500">Building <br> digital experiences</h1></div></div></div></div></header>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Header-B9U7IXv4.mjs.map
