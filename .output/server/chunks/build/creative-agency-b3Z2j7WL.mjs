import { _ as _sfc_main$9 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$a } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, onUnmounted } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0$1 } from './virtual_public-BLj8Ij6Q.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import { _ as _sfc_main$b } from './Footer1-C1sHJYFV.mjs';
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

const _imports_0 = publicAssetsURL("/assets/imgs/b2.jpg");
const _sfc_main$8 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "crev-header" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-12"><div class="caption text-center"><h1 class="f-xbold"><span class="f-ultra-light d-block">Creative</span> Digital Agency</h1></div></div></div></div><div class="img mt-50"><img${ssrRenderAttr("src", _imports_0)} alt=""></div></header>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Header.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$7 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "about section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-11"><span class="sub-title bord mb-30">Who We Are?</span><h3 class="text-u text-indent ls1">We create unexpected connections between creative people with a passion, and creative businesses on a mission, so they can make the best work of their lives.</h3></div><div class="col-lg-7 offset-lg-5"><div class="text mt-50"><p>Whether it&#39;s crafting a visually stunning brand identity, designing immersive digital experiences, or developing strategic marketing campaigns, we approach each project with meticulous attention to detail and an unwavering dedication to quality.</p></div></div></div></div></section>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/About.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender]]);
const data$4 = [
  {
    id: 1,
    icon: "/assets/imgs/serv-icons/0.png",
    title: "Digital Marketing",
    description: "Brand identity design is the key to success whether you breathe rebranding.",
    link: "/about"
  },
  {
    id: 2,
    icon: "/assets/imgs/serv-icons/1.png",
    title: "Brand Strategy",
    description: "Brand identity design is the key to success whether you breathe rebranding.",
    link: "/about"
  },
  {
    id: 3,
    icon: "/assets/imgs/serv-icons/2.png",
    title: "SEO Optimization",
    description: "Brand identity design is the key to success whether you breathe rebranding.",
    link: "/about"
  },
  {
    id: 4,
    icon: "/assets/imgs/serv-icons/0.png",
    title: "Content Creation",
    description: "Brand identity design is the key to success whether you breathe rebranding.",
    link: "/about"
  }
];
const _sfc_main$6 = {
  __name: "Services",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "services-box" }, _attrs))}><div class="container"><div class="row"><!--[-->`);
      ssrRenderList(unref(data$4), (item) => {
        _push(`<div class="col-lg-3 col-md-6 item"><span class="icon-img-60 mb-40"><img${ssrRenderAttr("src", item.icon)} alt=""></span><h5 class="fz-22">${ssrInterpolate(item.title)}</h5><p>${ssrInterpolate(item.description)}</p><a${ssrRenderAttr("href", item.link)} class="link-more animsition-link mt-50"><span class="text">Read More</span><span class="arrow"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></span></a></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Services.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const data$3 = [
  {
    id: 1,
    image: "/assets/imgs/works/full/13.jpg",
    title: "Space Needle",
    category: "Branding",
    link: "/project1",
    valign: true,
    col: 4
  },
  {
    id: 2,
    image: "/assets/imgs/works/full/6.jpg",
    title: "Carved Wood",
    category: "Branding",
    link: "/project2",
    offset: true,
    col: 6
  },
  {
    id: 3,
    image: "/assets/imgs/works/full/2.jpg",
    title: "Earthmade Aroma",
    category: "Branding",
    link: "/project3",
    offset: true,
    col: 8
  },
  {
    id: 4,
    image: "/assets/imgs/works/full/3.jpg",
    title: "Bank Rebranding",
    category: "Branding",
    link: "/project4",
    col: 6
  },
  {
    id: 5,
    image: "/assets/imgs/works/full/10.jpg",
    title: "Day Starter",
    category: "Branding",
    link: "/project1",
    offset: true,
    col: 4
  }
];
const _sfc_main$5 = {
  __name: "Works",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "work section-padding bg-gray text-dark" }, _attrs))}><div class="marquee-head"><div class="container-fluid rest"><div class="row"><div class="col-12"><div class="main-marq"><div class="slide-har st1"><div class="box non-strok"><!--[-->`);
      ssrRenderList(new Array(5).fill(), (_, i) => {
        _push(`<div class="item"><h2>Selected Projects</h2></div>`);
      });
      _push(`<!--]--></div><div class="box non-strok"><!--[-->`);
      ssrRenderList(new Array(5).fill(), (_, i) => {
        _push(`<div class="item"><h2>Selected Projects</h2></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></div><div class="container"><div class="row gallery-img"><!--[-->`);
      ssrRenderList(unref(data$3), (item) => {
        _push(`<div class="${ssrRenderClass(`col-lg-${item.col} ${item.valign ? "valign" : ""} ${item.offset ? "offset-lg-2" : ""}`)}"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""></div><div class="info d-flex align-items-center mt-20"><div><h5 class="fz-20">${ssrInterpolate(item.title)}</h5></div><div class="ml-auto"><span class="text-u fz-13">${ssrInterpolate(item.category)}</span></div></div><a${ssrRenderAttr("href", item.link)} class="link-overlay animsition-link"></a></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Works.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const data$2 = [
  {
    id: 1,
    award: "XD, UI galery",
    year: "2023",
    platform: "Behance"
  },
  {
    id: 2,
    award: "Mobile of the week",
    year: "2022",
    platform: "Awwwards"
  },
  {
    id: 3,
    award: "Site of the day",
    year: "2021",
    platform: "CSSDA"
  },
  {
    id: 4,
    award: "UX, UI, innovation",
    year: "2020",
    platform: "CSSDA"
  },
  {
    id: 5,
    award: "XD, UI galery",
    year: "2019",
    platform: "Behance"
  }
];
const _sfc_main$4 = {
  __name: "Awards",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "awards section-padding" }, _attrs))}><div class="container"><div class="row md-marg"><div class="col-lg-6"><div class="sec-head mb-80"><span class="sub-title bord mb-30">Awards</span><h3 class="text-u text-indent ls1">We Create Award Winning Websites.</h3></div></div><div class="col-lg-12"><div class="item-title row"><div class="col-md-5"><div><h6 class="sub-title">Award</h6></div></div><div class="col-md-5"><div><h6 class="sub-title">Platform</h6></div></div></div><!--[-->`);
      ssrRenderList(unref(data$2), (item) => {
        _push(`<div class="item-line row"><div class="col-md-5"><div class="project-date"><h6>${ssrInterpolate(item.award)} <span>${ssrInterpolate(item.year)}</span></h6></div></div><div class="col-md-5"><div class="honors"><h6>${ssrInterpolate(item.platform)}</h6></div></div><div class="col-md-2"><a href="#0" class="link"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></a></div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Awards.vue");
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
const barndsData = [
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
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "testimonials section-padding sub-bg" }, _attrs))}><div class="container"><div class="sec-head pb-20 bord-thin-bottom mb-80"><div class="d-flex align-items-center"><div><h3 class="f-bold text-u">Testimonials</h3></div><div class="ml-auto"><div class="swiper-button-prev"><span class="pe-7s-angle-left"></span></div><div class="swiper-button-next"><span class="pe-7s-angle-right"></span></div></div></div></div><div class="row"><div class="col-lg-9"><div class="testim">`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps({
        id: "content-carousel-container-unq-testim",
        class: "swiper-container"
      }, swiperOptions), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data$1), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: item.id
              }, {
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
      _push(`</div></div><div class="col-lg-3 d-flex align-items-center justify-content-center"><div class="swiper-pagination"></div></div></div></div><div class="clients-marq no-bord pt-80 mt-40"><div class="container"><div class="main-marq"><div class="slide-har st1"><div class="box non-strok"><!--[-->`);
      ssrRenderList(unref(barndsData), (item) => {
        _push(`<div class="item"><div class="img icon-img-100"><a href="#0"><img${ssrRenderAttr("src", item)} alt=""></a></div></div>`);
      });
      _push(`<!--]--></div><div class="box non-strok"><!--[-->`);
      ssrRenderList(unref(barndsData), (item) => {
        _push(`<div class="item"><div class="img icon-img-100"><a href="#0"><img${ssrRenderAttr("src", item)} alt=""></a></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Testimonials.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const data = [
  {
    id: 1,
    role: "Web Designer",
    name: "Leonardo DiCaprio",
    image: "/assets/imgs/team/t2.jpg"
  },
  {
    id: 2,
    role: "Web Developer",
    name: "Brendan Fraser",
    image: "/assets/imgs/team/t3.jpg"
  },
  {
    id: 3,
    role: "Quality Control",
    name: "Robert De Niro",
    image: "/assets/imgs/team/t4.jpg"
  }
];
const _sfc_main$2 = {
  __name: "Team",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "team section-padding bord-thin-bottom" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-6"><div class="sec-head mb-80"><span class="sub-title bord mb-30">Team</span><h3 class="text-u text-indent ls1">We help to create strategies &amp; Design.</h3></div></div></div><div class="row md-marg"><!--[-->`);
      ssrRenderList(unref(data), (item, index) => {
        _push(`<div class="col-lg-4"><div class="${ssrRenderClass(`item ${index !== unref(data).length - 1 ? "md-mb50" : ""}`)}"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""></div><div class="info mt-20"><span class="fz-12 opacity-8">${ssrInterpolate(item.role)}</span><h6 class="fz-18">${ssrInterpolate(item.name)}</h6></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Team.vue");
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
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "call-action pb-80 pt-80 bord-thin-bottom" }, _attrs))}><div class="contact-container"><div class="marquee-head"><div class="container-fluid rest"><div class="row"><div class="col-12"><div class="main-marq"><div class="slide-har st1"><div class="box non-strok"><!--[-->`);
      ssrRenderList(new Array(5).fill(), (_, i) => {
        _push(`<div class="item"><h2><a href="/contact" class="animsition-link">Get In Touch</a><span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></span></h2></div>`);
      });
      _push(`<!--]--></div><div class="box non-strok"><!--[-->`);
      ssrRenderList(new Array(5).fill(), (_, i) => {
        _push(`<div class="item"><h2><a href="/contact" class="animsition-link">Get In Touch</a><span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></span></h2></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreativeAgency/Contact.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "creative-agency",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Creative Agency`,
      bodyAttrs: {
        class: "main-bg"
      },
      script: [
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$9;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$a;
      const _component_CreativeAgencyHeader = __nuxt_component_3;
      const _component_CreativeAgencyAbout = __nuxt_component_4;
      const _component_CreativeAgencyServices = _sfc_main$6;
      const _component_CreativeAgencyWorks = _sfc_main$5;
      const _component_CreativeAgencyAwards = _sfc_main$4;
      const _component_CreativeAgencyTestimonials = _sfc_main$3;
      const _component_CreativeAgencyTeam = _sfc_main$2;
      const _component_CreativeAgencyContact = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_CreativeAgencyHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyServices, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyAwards, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyTestimonials, null, null, _parent));
      _push(ssrRenderComponent(_component_CreativeAgencyTeam, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CreativeAgencyContact, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/creative-agency.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=creative-agency-b3Z2j7WL.mjs.map
