import{_ as y}from"./D1f8senQ.js";import{_ as C,a as P}from"./BJ4iDsA-.js";import{S as _,a as v}from"./CgQt3hqy.js";import{K as j}from"./BkgMdi3b.js";import{M as f}from"./7JIftPHa.js";import{N as B}from"./DEIaa9tQ.js";import{P as V}from"./gUSv_ijn.js";import{A as N}from"./zEEz-oyS.js";import{l as F}from"./8zUmHKob.js";import{l as g,h as T,n as I,o,c as d,a as e,b as l,w as c,F as m,r as w,u as r,j as k,m as h,t as b,f as M}from"./B-MJbAkl.js";import{u as A}from"./fsF2qbzP.js";import"./YNlpmhe-.js";const x=[{id:1,background:"/assets/imgs/works/full/7.jpeg",link:"/project1",text:{title:"Best Car Rental ",subtitle:"Corporate Video"}},{id:2,background:"/assets/imgs/works/full/2.jpg",link:"/project2",text:{title:"Stanbic Bank",subtitle:"Branding"}},{id:3,background:"/assets/imgs/works/full/3.jpg",link:"/project3",text:{title:"Econet Wireless ",subtitle:"Hallo 25 Programmes"}},{id:4,background:"/assets/imgs/works/full/11.jpg",link:"/project4",text:{title:"CNRG",subtitle:"Livestream"}},{id:5,background:"/assets/imgs/works/full/8.jpg",link:"/project1",text:{title:"Tunyafrika Xperience",subtitle:"Content Creation Video"}}],E={class:"carousel-slider valign"},$={class:"full-width"},G={class:"gallery-img"},L={class:"swiper-slide"},R=["data-background"],H=["href"],K={class:"gallery-text"},O={class:"text"},W=M('<div class="swiper-controls"><div class="swiper-button-next swiper-nav-ctrl cursor-pointer"><div><span>Next Slide</span></div><div><i class="fas fa-chevron-right"></i></div></div><div class="swiper-button-prev swiper-nav-ctrl cursor-pointer"><div><i class="fas fa-chevron-left"></i></div><div><span>Prev Slide</span></div></div></div><div class="swiper-pagination"></div>',2),z={__name:"CarouselSlider",setup(S){const s=g(null),t=g(null),u={modules:[B,N,j,f,V],onSwiper(i){s.value=i},spaceBetween:80,slidesPerView:2,centeredSlides:!0,loop:!0,loopedSlides:4,mousewheel:!0,speed:1500,navigation:{nextEl:".carousel-slider .swiper-controls .swiper-button-next",prevEl:".carousel-slider .swiper-controls .swiper-button-prev"},pagination:{el:".carousel-slider .swiper-pagination",clickable:!0,renderBullet(i,n){return'<span class="'+n+'"><svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16"><circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"stroke-opacity="1" stroke-width="1px"></circle><circle cx="8" cy="8" r="3" fill="#FFF"></circle></svg></span>'}},keyboard:{enabled:!0},breakpoints:{0:{slidesPerView:1},640:{slidesPerView:1},768:{slidesPerView:2},1024:{slidesPerView:2}}},p={modules:[f],onSwiper(i){t.value=i},spaceBetween:30,slidesPerView:1,direction:"vertical",loop:!0,loopedSlides:4,touchRatio:.2,slideToClickedSlide:!0,mousewheel:!0,speed:1500};return T(()=>{F()}),I([s,t],()=>{s.value&&t.value&&(s.value.on("slideChangeTransitionStart",function(){t.value.slideTo(s.value.activeIndex)}),t.value.on("transitionStart",function(){s.value.slideTo(t.value.activeIndex)}))}),(i,n)=>(o(),d("header",E,[e("div",$,[e("div",G,[l(r(v),h(u,{class:"swiper-container"}),{default:c(()=>[(o(!0),d(m,null,w(r(x),a=>(o(),k(r(_),{key:a.id},{default:c(()=>[e("div",L,[e("div",{class:"bg-img","data-background":a.background,"data-overlay-dark":"3"},[e("a",{href:a.link,class:"animsition-link"},null,8,H)],8,R)])]),_:2},1024))),128))]),_:1},16)]),e("div",K,[l(r(v),h(p,{class:"swiper-container swiper-container-initialized swiper-container-vertical"}),{default:c(()=>[(o(!0),d(m,null,w(r(x),a=>(o(),k(r(_),{key:a.id},{default:c(()=>[e("div",O,[e("h4",null,b(a.text.title),1),e("h6",null,[e("span",null,b(a.text.subtitle),1)])])]),_:2},1024))),128))]),_:1},16)])]),W]))}},ae={__name:"carousel-slider",setup(S){return A({titleTemplate:"WeNext Africa Media: Projects",bodyAttrs:{class:"main-bg"}}),(s,t)=>{const u=y,p=C,i=P,n=z;return o(),d(m,null,[l(u),l(p),l(i),l(n)],64)}}};export{ae as default};