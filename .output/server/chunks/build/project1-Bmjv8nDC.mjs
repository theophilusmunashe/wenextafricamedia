import { _ as _sfc_main$6 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$7 } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, mergeProps, onUnmounted, unref } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0 } from './virtual_public-Bxc5qqGJ.mjs';
import { _ as _sfc_main$8 } from './Footer1-C1sHJYFV.mjs';
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

const _sfc_main$5 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header-project1" }, _attrs))}><div class="container mt-100"><div class="row"><div class="col-lg-6 valign"><div class="full-width mb-30"><h1 class="fz-60">Project 1</h1><p>The Econet Wireless Drone Show was a testament to the power of innovative thinking and creative execution. Sources Consultants is proud to have partnered with Econet Wireless to create a groundbreaking event that celebrated technological advancement and left a lasting impression on all who attended.</p></div></div><div class="col-lg-5 offset-lg-1"><div class="info"><div class="row"><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Client:</span><h6>Econet Wireless</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Project :</span><h6>Drone Show Spectacular</h6></div></div><div class="col-md-6"><div class="item mb-30"><span class="opacity-8 mb-5">Start Date :</span><h6>7 August 2021</h6></div></div><div class="col-md-6"><div class="item"><span class="opacity-8 mb-5">Location :</span><h6>Harare, Zimbabwe</h6></div></div></div></div></div></div></div><div class="bg-img mt-100" data-background="/assets/imgs/works/projects/0/7.jpg"></div></header>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/Header.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding bord-thin-bottom" }, _attrs))}><div class="container"><div class="row"><div class="col-lg-5"><h2 class="mb-50">The <br> Overview:</h2></div><div class="col-lg-7"><div class="text"><h5 class="mb-30 fw-400 line-height-40">Econet Wireless approached Sources Consultants to create a mesmerizing and unforgettable drone show for their annual celebration event. The goal was to showcase Econet&#39;s innovative spirit and commitment to cutting-edge technology, while captivating the audience with a visually stunning and immersive experience.</h5><p class="fz-18">Objective: To highlight Econet Wireless as a leader in innovation and technology. To create a memorable and engaging spectacle for attendees. To reinforce the brand\u2019s commitment to excellence and forward-thinking.</p></div></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/TopContent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const data = [
  {
    id: 1,
    image: "/assets/imgs/works/projects/0/7.jpg"
  },
  {
    id: 2,
    image: "/assets/imgs/works/projects/0/3.jpg"
  },
  {
    id: 3,
    image: "/assets/imgs/works/projects/0/4.jpg"
  },
  {
    id: 4,
    image: "/assets/imgs/works/projects/0/5.jpg"
  },
  {
    id: 5,
    image: "/assets/imgs/works/projects/0/6.jpg"
  },
  {
    id: 6,
    image: "/assets/imgs/works/projects/0/2.jpg"
  }
];
const _sfc_main$3 = {
  __name: "Works",
  __ssrInlineRender: true,
  setup(__props) {
    onUnmounted(() => {
      (void 0).removeEventListener("resize", handleResize);
    });
    function handleResize() {
      const allTriggers = ScrollTrigger.getAll();
      if ((void 0).innerWidth < 991 && allTriggers.length || (void 0).innerWidth > 991 && !allTriggers.length) {
        (void 0).location.reload();
      }
      allTriggers.forEach((trigger) => {
        trigger.update();
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "works thecontainer ontop" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(data), (item) => {
        _push(`<div class="panel"><div class="item"><div class="img"><img${ssrRenderAttr("src", item.image)} alt=""></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/Works.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-padding bord-thin-top" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-7"><div class="text"><h2 class="mb-50">The Solution</h2><h5 class="mb-30 fw-400"> Collaborated with Econet Wireless to understand their vision and key messages. Designed a thematic concept that aligned with Econet&#39;s brand values and technological prowess. Storyboarding and Visualization: Developed detailed storyboards and visualizations to outline the show\u2019s sequence. Created 3D animations to preview the drone formations and movements. Drone Choreography: Crafted intricate drone choreography synchronized with a powerful musical score. Programmed drones to form dynamic patterns, shapes, and logos representing Econet Wireless. Technical Execution: Coordinated with a team of expert drone operators and technicians. Ensured all safety protocols and regulations were meticulously followed. Event Management: Managed the entire event setup, including lighting, sound, and on-ground logistics. Provided real-time coordination and supervision during the show to ensure flawless execution. </h5><p class="fz-18">Results: The drone show was a spectacular success, leaving the audience in awe and generating widespread acclaim. Enhanced Econet Wireless\u2019s reputation as a technology leader and innovator. Achieved significant media coverage and positive social media buzz, amplifying the event\u2019s reach and impact. <br><br> Client Feedback: &quot;Sources Consultants delivered an extraordinary drone show that perfectly encapsulated our vision and values. Their creativity, precision, and professionalism were evident in every aspect of the project. The event was a resounding success, and we received numerous compliments from attendees and stakeholders. We look forward to collaborating with Sources Consultants on future projects.&quot; \u2014 John Matiza, Marketing Director, Econet Wireless</p></div></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/BottomContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "next-project section-padding sub-bg" }, _attrs))}><div class="contact-container"><div class="container"><div class="row"><div class="col-12"><div class="text-center"><h6 class="sub-title fz-18">Next Project</h6><div class="inline"><div class="d-flex align-items-center"><a href="/project2" class="animsition-link fz-70 fw-700 stroke">Stanbic - Brand Strategy</a><span class="ml-15"><img${ssrRenderAttr("src", _imports_0)} alt="" class="icon-img-70"></span></div></div></div></div></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project/One/NextProject.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "project1",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Project One`,
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
      const _component_ProjectOneHeader = _sfc_main$5;
      const _component_ProjectOneTopContent = __nuxt_component_4;
      const _component_ProjectOneWorks = _sfc_main$3;
      const _component_ProjectOneBottomContent = __nuxt_component_6;
      const _component_ProjectOneNextProject = __nuxt_component_7;
      const _component_CommonFooter1 = _sfc_main$8;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg"><div class="main-box main-bg ontop">`);
      _push(ssrRenderComponent(_component_ProjectOneHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectOneTopContent, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectOneWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_ProjectOneBottomContent, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ProjectOneNextProject, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=project1-Bmjv8nDC.mjs.map
