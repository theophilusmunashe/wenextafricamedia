import { _ as _sfc_main$2 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, ref, watch, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Keyboard, Mousewheel, Pagination, Thumbs } from 'swiper';
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
    link: "/project1",
    text: {
      subtitle: "Digital Design",
      title: "Retouch Photo"
    }
  },
  {
    id: 2,
    background: "/assets/imgs/works/full/2.jpg",
    link: "/project2",
    text: {
      subtitle: "Branding",
      title: "Earthmade Aroma"
    }
  },
  {
    id: 3,
    background: "/assets/imgs/works/full/3.jpg",
    link: "/project3",
    text: {
      subtitle: "Branding",
      title: "Bank Rebranding"
    }
  },
  {
    id: 4,
    background: "/assets/imgs/works/full/4.jpg",
    link: "/project4",
    text: {
      subtitle: "Product Design",
      title: "The joy of music"
    }
  },
  {
    id: 5,
    background: "/assets/imgs/works/full/5.jpg",
    link: "/project1",
    text: {
      subtitle: "Digital Art",
      title: "Blue Adobe MAX"
    }
  }
];
const _sfc_main$1 = {
  __name: "CreativeSlider",
  __ssrInlineRender: true,
  setup(__props) {
    const galleryImg = ref(null);
    const galleryText = ref(null);
    const swiperGalleryTextOptions = {
      modules: [Mousewheel, Thumbs],
      onSwiper(swiper) {
        galleryText.value = swiper;
      },
      spaceBetween: 100,
      centeredSlides: true,
      slidesPerView: 2,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      loopedSlides: 4,
      mousewheel: true,
      speed: 1500,
      breakpoints: {
        0: {
          spaceBetween: 10,
          slidesPerView: 1,
          centeredSlides: false
        },
        640: {
          spaceBetween: 30,
          slidesPerView: 1,
          centeredSlides: false
        },
        768: {
          spaceBetween: 50,
          slidesPerView: 1,
          centeredSlides: false
        },
        1024: {
          spaceBetween: 100,
          slidesPerView: 2,
          centeredSlides: true
        }
      }
    };
    const swiperGalleryImageOptions = {
      modules: [Navigation, Keyboard, Mousewheel, Pagination, Thumbs],
      onSwiper(swiper) {
        galleryImg.value = swiper;
      },
      spaceBetween: 0,
      centeredSlides: true,
      loopedSlides: 4,
      mousewheel: true,
      speed: 1500,
      navigation: {
        nextEl: ".half-slider .swiper-controls .swiper-button-next",
        prevEl: ".half-slider .swiper-controls .swiper-button-prev"
      },
      pagination: {
        el: ".half-slider .swiper-pagination",
        clickable: true,
        renderBullet: function(_, className) {
          return '<span class="' + className + '"><svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16"><circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"stroke-opacity="1" stroke-width="1px"></circle><circle cx="8" cy="8" r="3" fill="#FFF"></circle></svg></span>';
        }
      },
      keyboard: {
        enabled: true
      },
      thumbs: {
        swiper: galleryText.value
      }
    };
    watch([galleryImg, galleryText], () => {
      if (galleryImg.value && galleryText.value) {
        galleryImg.value.on("slideChangeTransitionStart", function() {
          galleryText.value.slideTo(galleryImg.value.activeIndex);
        });
        galleryText.value.on("transitionStart", function() {
          galleryImg.value.slideTo(galleryText.value.activeIndex);
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "half-slider" }, _attrs))}><div class="gallery-img">`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps(swiperGalleryImageOptions, { class: "swiper-container" }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: item.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="bg-img"${ssrRenderAttr("data-background", item.background)} data-overlay-dark="3"${_scopeId2}><a${ssrRenderAttr("href", item.link)} class="animsition-link"${_scopeId2}></a></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "bg-img",
                        "data-background": item.background,
                        "data-overlay-dark": "3"
                      }, [
                        createVNode("a", {
                          href: item.link,
                          class: "animsition-link"
                        }, null, 8, ["href"])
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
                      class: "bg-img",
                      "data-background": item.background,
                      "data-overlay-dark": "3"
                    }, [
                      createVNode("a", {
                        href: item.link,
                        class: "animsition-link"
                      }, null, 8, ["href"])
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
      _push(`</div><div class="gallery-text">`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps(swiperGalleryTextOptions, { class: "swiper-container" }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: item.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text"${_scopeId2}><h6${_scopeId2}><span class="f-bold"${_scopeId2}>${ssrInterpolate(item.text.subtitle)}</span></h6><h4${_scopeId2}>${ssrInterpolate(item.text.title)}</h4></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text" }, [
                        createVNode("h6", null, [
                          createVNode("span", { class: "f-bold" }, toDisplayString(item.text.subtitle), 1)
                        ]),
                        createVNode("h4", null, toDisplayString(item.text.title), 1)
                      ])
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
                    createVNode("div", { class: "text" }, [
                      createVNode("h6", null, [
                        createVNode("span", { class: "f-bold" }, toDisplayString(item.text.subtitle), 1)
                      ]),
                      createVNode("h4", null, toDisplayString(item.text.title), 1)
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="swiper-controls"><div class="swiper-button-next swiper-nav-ctrl cursor-pointer"><div><span>Next Slide</span></div><div><i class="fas fa-chevron-right"></i></div></div><div class="swiper-button-prev swiper-nav-ctrl cursor-pointer"><div><i class="fas fa-chevron-left"></i></div><div><span>Prev Slide</span></div></div></div><div class="swiper-pagination"></div></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/CreativeSlider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "half-slider",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Portfolio Creative Slider`,
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$2;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$3;
      const _component_PortfolioCreativeSlider = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_PortfolioCreativeSlider, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/half-slider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=half-slider-trGaFLV2.mjs.map
