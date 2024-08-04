import { _ as _sfc_main$9 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$a } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, Fragment, renderList, createTextVNode, onUnmounted } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-P6SDANQl.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import { _ as _imports_0$1 } from './virtual_public-BLj8Ij6Q.mjs';
import { _ as _sfc_main$b } from './Footer1-C1sHJYFV.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
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
import 'vue-router';

const _imports_0 = publicAssetsURL("/assets/imgs/c1.jpg");
const _imports_1 = publicAssetsURL("/assets/imgs/c2.jpg");
const _sfc_main$8 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "crev-header2" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-10 offset-lg-1 mb-50"><div class="text d-flex f-bold"><span>We</span><div class="img"><img${ssrRenderAttr("src", _imports_0)} alt=""></div><span>Are</span></div></div><div class="col-lg-5"><div class="text f-ultra-light"><span>Studio</span></div></div><div class="col-lg-3"><div class="img-long"><div class="iner-img"><img${ssrRenderAttr("src", _imports_1)} alt=""></div></div></div><div class="col-lg-4"><p>We are a strategic partner to our clients. We will help you to ideate, design and implement your product from conception to iterative development support, always taking the initiative and working proactively.</p></div><div class="col-lg-10 offset-lg-1"><div class="text text-lg text-center mt-50 f-bold"><span>Agency</span></div></div></div></div></header>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/Header.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender]]);
const data$5 = [
  {
    id: 1,
    title: "UI-UX Experience"
  },
  {
    id: 2,
    title: "Web Development"
  },
  {
    id: 3,
    title: "Digital Marketing"
  },
  {
    id: 4,
    title: "Product Design"
  },
  {
    id: 5,
    title: "Mobile Solutions"
  }
];
const _sfc_main$7 = {
  __name: "Marquee",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "marquee pt-50 pb-50 bord-thin-bottom bord-thin-top mt-80" }, _attrs))}><div class="container-fluid rest"><div class="main-marq xlg-pading"><div class="slide-har st1"><div class="box"><!--[-->`);
      ssrRenderList(unref(data$5), (item) => {
        _push(`<div class="item"><h4 class="d-flex align-items-center f-bold"><span>${ssrInterpolate(item.title)}</span><span class="ml-50 stroke icon">*</span></h4></div>`);
      });
      _push(`<!--]--></div><div class="box"><!--[-->`);
      ssrRenderList(unref(data$5), (item) => {
        _push(`<div class="item"><h4 class="d-flex align-items-center f-bold"><span>${ssrInterpolate(item.title)}</span><span class="ml-50 stroke icon">*</span></h4></div>`);
      });
      _push(`<!--]--></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/Marquee.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const data$4 = [
  {
    id: 1,
    title: "Web & mobile apps",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  },
  {
    id: 2,
    title: "UX & product design",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  },
  {
    id: 3,
    title: "Product development",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  },
  {
    id: 4,
    title: "Award-class web design",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  }
];
const _sfc_main$6 = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "intro section-padding pb-0" }, _attrs))}><div class="container"><div class="row pb-100 bord-thin-bottom mb-80"><div class="col-lg-4"><div class="sec-head"><h6 class="sub-title fz-20 md-mb50">Company.</h6></div></div><div class="col-lg-7 offset-lg-1"><div><h3 class="text-u text-indent">Our experience in design spans geographies and cultures, industries and business objectives.</h3><div class="text mt-30"><p>The Koyeb unified platform lets you combine the languages, frameworks and technologies you love. Deploy any application thanks to native support of popular languages and built-in Docker container deployment. </p></div></div></div></div><div class="row"><div class="col-lg-4"><div class="sec-head"><h6 class="sub-title fz-20 md-mb50">Our <br> Services.</h6></div></div><div class="col-lg-7 offset-lg-1"><div class="cont"><div class="accordion bord"><!--[-->`);
      ssrRenderList(unref(data$4), (item, index) => {
        _push(`<div class="item mb-20 wow fadeInUp"${ssrRenderAttr("data-wow-delay", `${(index * 0.2 + 0.1).toFixed(1)}s`)}><div class="title"><h4>${ssrInterpolate(item.title)}</h4><span class="ico"></span></div><div class="accordion-info"><p>${ssrInterpolate(item.content)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/About.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const data$3 = [
  {
    id: 1,
    numb: "01",
    title: "Product Design",
    icon: "/assets/imgs/serv-icons/0.png",
    content: "We build and activate brands through cultural insight, strategic vision, and the power of emotion across every"
  },
  {
    id: 2,
    numb: "02",
    title: "Art Direction",
    icon: "/assets/imgs/serv-icons/1.png",
    content: "We build and activate brands through cultural insight, strategic vision, and the power of emotion across every"
  },
  {
    id: 3,
    numb: "03",
    title: "Web Development",
    icon: "/assets/imgs/serv-icons/2.png",
    content: "We build and activate brands through cultural insight, strategic vision, and the power of emotion across every"
  },
  {
    id: 4,
    numb: "04",
    title: "Branding Strategy",
    icon: "/assets/imgs/serv-icons/0.png",
    content: "We build and activate brands through cultural insight, strategic vision, and the power of emotion across every"
  }
];
const _sfc_main$5 = {
  __name: "Services",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "feat section-padding" }, _attrs))}><div class="container"><div class="sec-head pb-20 bord-thin-bottom mb-80"><div class="d-flex align-items-center"><div><h3 class="f-bold text-u">Our capabilities</h3></div><div class="ml-auto"><div class="d-flex align-items-center"><span class="sub-title ls1 bord">All Features</span>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/about",
        class: "arrow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 18 18",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("path", {
                  d: "M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z",
                  fill: "currentColor"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="row"><!--[-->`);
      ssrRenderList(unref(data$3), (item) => {
        _push(`<div class="col-lg-3 col-md-6 items"><div class="item"><span class="numb">${ssrInterpolate(item.numb)}</span><div class="icon-img-50"><img${ssrRenderAttr("src", item.icon)} alt=""></div><h6>${ssrInterpolate(item.title)}</h6><p>${ssrInterpolate(item.content)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/Services.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const data$2 = [
  {
    id: 1,
    img: "/assets/imgs/works/full/1.jpg",
    category: "Digital Design",
    title: "Retouch Photo",
    link: "/project1"
  },
  {
    id: 2,
    img: "/assets/imgs/works/full/2.jpg",
    category: "Branding",
    title: "Earthmade Aroma",
    link: "/project2"
  },
  {
    id: 3,
    img: "/assets/imgs/works/full/3.jpg",
    category: "Branding",
    title: "Bank Rebranding",
    link: "/project3"
  },
  {
    id: 4,
    img: "/assets/imgs/works/full/4.jpg",
    category: "Product Design",
    title: "The joy of music",
    link: "/project4"
  },
  {
    id: 5,
    img: "/assets/imgs/works/full/5.jpg",
    category: "Digital Art",
    title: "Blue Adobe MAX",
    link: "/project1"
  },
  {
    id: 6,
    img: "/assets/imgs/works/full/6.jpg",
    category: "Web Design",
    title: "Carved Wood",
    link: "/project3"
  }
];
const _sfc_main$4 = {
  __name: "Works",
  __ssrInlineRender: true,
  setup(__props) {
    const swiperOptions = {
      modules: [Navigation],
      slidesPerView: "auto",
      spaceBetween: 30,
      navigation: {
        nextEl: ".work-crev .swiper-button-next",
        prevEl: ".work-crev .swiper-button-prev"
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "work-crev section-padding bg-gray text-dark" }, _attrs))}><div class="container"><div class="sec-head pb-20 bord-thin-bottom mb-80"><div class="d-flex align-items-center"><div><h3 class="f-bold text-u">Recent Work</h3></div><div class="ml-auto"><div class="swiper-button-next"><span class="pe-7s-angle-left"></span></div><div class="swiper-button-prev"><span class="pe-7s-angle-right"></span></div></div></div></div><div class="work-crus">`);
      _push(ssrRenderComponent(unref(Swiper), swiperOptions, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data$2), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="item"${_scopeId2}><div class="img"${_scopeId2}><img${ssrRenderAttr("src", item.img)} alt=""${_scopeId2}></div><div class="cont"${_scopeId2}><div${_scopeId2}><span${_scopeId2}>${ssrInterpolate(item.category)}</span><h5${_scopeId2}>${ssrInterpolate(item.title)}</h5></div></div>`);
                    _push3(ssrRenderComponent(_component_nuxt_link, {
                      to: item.link,
                      class: "link-overlay"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "item" }, [
                        createVNode("div", { class: "img" }, [
                          createVNode("img", {
                            src: item.img,
                            alt: ""
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "cont" }, [
                          createVNode("div", null, [
                            createVNode("span", null, toDisplayString(item.category), 1),
                            createVNode("h5", null, toDisplayString(item.title), 1)
                          ])
                        ]),
                        createVNode(_component_nuxt_link, {
                          to: item.link,
                          class: "link-overlay"
                        }, null, 8, ["to"])
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(data$2), (item) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: item.id
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "item" }, [
                      createVNode("div", { class: "img" }, [
                        createVNode("img", {
                          src: item.img,
                          alt: ""
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "cont" }, [
                        createVNode("div", null, [
                          createVNode("span", null, toDisplayString(item.category), 1),
                          createVNode("h5", null, toDisplayString(item.title), 1)
                        ])
                      ]),
                      createVNode(_component_nuxt_link, {
                        to: item.link,
                        class: "link-overlay"
                      }, null, 8, ["to"])
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
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/Works.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const data$1 = [
  {
    id: 1,
    quote: "I have been hiring people in this space for a number of years and I have never seen this level of professionalism. It really feels like you are working with a team that can get the job done.",
    author: "Tyler Smith",
    client: "Envato Client"
  },
  {
    id: 2,
    quote: "I have been hiring people in this space for a number of years and I have never seen this level of professionalism. It really feels like you are working with a team that can get the job done.",
    author: "Tyler Smith",
    client: "Envato Client"
  },
  {
    id: 3,
    quote: "I have been hiring people in this space for a number of years and I have never seen this level of professionalism. It really feels like you are working with a team that can get the job done.",
    author: "Tyler Smith",
    client: "Envato Client"
  },
  {
    id: 4,
    quote: "I have been hiring people in this space for a number of years and I have never seen this level of professionalism. It really feels like you are working with a team that can get the job done.",
    author: "Tyler Smith",
    client: "Envato Client"
  }
];
const brandsData = [
  "/assets/imgs/brands/01.png",
  "/assets/imgs/brands/02.png",
  "/assets/imgs/brands/03.png",
  "/assets/imgs/brands/04.png",
  "/assets/imgs/brands/05.png",
  "/assets/imgs/brands/06.png"
];
const _sfc_main$3 = {
  __name: "Testimonials",
  __ssrInlineRender: true,
  setup(__props) {
    const swiperOptions = {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      navigation: {
        nextEl: ".testimonials .swiper-button-next",
        prevEl: ".testimonials .swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction"
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "testimonials section-padding" }, _attrs))}><div class="container"><div class="sec-head pb-20 bord-thin-bottom mb-80"><div class="d-flex align-items-center"><div><h3 class="f-bold text-u">Testimonials</h3></div><div class="ml-auto"><div class="swiper-button-prev"><span class="pe-7s-angle-left"></span></div><div class="swiper-button-next"><span class="pe-7s-angle-right"></span></div></div></div></div><div class="row"><div class="col-lg-9"><div class="testim">`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps(swiperOptions, {
        id: "content-carousel-container-unq-testim",
        class: "swiper-container"
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data$1), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="item"${_scopeId2}><div class="row"${_scopeId2}><div class="col-md-2"${_scopeId2}><div class="quote-icon icon-img-80 pt-10"${_scopeId2}><img${ssrRenderAttr("src", _imports_0$1)} alt=""${_scopeId2}></div></div><div class="col-md-10"${_scopeId2}><div class="cont"${_scopeId2}><h4 class="fz-24"${_scopeId2}>${ssrInterpolate(item.quote)}</h4><div class="info mt-30"${_scopeId2}><h5 class="text-u ls1"${_scopeId2}>${ssrInterpolate(item.author)}</h5><span class="sub-title opacity-8 mt-5"${_scopeId2}>${ssrInterpolate(item.client)}</span></div></div></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "item" }, [
                        createVNode("div", { class: "row" }, [
                          createVNode("div", { class: "col-md-2" }, [
                            createVNode("div", { class: "quote-icon icon-img-80 pt-10" }, [
                              createVNode("img", {
                                src: _imports_0$1,
                                alt: ""
                              })
                            ])
                          ]),
                          createVNode("div", { class: "col-md-10" }, [
                            createVNode("div", { class: "cont" }, [
                              createVNode("h4", { class: "fz-24" }, toDisplayString(item.quote), 1),
                              createVNode("div", { class: "info mt-30" }, [
                                createVNode("h5", { class: "text-u ls1" }, toDisplayString(item.author), 1),
                                createVNode("span", { class: "sub-title opacity-8 mt-5" }, toDisplayString(item.client), 1)
                              ])
                            ])
                          ])
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(data$1), (item) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: item.id
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "item" }, [
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-md-2" }, [
                          createVNode("div", { class: "quote-icon icon-img-80 pt-10" }, [
                            createVNode("img", {
                              src: _imports_0$1,
                              alt: ""
                            })
                          ])
                        ]),
                        createVNode("div", { class: "col-md-10" }, [
                          createVNode("div", { class: "cont" }, [
                            createVNode("h4", { class: "fz-24" }, toDisplayString(item.quote), 1),
                            createVNode("div", { class: "info mt-30" }, [
                              createVNode("h5", { class: "text-u ls1" }, toDisplayString(item.author), 1),
                              createVNode("span", { class: "sub-title opacity-8 mt-5" }, toDisplayString(item.client), 1)
                            ])
                          ])
                        ])
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
      _push(`</div></div><div class="col-lg-3 d-flex align-items-center justify-content-center"><div class="swiper-pagination"></div></div></div></div><div class="clients-marq no-bord pt-80"><div class="container"><div class="main-marq"><div class="slide-har st1"><div class="box non-strok"><!--[-->`);
      ssrRenderList(unref(brandsData), (item) => {
        _push(`<div class="item"><div class="img icon-img-100"><a href="#0"><img${ssrRenderAttr("src", item)} alt=""></a></div></div>`);
      });
      _push(`<!--]--></div><div class="box non-strok"><!--[-->`);
      ssrRenderList(unref(brandsData), (item) => {
        _push(`<div class="item"><div class="img icon-img-100"><a href="#0"><img${ssrRenderAttr("src", item)} alt=""></a></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/Testimonials.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const data = [
  {
    id: 1,
    img: "/assets/imgs/blog/b5.jpg",
    date: {
      day: "07",
      month: "August"
    },
    category: "Inspiration",
    title: "Definitive Guide to Make a Daily More Productive Working Flow.",
    link: "/blog-details"
  },
  {
    id: 2,
    img: "/assets/imgs/blog/b6.jpg",
    date: {
      day: "07",
      month: "August"
    },
    category: "Inspiration",
    title: "Utilizing mobile technology in the field.",
    link: "/blog-details"
  }
];
const _sfc_main$2 = {
  __name: "Blog",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "blog-metro section-padding bg-gray text-dark" }, _attrs))}><div class="container"><div class="sec-head pb-20 bord-thin-bottom mb-80"><div class="d-flex align-items-center"><div><h3 class="f-bold text-u">Our Blog</h3></div><div class="ml-auto"><div class="d-flex align-items-center"><span class="sub-title ls1 bord">Latest News</span>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/blog",
        class: "arrow animsition-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 18 18",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("path", {
                  d: "M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z",
                  fill: "currentColor"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="row"><!--[-->`);
      ssrRenderList(unref(data), (item, index) => {
        _push(`<div class="col-lg-6"><div class="${ssrRenderClass(`item row ${index !== unref(data).length - 1 ? "md-mb50" : ""}`)}"><div class="col-md-5"><div class="img"><img${ssrRenderAttr("src", item.img)} alt=""><span class="date"><strong>${ssrInterpolate(item.date.day)}</strong> ${ssrInterpolate(item.date.month)}</span></div></div><div class="col-md-7 valign"><div class="cont"><span class="sub-title ls1 mb-15 opacity-8">${ssrInterpolate(item.category)}</span><h4>${ssrInterpolate(item.title)}</h4><div class="underline">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: item.link,
          class: "animsition-link more mt-20"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Read More`);
            } else {
              return [
                createTextVNode("Read More")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/Blog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    const handleResize = () => {
      if ((void 0).innerWidth > 991) {
        gsap.set(".contact-container", { yPercent: -50 });
        const cover = gsap.timeline({ paused: true });
        cover.to(".contact-container", { yPercent: 0, ease: "none" });
        ScrollTrigger.create({
          trigger: ".main-box",
          start: "bottom bottom",
          end: "+=50%",
          animation: cover,
          scrub: true
        });
      }
    };
    onUnmounted(() => {
      (void 0).removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "call-action section-padding bord-thin-bottom" }, _attrs))}><div class="contact-container"><div class="container"><div class="row justify-content-center"><div class="col-lg-12"><div class="text-center"><div class="mb-30"><span class="sub-title bord">Work With Us</span></div><h2 class="fz-70 f-bold text-u"> We would love <span class="d-block f-ultra-light">to hear more about</span> your project </h2><a href="/contact" class="butn-circle animsition-link colorbg mt-30"><span>Get In Touch</span></a></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativePortfolio/Contact.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "creative-portfolio",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Creative Portfolio`,
      bodyAttrs: {
        class: "crev-portfolio"
      },
      script: [
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$9;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$a;
      const _component_CreativePortfolioHeader = __nuxt_component_3;
      const _component_CreativePortfolioMarquee = _sfc_main$7;
      const _component_CreativePortfolioAbout = _sfc_main$6;
      const _component_CreativePortfolioServices = _sfc_main$5;
      const _component_CreativePortfolioWorks = _sfc_main$4;
      const _component_CreativePortfolioTestimonials = _sfc_main$3;
      const _component_CreativePortfolioBlog = _sfc_main$2;
      const _component_CreativePortfolioContact = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div class="noise"></div><div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_CreativePortfolioHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativePortfolioMarquee, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativePortfolioAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativePortfolioServices, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativePortfolioWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativePortfolioTestimonials, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativePortfolioBlog, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CreativePortfolioContact, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/creative-portfolio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=creative-portfolio-CUPcCeAG.mjs.map
