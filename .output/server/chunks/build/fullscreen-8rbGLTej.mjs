import { _ as _sfc_main$2 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay, Parallax, Pagination, Mousewheel } from 'swiper';
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
    background: "/assets/imgs/works/full/1.jpg",
    caption: {
      subTitle: "Branding",
      title: "Retouch Photo",
      link: "/project1"
    }
  },
  {
    id: 2,
    background: "/assets/imgs/works/full/2.jpg",
    caption: {
      subTitle: "Branding",
      title: "Earthmade Aroma box",
      link: "/project2"
    }
  },
  {
    id: 3,
    background: "/assets/imgs/works/full/3.jpg",
    caption: {
      subTitle: "Branding",
      title: "Access Bank Rebranding",
      link: "/project3"
    }
  },
  {
    id: 4,
    background: "/assets/imgs/works/full/4.jpg",
    caption: {
      subTitle: "Branding",
      title: "The joy of music",
      link: "/project4"
    }
  },
  {
    id: 5,
    background: "/assets/imgs/works/full/5.jpg",
    caption: {
      subTitle: "Branding",
      title: "Blue Adobe MAX",
      link: "/project1"
    }
  },
  {
    id: 6,
    background: "/assets/imgs/works/full/6.jpg",
    caption: {
      subTitle: "Branding",
      title: "Carved Wood",
      link: "/project2"
    }
  },
  {
    id: 7,
    background: "/assets/imgs/works/full/vid.png",
    caption: {
      subTitle: "Branding",
      title: "Abstract Animation Video",
      link: "/project3"
    },
    videoSource: "/assets/imgs/works/full/vid.mp4"
  }
];
const _sfc_main$1 = {
  __name: "Fullscreen",
  __ssrInlineRender: true,
  setup(__props) {
    const swiperOptions = {
      modules: [Navigation, Autoplay, Parallax, Pagination, Mousewheel],
      speed: 1500,
      autoplay: {
        delay: 5e3
      },
      mousewheel: true,
      parallax: true,
      loop: true,
      onSwiper(swiper) {
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].querySelector(".bg-img").setAttribute("data-swiper-parallax", 0.75 * swiper.width);
        }
      },
      onResize(swiper) {
        swiper.update();
      },
      pagination: {
        el: ".full-showcase .parallax-slider .swiper-pagination",
        clickable: true,
        renderBullet(_, className) {
          return '<span class="' + className + '"><svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16"><circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"stroke-opacity="1" stroke-width="1px"></circle><circle cx="8" cy="8" r="3" fill="#FFF"></circle></svg></span>';
        }
      },
      navigation: {
        nextEl: ".full-showcase .parallax-slider .swiper-button-next",
        prevEl: ".full-showcase .parallax-slider .swiper-button-prev"
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "full-showcase" }, _attrs))}><div class="swiper-container parallax-slider">`);
      _push(ssrRenderComponent(unref(Swiper), swiperOptions, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: item.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="bg-img valign"${ssrRenderAttr("data-background", item.background)} data-overlay-dark="3"${_scopeId2}><div class="${ssrRenderClass(`container ${item.videoSource ? "ontop" : ""}`)}"${_scopeId2}><div class="row"${_scopeId2}><div class="col-lg-11 offset-lg-1"${_scopeId2}><div class="caption"${_scopeId2}><h6 class="sub-title mb-30"${ssrRenderAttr("data-swiper-parallax", -1e3)}${_scopeId2}>\xA9 2024 <br${_scopeId2}> ${ssrInterpolate(item.caption.subTitle)}</h6><h1${_scopeId2}><a${ssrRenderAttr("href", item.caption.link)} class="animsition-link"${_scopeId2}><span${ssrRenderAttr("data-swiper-parallax", -2e3)}${_scopeId2}>${ssrInterpolate(item.caption.title)}</span></a></h1></div></div></div></div>`);
                    if (item.videoSource) {
                      _push3(`<div class="video-container"${_scopeId2}><video autoplay loop muted${_scopeId2}><source${ssrRenderAttr("src", item.videoSource)} type="video/mp4"${_scopeId2}></video></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "bg-img valign",
                        "data-background": item.background,
                        "data-overlay-dark": "3"
                      }, [
                        createVNode("div", {
                          class: `container ${item.videoSource ? "ontop" : ""}`
                        }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-lg-11 offset-lg-1" }, [
                              createVNode("div", { class: "caption" }, [
                                createVNode("h6", {
                                  class: "sub-title mb-30",
                                  "data-swiper-parallax": -1e3
                                }, [
                                  createTextVNode("\xA9 2024 "),
                                  createVNode("br"),
                                  createTextVNode(" " + toDisplayString(item.caption.subTitle), 1)
                                ]),
                                createVNode("h1", null, [
                                  createVNode("a", {
                                    href: item.caption.link,
                                    class: "animsition-link"
                                  }, [
                                    createVNode("span", { "data-swiper-parallax": -2e3 }, toDisplayString(item.caption.title), 1)
                                  ], 8, ["href"])
                                ])
                              ])
                            ])
                          ])
                        ], 2),
                        item.videoSource ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "video-container"
                        }, [
                          createVNode("video", {
                            autoplay: "",
                            loop: "",
                            muted: ""
                          }, [
                            createVNode("source", {
                              src: item.videoSource,
                              type: "video/mp4"
                            }, null, 8, ["src"])
                          ])
                        ])) : createCommentVNode("", true)
                      ], 8, ["data-background"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (item) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: item.id
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: "bg-img valign",
                      "data-background": item.background,
                      "data-overlay-dark": "3"
                    }, [
                      createVNode("div", {
                        class: `container ${item.videoSource ? "ontop" : ""}`
                      }, [
                        createVNode("div", { class: "row" }, [
                          createVNode("div", { class: "col-lg-11 offset-lg-1" }, [
                            createVNode("div", { class: "caption" }, [
                              createVNode("h6", {
                                class: "sub-title mb-30",
                                "data-swiper-parallax": -1e3
                              }, [
                                createTextVNode("\xA9 2024 "),
                                createVNode("br"),
                                createTextVNode(" " + toDisplayString(item.caption.subTitle), 1)
                              ]),
                              createVNode("h1", null, [
                                createVNode("a", {
                                  href: item.caption.link,
                                  class: "animsition-link"
                                }, [
                                  createVNode("span", { "data-swiper-parallax": -2e3 }, toDisplayString(item.caption.title), 1)
                                ], 8, ["href"])
                              ])
                            ])
                          ])
                        ])
                      ], 2),
                      item.videoSource ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "video-container"
                      }, [
                        createVNode("video", {
                          autoplay: "",
                          loop: "",
                          muted: ""
                        }, [
                          createVNode("source", {
                            src: item.videoSource,
                            type: "video/mp4"
                          }, null, 8, ["src"])
                        ])
                      ])) : createCommentVNode("", true)
                    ], 8, ["data-background"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="swiper-controls"><div class="swiper-button-next swiper-nav-ctrl cursor-pointer"><div><span>Next Slide</span></div><div><i class="fas fa-chevron-right"></i></div></div><div class="swiper-button-prev swiper-nav-ctrl cursor-pointer"><div><i class="fas fa-chevron-left"></i></div><div><span>Prev Slide</span></div></div></div><div class="swiper-pagination"></div></div></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/Fullscreen.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "fullscreen",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Portfolio Fullscreen`,
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$2;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$3;
      const _component_PortfolioFullscreen = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_PortfolioFullscreen, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fullscreen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=fullscreen-8rbGLTej.mjs.map
