import { _ as _sfc_main$6 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$7 } from './Menu-D6Dz6q5o.mjs';
import { useSSRContext, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0$1 } from './virtual_public-BU9vMVzG.mjs';
import { _ as _imports_0$2 } from './virtual_public-BLj8Ij6Q.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import { _ as _sfc_main$8 } from './Footer1-C-pVFrlQ.mjs';
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

const _imports_0 = publicAssetsURL("/assets/imgs/b3.jpg");
const _sfc_main$5 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "about-header section-padding pb-0" }, _attrs))}><div class="container mt-100"><div class="row"><div class="col-lg-9 offset-lg-1"><div class="cont"><h6 class="sub-title mb-15">Sources Consultants</h6><h1 class="text-u">About Us</h1></div></div></div></div><div class="img mt-80" data-overlay-dark="4"><img${ssrRenderAttr("src", _imports_0)} alt=""></div></header>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Header.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$4 = {
  __name: "Intro",
  __ssrInlineRender: true,
  setup(__props) {
    const handleResize = () => {
      if ((void 0).innerWidth > 991) {
        gsap.to(".text-reval .text", {
          backgroundPositionX: "0%",
          stagger: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".text-reval",
            markers: false,
            scrub: 1,
            start: "top center",
            end: "bottom center"
          }
        });
      }
    };
    onUnmounted(() => {
      (void 0).removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-10"><div class="text"><span class="sub-title mb-15 opacity-8">- Who We Are?</span><div class="text-reval"><h2 class="fz-50 text-u mb-30"><span class="text">We are a creative studio with focus</span><span class="text">on set design, illustration and</span><span class="text"> motion design.</span></h2></div><p> We create brand identities, digital experiences, and print materials that communicate clearly, achieve marketing goals, and look fantastic. Urban design draws together the many strands of place-making, environmental stewardship. </p></div></div></div><div class="row"><div class="col-lg-10 offset-lg-1"><div class="row mt-80"><div class="col-md-4 sm-mb30"><ul class="list rest"><li class="fz-18 mb-15"><span class="mr-10">+</span> Branding Strategy</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Digital Experiences</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Social Media</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Advertising</li></ul></div><div class="col-md-4 sm-mb30"><ul class="list rest"><li class="fz-18 mb-15"><span class="mr-10">+</span> Branding Strategy</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Digital Experiences</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Social Media</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Advertising</li></ul></div><div class="col-md-4"><ul class="list rest"><li class="fz-18 mb-15"><span class="mr-10">+</span> Branding Strategy</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Digital Experiences</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Social Media</li><li class="fz-18 mb-15"><span class="mr-10">+</span> Advertising</li></ul></div></div><div class="row numbers mt-80"><div class="col-lg-4"><div class="item md-mb50"><h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">48</h3><h6 class="fz-16">Projects Completed</h6></div></div><div class="col-lg-4"><div class="item md-mb50"><h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">64k</h3><h6 class="fz-16">Clients Around the World</h6></div></div><div class="col-lg-4"><div class="item"><h3 class="stroke f-bold num pb-30 mb-30 bord-thin-bottom">30</h3><h6 class="fz-16">Total Awards</h6></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Intro.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const data$2 = [
  "/assets/imgs/brands/01.png",
  "/assets/imgs/brands/02.png",
  "/assets/imgs/brands/03.png",
  "/assets/imgs/brands/04.png",
  "/assets/imgs/brands/05.png",
  "/assets/imgs/brands/06.png",
  "/assets/imgs/brands/07.png",
  "/assets/imgs/brands/08.png"
];
const _sfc_main$3 = {
  __name: "Video",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "vid-sec sub-bg pb-70" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="vid-intro"><div class="video-container"><video autoplay loop muted><source${ssrRenderAttr("src", _imports_0$1)} type="video/mp4"></video></div></div></div></div></div><div class="brands mt-70"><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="brand-items"><div class="row"><!--[-->`);
      ssrRenderList(unref(data$2), (item) => {
        _push(`<div class="col-lg-3 col-md-4 col-6 item"><div class="img"><img${ssrRenderAttr("src", item)} alt=""></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Video.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const data$1 = [
  {
    id: 1,
    title: "Martin Scorsese",
    role: "Co-Founder",
    image: "/assets/imgs/team/t1.jpg"
  },
  {
    id: 2,
    title: "Leonardo DiCaprio",
    role: "Web Designer",
    image: "/assets/imgs/team/t2.jpg"
  },
  {
    id: 3,
    title: "Brendan Fraser",
    role: "Web Developer",
    image: "/assets/imgs/team/t3.jpg"
  },
  {
    id: 4,
    title: "Robert De Niro",
    role: "Quality Control",
    image: "/assets/imgs/team/t4.jpg"
  },
  {
    id: 5,
    title: "Jesse Plemons",
    role: "Quality Control",
    image: "/assets/imgs/team/t3.jpg"
  },
  {
    id: 6,
    title: "John Lithgow",
    role: "Support Team",
    image: "/assets/imgs/team/t6.jpg"
  },
  {
    id: 7,
    title: "Jason Isbell",
    role: "Support Team",
    image: "/assets/imgs/team/t7.jpg"
  }
];
const _sfc_main$2 = {
  __name: "Team",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "team section-padding pb-0" }, _attrs))}><div class="container"><div class="sec-head mb-80"><div class="row"><div class="col-lg-8"><h6 class="sub-title opacity-8 wow fadeInUp mb-15">- Our Team</h6><h3 class="f-bold text-u d-rotate wow"><span class="rotate-text">Meet Our Team.</span></h3></div></div></div></div><div class="container-fluid rest"><div class="row no-pad"><!--[-->`);
      ssrRenderList(unref(data$1), (item) => {
        _push(`<div class="col-lg-3 col-md-6"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""></div><div class="info mt-20"><span class="fz-12 opacity-8">${ssrInterpolate(item.role)}</span><h6 class="fz-18">${ssrInterpolate(item.title)}</h6></div></div></div>`);
      });
      _push(`<!--]--><div class="col-lg-3 col-md-6"><div class="item-join valign"><div class="full-width"><h5 class="text-u ls2 fw-500">Become Our <br> Member</h5><a href="/about" class="arrow mt-30"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></a></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Team.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const data = [
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
const _sfc_main$1 = {
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
      if (unref(data).length) {
        _push(ssrRenderComponent(unref(Swiper), mergeProps({ id: "content-carousel-container-unq-testim" }, swiperOptions), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(data), (item) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="item"${_scopeId2}><div class="row"${_scopeId2}><div class="col-md-2"${_scopeId2}><div class="quote-icon icon-img-80 pt-10"${_scopeId2}><img${ssrRenderAttr("src", _imports_0$2)} alt=""${_scopeId2}></div></div><div class="col-md-10"${_scopeId2}><div class="cont"${_scopeId2}><h4 class="fz-24"${_scopeId2}>${ssrInterpolate(item.quote)}</h4><div class="info mt-30"${_scopeId2}><h5 class="text-u ls1"${_scopeId2}>${ssrInterpolate(item.author)}</h5><span class="sub-title opacity-8 mt-5"${_scopeId2}>${ssrInterpolate(item.client)}</span></div></div></div></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "item" }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-md-2" }, [
                              createVNode("div", { class: "quote-icon icon-img-80 pt-10" }, [
                                createVNode("img", {
                                  src: _imports_0$2,
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
                (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (item) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: item.id
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "item" }, [
                        createVNode("div", { class: "row" }, [
                          createVNode("div", { class: "col-md-2" }, [
                            createVNode("div", { class: "quote-icon icon-img-80 pt-10" }, [
                              createVNode("img", {
                                src: _imports_0$2,
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
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="col-lg-3 d-flex align-items-center justify-content-center"><div class="swiper-pagination"></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About/Testimonials.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `Sources-Consultants: About`,
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
      const _component_AboutHeader = __nuxt_component_3;
      const _component_AboutIntro = _sfc_main$4;
      const _component_AboutVideo = _sfc_main$3;
      const _component_AboutTeam = _sfc_main$2;
      const _component_AboutTestimonials = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$8;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg">`);
      _push(ssrRenderComponent(_component_AboutHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutIntro, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutVideo, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutTeam, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutTestimonials, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-B8Kkyu1t.mjs.map
