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
    title: "Digital Retouch",
    category: "Digital Design"
  },
  {
    id: 2,
    image: "/assets/imgs/works/full/2.jpg",
    link: "/project2",
    title: "Earthmade Aroma",
    category: "Branding"
  },
  {
    id: 3,
    image: "/assets/imgs/works/full/3.jpg",
    link: "/project3",
    title: "Bank Rebranding",
    category: "Branding"
  },
  {
    id: 4,
    image: "/assets/imgs/works/full/10.jpg",
    link: "/project4",
    title: "Day Starter",
    category: "Product Design"
  },
  {
    id: 5,
    image: "/assets/imgs/works/full/5.jpg",
    link: "/project1",
    title: "Blue Adobe MAX",
    category: "Digital Art"
  },
  {
    id: 6,
    image: "/assets/imgs/works/full/6.jpg",
    link: "/project2",
    title: "Carved Wood",
    category: "Product Design"
  },
  {
    id: 7,
    image: "/assets/imgs/works/full/7.jpg",
    link: "/project3",
    title: "Viclone",
    category: "Digital Art"
  },
  {
    id: 8,
    image: "/assets/imgs/works/full/8.jpg",
    link: "/project4",
    title: "Blom Air Purifier",
    category: "Digital Art"
  },
  {
    id: 9,
    image: "/assets/imgs/works/full/11.jpg",
    link: "/project1",
    title: "Avocado Cutter",
    category: "Digital Art"
  }
];
const _sfc_main$1 = {
  __name: "InteractiveCenter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "interactive-center" }, _attrs))}><div class="container text-center"><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div class="item block" data-fx="1"><a${ssrRenderAttr("href", item.link)} class="block__link animsition-link"${ssrRenderAttr("data-img", item.image)}><div class="cont"><h4 class="f-bold">${ssrInterpolate(item.title)}</h4><p>${ssrInterpolate(item.category)}</p></div></a></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/InteractiveCenter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "interactive-center",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Portfolio Interactive Center`,
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
      const _component_PortfolioInteractiveCenter = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_PortfolioInteractiveCenter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/interactive-center.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=interactive-center-BddioDrO.mjs.map
