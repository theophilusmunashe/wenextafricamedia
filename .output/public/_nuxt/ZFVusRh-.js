import{_ as y}from"./Bjdl2_Gg.js";import{_ as P,a as j}from"./BHNoOPpD.js";import{S as _,a as v}from"./CJdJ3ru-.js";import{K as C}from"./Dxta6AFR.js";import{M as g}from"./DvJtwnOX.js";import{N as B}from"./RoNAZcQL.js";import{P as N}from"./1Hrvkrd3.js";import{A as V}from"./C4Hvce3u.js";import{l as F}from"./8zUmHKob.js";import{l as w,h as T,n as E,o,c as d,a as e,b as l,w as c,F as m,r as f,u as a,j as k,m as h,t as b,g as I}from"./Zy1-WHrM.js";import{u as A}from"./LszVx1GI.js";import"./DMywygAQ.js";const x=[{id:1,background:"/assets/imgs/works/full/7.jpg",link:"/project1",text:{title:"Econet Wireless ",subtitle:"Drone Show"}},{id:2,background:"/assets/imgs/works/full/2.jpg",link:"/project2",text:{title:"Stanbic Bank",subtitle:"Branding"}},{id:3,background:"/assets/imgs/works/full/3.jpg",link:"/project3",text:{title:"Econet Wireless ",subtitle:"Hallo 25 Programmes"}},{id:4,background:"/assets/imgs/works/full/11.jpg",link:"/project4",text:{title:"CNRG",subtitle:"Livestream"}},{id:5,background:"/assets/imgs/works/full/8.jpg",link:"/project1",text:{title:"NewzRoom Afrika",subtitle:"Content Creation"}}],M={class:"carousel-slider valign"},$={class:"full-width"},G={class:"gallery-img"},L={class:"swiper-slide"},R=["data-background"],z=["href"],D={class:"gallery-text"},H={class:"text"},K=I('<div class="swiper-controls"><div class="swiper-button-next swiper-nav-ctrl cursor-pointer"><div><span>Next Slide</span></div><div><i class="fas fa-chevron-right"></i></div></div><div class="swiper-button-prev swiper-nav-ctrl cursor-pointer"><div><i class="fas fa-chevron-left"></i></div><div><span>Prev Slide</span></div></div></div><div class="swiper-pagination"></div>',2),O={__name:"CarouselSlider",setup(S){const s=w(null),t=w(null),u={modules:[B,V,C,g,N],onSwiper(i){s.value=i},spaceBetween:80,slidesPerView:2,centeredSlides:!0,loop:!0,loopedSlides:4,mousewheel:!0,speed:1500,navigation:{nextEl:".carousel-slider .swiper-controls .swiper-button-next",prevEl:".carousel-slider .swiper-controls .swiper-button-prev"},pagination:{el:".carousel-slider .swiper-pagination",clickable:!0,renderBullet(i,n){return'<span class="'+n+'"><svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16"><circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"stroke-opacity="1" stroke-width="1px"></circle><circle cx="8" cy="8" r="3" fill="#FFF"></circle></svg></span>'}},keyboard:{enabled:!0},breakpoints:{0:{slidesPerView:1},640:{slidesPerView:1},768:{slidesPerView:2},1024:{slidesPerView:2}}},p={modules:[g],onSwiper(i){t.value=i},spaceBetween:30,slidesPerView:1,direction:"vertical",loop:!0,loopedSlides:4,touchRatio:.2,slideToClickedSlide:!0,mousewheel:!0,speed:1500};return T(()=>{F()}),E([s,t],()=>{s.value&&t.value&&(s.value.on("slideChangeTransitionStart",function(){t.value.slideTo(s.value.activeIndex)}),t.value.on("transitionStart",function(){s.value.slideTo(t.value.activeIndex)}))}),(i,n)=>(o(),d("header",M,[e("div",$,[e("div",G,[l(a(v),h(u,{class:"swiper-container"}),{default:c(()=>[(o(!0),d(m,null,f(a(x),r=>(o(),k(a(_),{key:r.id},{default:c(()=>[e("div",L,[e("div",{class:"bg-img","data-background":r.background,"data-overlay-dark":"3"},[e("a",{href:r.link,class:"animsition-link"},null,8,z)],8,R)])]),_:2},1024))),128))]),_:1},16)]),e("div",D,[l(a(v),h(p,{class:"swiper-container swiper-container-initialized swiper-container-vertical"}),{default:c(()=>[(o(!0),d(m,null,f(a(x),r=>(o(),k(a(_),{key:r.id},{default:c(()=>[e("div",H,[e("h4",null,b(r.text.title),1),e("h6",null,[e("span",null,b(r.text.subtitle),1)])])]),_:2},1024))),128))]),_:1},16)])]),K]))}},re={__name:"carousel-slider",setup(S){return A({titleTemplate:"Sources-Consultants: Projects",bodyAttrs:{class:"main-bg"}}),(s,t)=>{const u=y,p=P,i=j,n=O;return o(),d(m,null,[l(u),l(p),l(i),l(n)],64)}}};export{re as default};
