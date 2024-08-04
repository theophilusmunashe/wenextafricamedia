import { _ as _sfc_main$4 } from './virtual_public-BFwKEG61.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$5 } from './Menu-PeBTF4l6.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$6 } from './Footer1-C1sHJYFV.mjs';
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

const _imports_0 = publicAssetsURL("/assets/imgs/svg-assets/hi.png");
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "contact-header section-padding" }, _attrs))}><div class="container mt-100"><div class="row justify-content-center"><div class="col-12"><div class="cont text-center mb-80"><h6 class="sub-title mb-15"><span class="icon-img-30 mr-10"><img${ssrRenderAttr("src", _imports_0)} alt=""></span> Hello, Let&#39;s get in touch</h6><h1>Get In Touch.</h1></div></div><div class="col-lg-11"><div class="google-map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.2455980322216!2d31.051045974668092!3d-17.82711817628437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4e6d5f29c19%3A0x7f771a3f374ed974!2sRunhare%20House%2C%20Union%20Ave%2C%20Harare!5e0!3m2!1sen!2szw!4v1716551226096!5m2!1sen!2szw" width="600" height="450" style="${ssrRenderStyle({ "border": "0" })}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div></div></div></header>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "info-contact section-padding sub-bg pt-0" }, _attrs))}><div class="container"><div class="sec-head text-center mb-80"><span class="sub-title mb-15 opacity-8">- Contact Info</span><h3 class="text-u fz-50">Contact With Us!</h3></div><div class="row justify-content-center"><div class="col-lg-4 col-md-6"><div class="item text-center sm-mb50 md-mb50"><span class="sub-title opacity-8 mb-5">Email :</span><h6>admin@sourcesmedia.com</h6></div></div><div class="col-lg-4 col-md-6"><div class="item text-center sm-mb50"><span class="sub-title opacity-8 mb-5">office :</span><h6>3rd floor Runhare HOUSE 107 kwame Nkrumah Harare, Zimbabwe</h6></div></div><div class="col-lg-4 col-md-6"><div class="item text-center"><span class="sub-title opacity-8 mb-5">Phone :</span><h6>+263776517766</h6></div></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact/Info.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "contact section-padding" }, _attrs))}><div class="container"><div class="row justify-content-center"><div class="col-lg-8"><div class="full-width"><div class="sec-head text-center mb-80"><span class="sub-title mb-15 opacity-8">- Contact Us</span><h3 class="text-u fz-50">Get In Touch.</h3></div><form id="contact-form" method="post" action="contact.php"><div class="messages"></div><div class="controls row"><div class="col-lg-6"><div class="form-group mb-30"><input id="form_name" type="text" name="name" placeholder="Name"></div></div><div class="col-lg-6"><div class="form-group mb-30"><input id="form_email" type="email" name="email" placeholder="Email"></div></div><div class="col-12"><div class="form-group"><textarea id="form_message" name="message" placeholder="Message" rows="4"></textarea></div><div class="text-center"><div class="mt-30 hover-this cursor-pointer"><button type="submit" class="hover-anim"><span class="text">Let&#39;s Talk</span></button></div></div></div></div></form></div></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact/Form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `Sources-Consultants: Contact`,
      bodyAttrs: {
        class: "main-bg"
      },
      script: [
        { src: "/assets/js/smoother-script.js", defer: true }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoader = _sfc_main$4;
      const _component_CommonNavbar = _sfc_main$1$1;
      const _component_CommonMenu = _sfc_main$5;
      const _component_ContactHeader = __nuxt_component_3;
      const _component_ContactInfo = __nuxt_component_4;
      const _component_ContactForm = __nuxt_component_5;
      const _component_CommonFooter1 = _sfc_main$6;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoader, null, null, _parent));
      _push(`<div id="smooth-wrapper">`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonMenu, null, null, _parent));
      _push(`<div id="smooth-content"><main class="main-bg">`);
      _push(ssrRenderComponent(_component_ContactHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_ContactInfo, null, null, _parent));
      _push(ssrRenderComponent(_component_ContactForm, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonFooter1, { subBg: true }, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-DHt8q3wn.mjs.map
