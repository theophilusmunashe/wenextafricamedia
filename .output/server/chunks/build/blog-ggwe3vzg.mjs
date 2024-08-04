import { _ as _sfc_main$3 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$4 } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, mergeProps, unref } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$5 } from './Footer1-C1sHJYFV.mjs';
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

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "header-blog" }, _attrs))}><div class="container"><div class="row"><div class="col-12"><div class="cont text-center"><p><a href="/landing" class="animsition-link">Home</a><span class="ml-10 mr-10">/</span><span>Blog List</span></p><h1>Blog &amp; Insights</h1></div></div></div></div></header>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Blog/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const data = [
  {
    id: 1,
    title: "Definitive Guide to Make a Daily More Productive Working Flow.",
    category: "Inspiration",
    image: "/assets/imgs/blog/b7.jpg",
    date: {
      day: "07",
      month: "August"
    },
    link: "/blog-details"
  },
  {
    id: 2,
    title: "Utilizing mobile technology in the field.",
    category: "Inspiration",
    image: "/assets/imgs/blog/b2.jpg",
    date: {
      day: "07",
      month: "August"
    },
    link: "/blog-details"
  },
  {
    id: 3,
    title: "Ways of Lying to Yourself About Your New Relationship.",
    category: "Inspiration",
    date: "7 August",
    link: "/blog-details"
  },
  {
    id: 4,
    title: "The Start-Up Ultimate Guide to Make Your WordPress Journal.",
    category: "Inspiration",
    image: "/assets/imgs/blog/b5.jpg",
    date: {
      day: "07",
      month: "August"
    },
    link: "/blog-details"
  },
  {
    id: 5,
    title: "The Small Change That Creates Massive Results In Your Life.",
    category: "Inspiration",
    image: "/assets/imgs/blog/b4.jpg",
    date: {
      day: "07",
      month: "August"
    },
    link: "/blog-details"
  },
  {
    id: 6,
    title: "When You Are Down And Out How Do You Get Up And Go Forward.",
    category: "Inspiration",
    image: "/assets/imgs/blog/b6.jpg",
    date: {
      day: "07",
      month: "August"
    },
    link: "/blog-details"
  },
  {
    id: 7,
    title: "Facts about Business that you never knew.",
    category: "Inspiration",
    image: "/assets/imgs/blog/b1.jpg",
    date: {
      day: "07",
      month: "August"
    },
    link: "/blog-details"
  },
  {
    id: 8,
    title: "20 Up-and-comers to watch in the Design Industry.",
    category: "Inspiration",
    date: "7 August",
    link: "/blog-details"
  },
  {
    id: 9,
    title: "How to master Marketing in 6 simple Steps.",
    category: "Inspiration",
    image: "/assets/imgs/blog/b3.jpg",
    date: {
      day: "07",
      month: "August"
    },
    link: "/blog-details"
  }
];
const _sfc_main$1 = {
  __name: "Blogs",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "blog-column section-padding pt-90" }, _attrs))}><div class="container"><div class="gallery"><div class="row"><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div class="items col-lg-4 col-md-6"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""><span class="date"><strong>${ssrInterpolate(item.date.day)}</strong> ${ssrInterpolate(item.date.month)}</span></div><div class="cont"><span class="sub-title mb-15 opacity-8">${ssrInterpolate(item.category)}</span><h4>${ssrInterpolate(item.title)}</h4><a${ssrRenderAttr("href", item.link)} class="animsition-link more mt-20">Read More</a></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Blog/Blogs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "blog",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Blog`,
      bodyAttrs: {
        class: "main-bg"
      },
      script: [
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$3;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$4;
      const _component_BlogHeader = __nuxt_component_3;
      const _component_BlogBlogs = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg">`);
      _push(ssrRenderComponent(_component_BlogHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_BlogBlogs, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, { subBg: true }, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=blog-ggwe3vzg.mjs.map
