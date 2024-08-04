import { _ as _sfc_main$9 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$a } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, onUnmounted, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, reactive } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0 } from './virtual_public-BU9vMVzG.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { _ as _sfc_main$b } from './Footer1-C1sHJYFV.mjs';
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

const _sfc_main$8 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "land-header valign" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="caption text-center"><h1 class="fz-60">Branding, websites and digital experiences, crafted with love, intelligence and precision. </h1></div></div></div></div></header>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/Header.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$7 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "about" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-12"><div class="vid-intro"><div class="video-container"><video autoPlay loop muted><source${ssrRenderAttr("src", _imports_0)} type="video/mp4"></video></div></div></div></div></div><div class="container section-padding"><div class="row"><div class="col-lg-4"><div class="sec-head"><span class="sub-title mb-15 opacity-8">- About Us</span></div></div><div class="col-lg-8"><div class="intro"><div class="text-reval"><span class="text">We are a creative agency working with</span><span class="text">brands \u2013 building insightful strategy,</span><span class="text">creating unique designs.</span></div></div></div></div><div class="serv-inline mt-80"><div class="row justify-content-end"><div class="col-lg-8"><div class="item pb-30 pt-30 mb-30 bord-thin-top bord-thin-bottom wow fadeInUp" data-wow-delay=".2s"><div class="d-flex align-items-center"><div><span class="mb-10 opacity-8">01 / <span class="text-u ml-5">Branding</span></span><h5>Branding &amp; Design</h5></div><div class="ml-auto"><div class="d-flex align-items-center"><a href="/about" class="animsition-link">View Details</a><span class="fz-30 pe-7s-angle-right"></span></div></div></div></div><div class="item pb-30 mb-30 bord-thin-bottom wow fadeInUp" data-wow-delay=".4s"><div class="d-flex align-items-center"><div><span class="mb-10 opacity-8">02 / <span class="text-u ml-5">Branding</span></span><h5>Brand Strategy &amp; Voice</h5></div><div class="ml-auto"><div class="d-flex align-items-center"><a href="/about" class="animsition-link">View Details</a><span class="fz-30 pe-7s-angle-right"></span></div></div></div></div><div class="item pb-30 bord-thin-bottom wow fadeInUp" data-wow-delay=".6s"><div class="d-flex align-items-center"><div><span class="mb-10 opacity-8">03 / <span class="text-u ml-5">Design</span></span><h5>Digital &amp; Web Design</h5></div><div class="ml-auto"><div class="d-flex align-items-center"><a href="/about" class="animsition-link">View Details</a><span class="fz-30 pe-7s-angle-right"></span></div></div></div></div></div></div></div></div></section>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/About.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender]]);
const data$4 = [
  {
    id: 1,
    img: "/assets/imgs/works/full/1.jpg",
    category: "Digital Design",
    title: "Retouch Photo",
    year: "2023",
    link: "/project1"
  },
  {
    id: 2,
    img: "/assets/imgs/works/full/2.jpg",
    category: "Branding",
    title: "Earthmade Aroma",
    year: "2023",
    link: "/project2"
  },
  {
    id: 3,
    img: "/assets/imgs/works/full/3.jpg",
    category: "Branding",
    title: "Bank Rebranding",
    year: "2023",
    link: "/project3"
  },
  {
    id: 4,
    img: "/assets/imgs/works/full/4.jpg",
    category: "Product Design",
    title: "The joy of music",
    year: "2023",
    link: "/project4"
  },
  {
    id: 5,
    img: "/assets/imgs/works/full/5.jpg",
    category: "Digital Art",
    title: "Blue Adobe MAX",
    year: "2023",
    link: "/project1"
  },
  {
    id: 6,
    img: "/assets/imgs/works/full/6.jpg",
    category: "Web Design",
    title: "Carved Wood",
    year: "2023",
    link: "/project3"
  }
];
const _sfc_main$6 = {
  __name: "Works",
  __ssrInlineRender: true,
  setup(__props) {
    const handleResize = () => {
      const allTriggers = ScrollTrigger.getAll();
      if ((void 0).innerWidth < 991 && allTriggers.length || (void 0).innerWidth > 991 && !allTriggers.length) {
        (void 0).location.reload();
      }
      allTriggers.forEach((trigger) => {
        trigger.update();
      });
    };
    onUnmounted(() => {
      (void 0).removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "works thecontainer ontop sub-bg" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(data$4), (item) => {
        _push(`<div class="panel"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.img)} alt=""></div><div class="cont d-flex align-items-center"><div><span>${ssrInterpolate(item.category)}</span><h5>${ssrInterpolate(item.title)}</h5></div><div class="ml-auto"><h6>${ssrInterpolate(item.year)}</h6></div></div><a${ssrRenderAttr("href", item.link)} class="link-overlay animsition-link"></a></div></div>`);
      });
      _push(`<!--]--></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/Works.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const data$3 = [
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
const _sfc_main$5 = {
  __name: "Marquee",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "marquee" }, _attrs))}><div class="container-fluid rest"><div class="row"><div class="col-12"><div class="main-marq"><div class="slide-har st1"><div class="box non-strok"><!--[-->`);
      ssrRenderList(unref(data$3), (item) => {
        _push(`<div class="item"><h4 class="d-flex align-items-center"><span>${ssrInterpolate(item.title)}</span><span class="ml-50 stroke icon">*</span></h4></div>`);
      });
      _push(`<!--]--></div><div class="box non-strok"><!--[-->`);
      ssrRenderList(unref(data$3), (item) => {
        _push(`<div class="item"><h4 class="d-flex align-items-center"><span>${ssrInterpolate(item.title)}</span><span class="ml-50 stroke icon">*</span></h4></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/Marquee.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const data$2 = [
  {
    id: 1,
    img: "/assets/imgs/brands/01.png"
  },
  {
    id: 2,
    img: "/assets/imgs/brands/02.png"
  },
  {
    id: 3,
    img: "/assets/imgs/brands/03.png"
  },
  {
    id: 4,
    img: "/assets/imgs/brands/04.png"
  },
  {
    id: 5,
    img: "/assets/imgs/brands/05.png"
  }
];
const _sfc_main$4 = {
  __name: "Brands",
  __ssrInlineRender: true,
  setup(__props) {
    const swiperOptions = {
      slidesPerView: 5,
      loop: true,
      spaceBetween: 40,
      breakpoints: {
        0: {
          slidesPerView: 2
        },
        640: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 5
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "clients-carso" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-11"><div class="swiper5">`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps({
        id: "content-carousel-container-unq-clients",
        class: "swiper-container"
      }, swiperOptions), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data$2), (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: item.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="item"${_scopeId2}><div class="img icon-img-100"${_scopeId2}><a href="#0"${_scopeId2}><img${ssrRenderAttr("src", item.img)} alt=""${_scopeId2}></a></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "item" }, [
                        createVNode("div", { class: "img icon-img-100" }, [
                          createVNode("a", { href: "#0" }, [
                            createVNode("img", {
                              src: item.img,
                              alt: ""
                            }, null, 8, ["src"])
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(data$2), (item) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: item.id
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "item" }, [
                      createVNode("div", { class: "img icon-img-100" }, [
                        createVNode("a", { href: "#0" }, [
                          createVNode("img", {
                            src: item.img,
                            alt: ""
                          }, null, 8, ["src"])
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
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/Brands.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const data$1 = [
  {
    id: 1,
    title: "The Power of Influencer Marketing",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  },
  {
    id: 2,
    title: "Unique and Influential Design",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  },
  {
    id: 3,
    title: "We Build and Activate Brands",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  },
  {
    id: 4,
    title: "Unique and Influential Design",
    content: "Taken possession of my entire soul, like these sweet mornings of spring which i enjoy with my whole."
  }
];
const _sfc_main$3 = {
  __name: "Accordions",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-6 d-flex align-items-center justify-content-center"><div class="exp valign text-center"><div class="full-width"><h2>12+</h2><h6 class="sub-title">Years of Experience</h6></div></div></div><div class="col-lg-6"><div class="accordion bord full-width"><div class="sec-head mb-70"><span class="sub-title mb-15 opacity-8">- Services</span><h3 class="text-u f-bold fz-50">What We <span class="f-ultra-light">Do</span> ?</h3></div><!--[-->`);
      ssrRenderList(unref(data$1), (item, index) => {
        _push(`<div class="${ssrRenderClass(`item ${index !== unref(data$1).length - 1 ? "mb-20" : ""} wow fadeInUp`)}"${ssrRenderAttr("data-wow-delay", `${index * 0.2 + 0.1}s`)}><div class="title"><h4>${ssrInterpolate(item.title)}</h4><span class="ico"></span></div><div class="accordion-info"><p>${ssrInterpolate(item.content)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/Accordions.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const data = [
  {
    id: 1,
    title: "Utilizing mobile technology in the field.",
    tag: "Inspiration",
    date: "August 7, 2022",
    link: "/blog-details",
    img: "/assets/imgs/blog/b1.jpg",
    readMoreLink: "/blog-details"
  },
  {
    id: 2,
    title: "Working from home? Let\u2019s get started.",
    tag: "Inspiration",
    date: "August 7, 2022",
    link: "/blog-details",
    img: "/assets/imgs/blog/b2.jpg",
    readMoreLink: "/blog-details"
  },
  {
    id: 3,
    title: "There\u2019s an actual science to create good music.",
    tag: "Inspiration",
    date: "August 7, 2022",
    link: "/blog-details",
    img: "/assets/imgs/blog/b3.jpg",
    readMoreLink: "/blog-details"
  }
];
const _sfc_main$2 = {
  __name: "Blog",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "blog-list section-padding bg-gray text-dark" }, _attrs))}><div class="container"><div class="sec-head mb-80"><div class="d-flex align-items-center justify-end"><div><span class="sub-title mb-15 opacity-8">- News</span><h3 class="text-u f-bold fz-50">Blog &amp; <span class="f-ultra-light">Insights</span></h3></div><div class="ml-auto underline"><a href="/blog" class="animsition-link all-more sub-title ls1"><span>View All Posts <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></span></a></div></div></div><!--[-->`);
      ssrRenderList(unref(data), (item, index) => {
        _push(`<div class="${ssrRenderClass(`item block wow fadeInUp`)}"${ssrRenderAttr("data-wow-delay", `${index * 0.2 + 0.2}s`)} data-fx="3"><a${ssrRenderAttr("href", item.link)} class="block__link animsition-link"${ssrRenderAttr("data-img", item.img)}></a><div class="row"><div class="col-lg-6 cont"><div class="info"><span class="tag">${ssrInterpolate(item.tag)}</span><span class="date">${ssrInterpolate(item.date)}</span></div><h3 class="text-u">${ssrInterpolate(item.title)}</h3></div><div class="col-lg-3 offset-lg-3 d-flex align-items-center justify-end"><div class="ml-auto"><a${ssrRenderAttr("href", item.readMoreLink)} class="more mt-15 animsition-link"><span>Continue Read <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path></svg></span></a></div></div></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/Blog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    reactive({
      gsapAnimation: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "contact section-padding" }, _attrs))}><div class="contact-container"><div class="container"><div class="row justify-content-center"><div class="col-lg-8"><div class="sec-head mb-80"><span class="sub-title mb-15 opacity-8">- Contact Us</span><h3 class="text-u f-bold fz-50">Get In <span class="f-ultra-light">Touch</span>.</h3></div><div class="full-width"><form id="contact-form" method="post" action="contact.php"><div class="messages"></div><div class="controls row"><div class="col-lg-6"><div class="form-group mb-30"><input id="form_name" type="text" name="name" placeholder="Name" required></div></div><div class="col-lg-6"><div class="form-group mb-30"><input id="form_email" type="email" name="email" placeholder="Email" required></div></div><div class="col-12"><div class="form-group"><textarea id="form_message" name="message" placeholder="Message" rows="4" required></textarea></div><div class="mt-30 hover-this cursor-pointer"><button type="submit" class="hover-anim"><span class="text">Let&#39;s Talk</span></button></div></div></div></form></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Landing/Contact.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "landing",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Landing`,
      bodyAttrs: {
        class: "landing"
      },
      link: [
        {
          rel: "stylesheet",
          href: "/assets/css/base.css"
        }
      ],
      script: [
        { src: "/assets/js/TweenMax.min.js" },
        { src: "/assets/js/charming.min.js" },
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$9;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$a;
      const _component_LandingHeader = __nuxt_component_3;
      const _component_LandingAbout = __nuxt_component_4;
      const _component_LandingWorks = _sfc_main$6;
      const _component_LandingMarquee = _sfc_main$5;
      const _component_LandingBrands = _sfc_main$4;
      const _component_LandingAccordions = _sfc_main$3;
      const _component_LandingBlog = _sfc_main$2;
      const _component_LandingContact = _sfc_main$1;
      const _component_CommonFooter1 = _sfc_main$b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_LandingHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingMarquee, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingBrands, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingAccordions, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingBlog, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_LandingContact, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/landing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=landing-BcSTIutd.mjs.map
