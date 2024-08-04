import { _ as _sfc_main$2 } from './virtual_public-DtKfMkMj.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './Menu-BFis53zK.mjs';
import { useSSRContext, ref, watch, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay, Keyboard, Mousewheel, Pagination } from 'swiper';
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
    background: "/assets/imgs/works/full/7.jpeg",
    link: "/project1",
    text: {
      title: "Best Car Rental ",
      subtitle: "Corporate Video"
    }
  },
  {
    id: 2,
    background: "/assets/imgs/works/full/2.jpg",
    link: "/project2",
    text: {
      title: "Stanbic Bank",
      subtitle: "Branding"
    }
  },
  {
    id: 3,
    background: "/assets/imgs/works/full/3.jpg",
    link: "/project3",
    text: {
      title: "Econet Wireless ",
      subtitle: "Hallo 25 Programmes"
    }
  },
  {
    id: 4,
    background: "/assets/imgs/works/full/11.jpg",
    link: "/project4",
    text: {
      title: "CNRG",
      subtitle: "Livestream"
    }
  },
  {
    id: 5,
    background: "/assets/imgs/works/full/8.jpg",
    link: "/project1",
    text: {
      title: "Tunyafrika Xperience",
      subtitle: "Content Creation Video"
    }
  }
];
const _sfc_main$1 = {
  __name: "CarouselSlider",
  __ssrInlineRender: true,
  setup(__props) {
    const galleryImg = ref(null);
    const galleryText = ref(null);
    const swiperGalleryImageOptions = {
      modules: [Navigation, Autoplay, Keyboard, Mousewheel, Pagination],
      onSwiper(swiper) {
        galleryImg.value = swiper;
      },
      spaceBetween: 80,
      slidesPerView: 2,
      centeredSlides: true,
      loop: true,
      loopedSlides: 4,
      mousewheel: true,
      speed: 1500,
      navigation: {
        nextEl: ".carousel-slider .swiper-controls .swiper-button-next",
        prevEl: ".carousel-slider .swiper-controls .swiper-button-prev"
      },
      pagination: {
        el: ".carousel-slider .swiper-pagination",
        clickable: true,
        renderBullet(_, className) {
          return '<span class="' + className + '"><svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16"><circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"stroke-opacity="1" stroke-width="1px"></circle><circle cx="8" cy="8" r="3" fill="#FFF"></circle></svg></span>';
        }
      },
      keyboard: {
        enabled: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 2
        }
      }
    };
    const swiperGalleryTextOptions = {
      modules: [Mousewheel],
      onSwiper(swiper) {
        galleryText.value = swiper;
      },
      spaceBetween: 30,
      slidesPerView: 1,
      direction: "vertical",
      loop: true,
      loopedSlides: 4,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      mousewheel: true,
      speed: 1500
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
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "carousel-slider valign" }, _attrs))}><div class="full-width"><div class="gallery-img">`);
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
                    _push3(`<div class="swiper-slide"${_scopeId2}><div class="bg-img"${ssrRenderAttr("data-background", item.background)} data-overlay-dark="3"${_scopeId2}><a${ssrRenderAttr("href", item.link)} class="animsition-link"${_scopeId2}></a></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "swiper-slide" }, [
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
                    createVNode("div", { class: "swiper-slide" }, [
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
      _push(`</div><div class="gallery-text">`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps(swiperGalleryTextOptions, { class: "swiper-container swiper-container-initialized swiper-container-vertical" }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: item.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text"${_scopeId2}><h4${_scopeId2}>${ssrInterpolate(item.text.title)}</h4><h6${_scopeId2}><span${_scopeId2}>${ssrInterpolate(item.text.subtitle)}</span></h6></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text" }, [
                        createVNode("h4", null, toDisplayString(item.text.title), 1),
                        createVNode("h6", null, [
                          createVNode("span", null, toDisplayString(item.text.subtitle), 1)
                        ])
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
                      createVNode("h4", null, toDisplayString(item.text.title), 1),
                      createVNode("h6", null, [
                        createVNode("span", null, toDisplayString(item.text.subtitle), 1)
                      ])
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
      _push(`</div></div><div class="swiper-controls"><div class="swiper-button-next swiper-nav-ctrl cursor-pointer"><div><span>Next Slide</span></div><div><i class="fas fa-chevron-right"></i></div></div><div class="swiper-button-prev swiper-nav-ctrl cursor-pointer"><div><i class="fas fa-chevron-left"></i></div><div><span>Prev Slide</span></div></div></div><div class="swiper-pagination"></div></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Portfolio/CarouselSlider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "carousel-slider",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `WeNext Africa Media: Projects`,
      bodyAttrs: {
        class: "main-bg"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$2;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$3;
      const _component_PortfolioCarouselSlider = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_PortfolioCarouselSlider, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/carousel-slider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=carousel-slider-DhFcI5TW.mjs.map
