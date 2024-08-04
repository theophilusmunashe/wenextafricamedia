import { _ as _sfc_main$5 } from './virtual_public-DtKfMkMj.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$6 } from './Menu-CCEGS-je.mjs';
import { useSSRContext, mergeProps, unref, withCtx, createVNode, ref } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0$2 } from './virtual_public-Bxc5qqGJ.mjs';
import { _ as _sfc_main$7 } from './Footer1-CY2Y8zy_.mjs';
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

const _imports_0$1 = publicAssetsURL("/assets/imgs/works/projects/2/2.jpg");
const _imports_0 = publicAssetsURL("/assets/imgs/works/projects/2/3.jpg");
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
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header-project2 section-padding pb-0" }, _attrs))}><div class="container mt-80 mb-80"><div class="row"><div class="col-lg-6 valign"><div class="full-width mb-30"><h1 class="fz-60">Project 2</h1><p>The comprehensive branding strategy developed for Stanbic Bank by Sources Consultants successfully rejuvenated the bank\u2019s image, creating a strong and cohesive brand presence in the market. Our strategic approach and creative execution have positioned Stanbic Bank for continued growth and success. Sources Consultants is proud to be a part of this remarkable transformation journey.</p></div></div><div class="col-lg-5 offset-lg-1"><div class="info"><div class="row"><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Client :</span><h6>Stanbic Bank</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Project :</span><h6>Comprehensive Branding Strategy</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Start Date :</span><h6>7 February 2022</h6></div></div><div class="col-md-6"><div class="item"><span class="opacity-8 mb-5">Location:</span><h6>Harare, Zimbabwe</h6></div></div></div></div></div></div></div><div class="container-fluid rest"><div class="project2"><div id="content-carousel-container-unq-project2" class="swiper-container">`);
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
                  _push3(`<div class="img"${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "img" }, [
                      createVNode("img", {
                        src: _imports_0,
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
                      src: _imports_0,
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
                      src: _imports_0$1,
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
        title: "Brand Audit and Research",
        content: "Conducted a thorough brand audit to assess current brand perception and market positioning.",
        delay: ".1s"
      },
      {
        title: "Brand Strategy Development",
        content: "Defined the core brand values, mission, and vision aligned with Stanbic Bank\u2019s strategic goals.",
        delay: ".3s"
      },
      {
        title: "Visual Identity Revamp",
        content: "Designed a refreshed logo that embodies the bank\u2019s heritage and forward-thinking approach.",
        delay: ".5s"
      },
      {
        title: "Internal Branding",
        content: "Implemented internal branding initiatives to ensure employees are brand ambassadors.",
        delay: ".7s"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding bord-thin-bottom" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-5"><h2 class="mb-50">The <br> Overview</h2></div><div class="col-lg-7"><div class="text"><h5 class="mb-30 fw-400 line-height-40">Stanbic Bank enlisted the expertise of Sources Consultants to revitalize its brand identity and enhance its market positioning. The objective was to develop a cohesive and compelling branding strategy that would resonate with existing customers, attract new clients, and reinforce Stanbic Bank&#39;s reputation as a leading financial institution in the region.</h5><p class="fz-18">Objective: To create a unified and recognizable brand identity for Stanbic Bank. To strengthen brand loyalty and customer trust. To differentiate Stanbic Bank from competitors through a unique value proposition. To enhance the bank\u2019s visibility and engagement across multiple channels.</p></div><div class="accordion bord mt-100"><!--[-->`);
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
const _imports_1 = publicAssetsURL("/assets/imgs/works/projects/2/5.jpg");
const _imports_2 = publicAssetsURL("/assets/imgs/works/projects/2/6.jpg");
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="img"><img${ssrRenderAttr("src", _imports_0)} alt=""></div><div class="cont section-padding"><div class="row"><div class="col-md-3 sm-mb30"><h6>The Results</h6></div><div class="col-lg-6 col-md-9"><div class="text"><p>Successfully launched a revitalized brand identity that received positive feedback from customers and stakeholders. Increased brand recognition and market share through targeted marketing efforts. Strengthened customer loyalty and trust, evidenced by a rise in customer satisfaction scores. Enhanced online engagement and visibility, resulting in higher website traffic and social media interaction.</p></div></div></div></div><div class="img"><img${ssrRenderAttr("src", _imports_1)} alt=""></div><div class="cont section-padding"><div class="row"><div class="col-md-3 offset-lg-2 sm-mb30"><h6>Client Feedback</h6></div><div class="col-lg-6 col-md-9"><div class="text"><p>&quot;The rebranding initiative with Sources Consultants has been transformative for Stanbic Bank. Their strategic insights and creative expertise have revitalized our brand, making it more ppealing and relevant to our customers. The entire process was seamless, and the results speak for themselves. We are thrilled with the outcome and look forward to our continued partnership.&quot; \u2014 Sarah Moyo, Head of Marketing, Stanbic Bank</p></div></div></div></div><div class="img"><img${ssrRenderAttr("src", _imports_2)} alt=""></div></div></div></div></section>`);
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
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "next-project section-padding sub-bg" }, _attrs))}><div class="contact-container"><div class="container"><div class="row"><div class="col-12"><div class="text-center"><h6 class="sub-title fz-18">Next Project</h6><div class="inline"><div class="d-flex align-items-center"><a href="/project3" class="animsition-link fz-70 fw-700 stroke">Econet - Hallo 25</a><span class="ml-15"><img${ssrRenderAttr("src", _imports_0$2)} alt="" class="icon-img-70"></span></div></div></div></div></div></div></div></section>`);
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
//# sourceMappingURL=project2-9zLXrqqE.mjs.map
