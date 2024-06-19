import { _ as _sfc_main$5 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$6 } from './Menu-D6Dz6q5o.mjs';
import { useSSRContext, mergeProps, unref, withCtx, createVNode, ref } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0$2 } from './virtual_public-Bxc5qqGJ.mjs';
import { _ as _sfc_main$7 } from './Footer1-C-pVFrlQ.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import './nuxt-link-P6SDANQl.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _imports_0$1 = publicAssetsURL("/assets/imgs/works/projects/2/1.jpg");
const _imports_1$1 = publicAssetsURL("/assets/imgs/works/projects/2/2.jpg");
const _imports_2$1 = publicAssetsURL("/assets/imgs/works/projects/2/3.jpg");
const _sfc_main$4 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const swiperOptions = {
      modules: [Navigation, Autoplay],
      slidesPerView: 2,
      loop: true,
      centeredSlides: true,
      spaceBetween: 30
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header-project2 section-padding pb-0" }, _attrs))}><div class="container mt-80 mb-80"><div class="row"><div class="col-lg-6 valign"><div class="full-width mb-30"><h1 class="fz-60">Artboard Studio</h1><p>We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities.</p></div></div><div class="col-lg-5 offset-lg-1"><div class="info"><div class="row"><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Category :</span><h6>Development</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Client :</span><h6>Envato</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Start Date :</span><h6>7 August 2023</h6></div></div><div class="col-md-6"><div class="item"><span class="opacity-8 mb-5">Designer :</span><h6>UiCamp</h6></div></div></div></div></div></div></div><div class="container-fluid rest"><div class="project2"><div id="content-carousel-container-unq-project2" class="swiper-container">`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps(swiperOptions, {
        class: "swiper-container",
        id: "content-carousel-container-unq-project2"
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SwiperSlide), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="img"${_scopeId2}><img${ssrRenderAttr("src", _imports_0$1)} alt=""${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "img" }, [
                      createVNode("img", {
                        src: _imports_0$1,
                        alt: ""
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SwiperSlide), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="img"${_scopeId2}><img${ssrRenderAttr("src", _imports_1$1)} alt=""${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "img" }, [
                      createVNode("img", {
                        src: _imports_1$1,
                        alt: ""
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SwiperSlide), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="img"${_scopeId2}><img${ssrRenderAttr("src", _imports_2$1)} alt=""${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "img" }, [
                      createVNode("img", {
                        src: _imports_2$1,
                        alt: ""
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SwiperSlide), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "img" }, [
                    createVNode("img", {
                      src: _imports_0$1,
                      alt: ""
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(SwiperSlide), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "img" }, [
                    createVNode("img", {
                      src: _imports_1$1,
                      alt: ""
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(SwiperSlide), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "img" }, [
                    createVNode("img", {
                      src: _imports_2$1,
                      alt: ""
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/Two/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "TopContent",
  __ssrInlineRender: true,
  setup(__props) {
    const accordionData = ref([
      {
        title: "The Power of Influencer Marketing",
        content: "Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.",
        delay: ".1s"
      },
      {
        title: "Unique and Influential Design",
        content: "Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.",
        delay: ".3s"
      },
      {
        title: "We Build and Activate Brands",
        content: "Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.",
        delay: ".5s"
      },
      {
        title: "Unique and Influential Design",
        content: "Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.",
        delay: ".7s"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding bord-thin-bottom" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-5"><h2 class="mb-50">The <br> Challenge</h2></div><div class="col-lg-7"><div class="text"><h5 class="mb-30 fw-400 line-height-40">The goal is there are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable.</h5><p class="fz-18">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&#39;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&#39;t anything embarrassing hidden in the middle of text.</p></div><div class="accordion bord mt-100"><!--[-->`);
      ssrRenderList(accordionData.value, (item, index) => {
        _push(`<div class="item mb-20 wow fadeInUp"${ssrRenderAttr("data-wow-delay", item.delay)}><div class="title"><h4 class="fw-300">${ssrInterpolate(item.title)}</h4><span class="ico"></span></div><div class="accordion-info"><p>${ssrInterpolate(item.content)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/Two/TopContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/assets/imgs/works/projects/2/4.jpg");
const _imports_1 = publicAssetsURL("/assets/imgs/works/projects/2/5.jpg");
const _imports_2 = publicAssetsURL("/assets/imgs/works/projects/2/6.jpg");
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="img"><img${ssrRenderAttr("src", _imports_0)} alt=""></div><div class="cont section-padding"><div class="row"><div class="col-md-3 sm-mb30"><h6>The Story</h6></div><div class="col-lg-6 col-md-9"><div class="text"><p>We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities, digital experiences, and print materials. Install any demo, plugin or template in a matter of seconds. Just select the demo and click OK. It\u2019s that easy! The latest design trends meet hand-crafted templates in Ave Collection. Use pre-built sections to speed up your design process. Open a beautiful store, increase your conversion rates and boost your sales in minutes with object-oriented UX.</p></div></div></div></div><div class="img"><img${ssrRenderAttr("src", _imports_1)} alt=""></div><div class="cont section-padding"><div class="row"><div class="col-md-3 offset-lg-2 sm-mb30"><h6>Approach</h6></div><div class="col-lg-6 col-md-9"><div class="text"><p>We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities, digital experiences, and print materials. Install any demo, plugin or template in a matter of seconds. Just select the demo and click OK. It\u2019s that easy! The latest design trends meet hand-crafted templates in Ave Collection. Use pre-built sections to speed up your design process. Open a beautiful store, increase your conversion rates and boost your sales in minutes with object-oriented UX.</p></div></div></div></div><div class="img"><img${ssrRenderAttr("src", _imports_2)} alt=""></div></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/Two/BottomContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "next-project section-padding sub-bg" }, _attrs))}><div class="contact-container"><div class="container"><div class="row"><div class="col-12"><div class="text-center"><h6 class="sub-title fz-18">Next Project</h6><div class="inline"><div class="d-flex align-items-center"><a href="/project3" class="animsition-link fz-70 fw-700 stroke">Concept Audio</a><span class="ml-15"><img${ssrRenderAttr("src", _imports_0$2)} alt="" class="icon-img-70"></span></div></div></div></div></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/Two/NextProject.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "project2",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Project Two`,
      bodyAttrs: {
        class: "main-bg"
      },
      script: [
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$5;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$6;
      const _component_ProjectTwoHeader = _sfc_main$4;
      const _component_ProjectTwoTopContent = _sfc_main$3;
      const _component_ProjectTwoBottomContent = __nuxt_component_5;
      const _component_ProjectTwoNextProject = __nuxt_component_6;
      const _component_CommonFooter1 = _sfc_main$7;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg mt-100"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_ProjectTwoHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectTwoTopContent, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectTwoBottomContent, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ProjectTwoNextProject, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=project2-CApbe0ag.mjs.map
