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
    number: "01",
    category: "Digital Design",
    title: "Retouch Photo"
  },
  {
    id: 2,
    image: "/assets/imgs/works/full/2.jpg",
    link: "/project2",
    number: "02",
    category: "Branding",
    title: "Earthmade Aroma"
  },
  {
    id: 3,
    image: "/assets/imgs/works/full/3.jpg",
    link: "/project3",
    number: "03",
    category: "Branding",
    title: "Bank Rebranding"
  },
  {
    id: 4,
    image: "/assets/imgs/works/full/4.jpg",
    link: "/project4",
    number: "04",
    category: "Product Design",
    title: "The joy of music"
  },
  {
    id: 5,
    image: "/assets/imgs/works/full/5.jpg",
    link: "/project1",
    number: "05",
    category: "Product Design",
    title: "Blue Adobe MAX"
  },
  {
    id: 6,
    image: "/assets/imgs/works/full/6.jpg",
    link: "/project2",
    number: "06",
    category: "Product Design",
    title: "Carved Wood"
  },
  {
    id: 7,
    image: "/assets/imgs/works/full/8.jpg",
    link: "/project3",
    number: "07",
    category: "Product Design",
    title: "Blom Air Purifier"
  }
];
const _sfc_main$1 = {
  __name: "InteractiveInline",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "interactive-inline d-flex align-items-end" }, _attrs))}><div class="container"><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div class="item block" data-fx="1"><a${ssrRenderAttr("href", item.link)} class="block__link animsition-link"${ssrRenderAttr("data-img", item.image)}></a><div class="cont"><span class="mb-10 text-u">${ssrInterpolate(item.number)}<span class="ml-10 mr-10">/</span>${ssrInterpolate(item.category)}</span><h4 class="f-bold">${ssrInterpolate(item.title)}</h4></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/InteractiveInline.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "interactive-inline",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Portfolio Interactive Inline`,
      bodyAttrs: {
        class: "main-bg"
      },
      link: [
        { rel: "stylesheet", href: "/assets/css/base.css" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$2;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$3;
      const _component_PortfolioInteractiveInline = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_PortfolioInteractiveInline, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/interactive-inline.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=interactive-inline-UritutRm.mjs.map
