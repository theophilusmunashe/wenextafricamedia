import { _ as _sfc_main$6 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$7 } from './Menu-D6Dz6q5o.mjs';
import { useSSRContext, mergeProps, onUnmounted, unref } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0 } from './virtual_public-Bxc5qqGJ.mjs';
import { _ as _sfc_main$8 } from './Footer1-C-pVFrlQ.mjs';
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

const _sfc_main$5 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header-project1" }, _attrs))}><div class="container mt-100"><div class="row"><div class="col-lg-6 valign"><div class="full-width mb-30"><h1 class="fz-60">Artboard Studio</h1><p>We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities.</p></div></div><div class="col-lg-5 offset-lg-1"><div class="info"><div class="row"><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Category :</span><h6>Development</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Client :</span><h6>Envato</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Start Date :</span><h6>7 August 2021</h6></div></div><div class="col-md-6"><div class="item"><span class="opacity-8 mb-5">Designer :</span><h6>UiCamp</h6></div></div></div></div></div></div></div><div class="bg-img mt-100" data-background="/assets/imgs/works/projects/0/1.jpg"></div></header>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/Header.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding bord-thin-bottom" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-5"><h2 class="mb-50">The <br> Challenge</h2></div><div class="col-lg-7"><div class="text"><h5 class="mb-30 fw-400 line-height-40">The goal is there are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable.</h5><p class="fz-18">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&#39;t anything embarrassing hidden in the middle of text.</p></div></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/TopContent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const data = [
  {
    id: 1,
    image: "/assets/imgs/works/projects/0/2.jpg"
  },
  {
    id: 2,
    image: "/assets/imgs/works/projects/0/3.jpg"
  },
  {
    id: 3,
    image: "/assets/imgs/works/projects/0/4.jpg"
  },
  {
    id: 4,
    image: "/assets/imgs/works/projects/0/5.jpg"
  },
  {
    id: 5,
    image: "/assets/imgs/works/projects/0/6.jpg"
  },
  {
    id: 6,
    image: "/assets/imgs/works/projects/0/7.jpg"
  }
];
const _sfc_main$3 = {
  __name: "Works",
  __ssrInlineRender: true,
  setup(__props) {
    onUnmounted(() => {
      (void 0).removeEventListener("resize", handleResize);
    });
    function handleResize() {
      const allTriggers = ScrollTrigger.getAll();
      if ((void 0).innerWidth < 991 && allTriggers.length || (void 0).innerWidth > 991 && !allTriggers.length) {
        (void 0).location.reload();
      }
      allTriggers.forEach((trigger) => {
        trigger.update();
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "works thecontainer ontop" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div class="panel"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/Works.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding bord-thin-top" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-7"><div class="text"><h2 class="mb-50">The Solution</h2><h5 class="mb-30 fw-400">Global concrete manufacturers engaging with us to develop specific testing programms. </h5><p class="fz-18">Show your portfolio in a stylish and modern design. The template has a clean, professional code, the site is fully adaptive and unique. This is a template for those who appreciate minimalism and convenience. Embed videos, images, and a slider.</p></div></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/BottomContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "next-project section-padding sub-bg" }, _attrs))}><div class="contact-container"><div class="container"><div class="row"><div class="col-12"><div class="text-center"><h6 class="sub-title fz-18">Next Project</h6><div class="inline"><div class="d-flex align-items-center"><a href="/project2" class="animsition-link fz-70 fw-700 stroke">Concept Audio</a><span class="ml-15"><img${ssrRenderAttr("src", _imports_0)} alt="" class="icon-img-70"></span></div></div></div></div></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/NextProject.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "project1",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Project One`,
      bodyAttrs: {
        class: "main-bg"
      },
      script: [
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$6;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$7;
      const _component_ProjectOneHeader = _sfc_main$5;
      const _component_ProjectOneTopContent = __nuxt_component_4;
      const _component_ProjectOneWorks = _sfc_main$3;
      const _component_ProjectOneBottomContent = __nuxt_component_6;
      const _component_ProjectOneNextProject = __nuxt_component_7;
      const _component_CommonFooter1 = _sfc_main$8;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_ProjectOneHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectOneTopContent, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectOneWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectOneBottomContent, null, null, _parent));
      _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=project1-Bwz5_qBN.mjs.map
