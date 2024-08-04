import { _ as _sfc_main$2 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, mergeProps, unref } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import './server.mjs';
import 'vue-router';

const data = [
  {
    id: 1,
    image: "/assets/imgs/works/full/1.jpg",
    link: "/project1",
    text: "Digital Retouch"
  },
  {
    id: 2,
    image: "/assets/imgs/works/full/2.jpg",
    link: "/project2",
    text: "Earthmade Aroma"
  },
  {
    id: 3,
    image: "/assets/imgs/works/full/3.jpg",
    link: "/project3",
    text: "Bank Rebranding"
  },
  {
    id: 4,
    image: "/assets/imgs/works/full/10.jpg",
    link: "/project4",
    text: "Day Starter"
  },
  {
    id: 5,
    image: "/assets/imgs/works/full/5.jpg",
    link: "/project1",
    text: "Blue Adobe MAX"
  },
  {
    id: 6,
    image: "/assets/imgs/works/full/6.jpg",
    link: "/project2",
    text: "Carved Wood"
  },
  {
    id: 7,
    image: "/assets/imgs/works/full/7.jpg",
    link: "/project3",
    text: "Viclone"
  },
  {
    id: 8,
    image: "/assets/imgs/works/full/8.jpg",
    link: "/project4",
    text: "Blom Air Purifier"
  },
  {
    id: 9,
    image: "/assets/imgs/works/full/11.jpg",
    link: "/project1",
    text: "Avocado Cutter"
  }
];
const _sfc_main$1 = {
  __name: "InteractiveVertical",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "inter-links-center vertical d-flex align-items-end section-padding pb-80" }, _attrs))}><div class="container-xxl"><div class="row"><div class="col-12 d-flex align-items-center justify-content-center"><div class="links-text"><ul class="rest"><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<li${ssrRenderAttr("data-tab", `tab-${item.id}`)}><h2><span class="num">0${ssrInterpolate(item.id)}.</span><a${ssrRenderAttr("href", item.link)} class="animsition-link"><span class="text f-bold">${ssrInterpolate(item.text)}</span></a></h2></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div><div class="links-img"><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div${ssrRenderAttr("id", `tab-${item.id}`)} class="img" data-overlay-dark="3"><img${ssrRenderAttr("src", item.image)} alt=""></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/InteractiveVertical.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "interactive-vertical",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Portfolio Interactive Vertical`,
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$2;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$3;
      const _component_PortfolioInteractiveVertical = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_PortfolioInteractiveVertical, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/interactive-vertical.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=interactive-vertical-DsSx5EDw.mjs.map
