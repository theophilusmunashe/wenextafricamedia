import{_ as f}from"./Bjdl2_Gg.js";import{_ as k,a as h}from"./BHNoOPpD.js";import{o,c as a,a as s,F as n,r as d,u as m,t as u,b as i}from"./Zy1-WHrM.js";import{u as v}from"./LszVx1GI.js";import"./DMywygAQ.js";const _=[{id:1,image:"/assets/imgs/works/full/1.jpg",link:"/project1",text:"Digital Retouch"},{id:2,image:"/assets/imgs/works/full/2.jpg",link:"/project2",text:"Earthmade Aroma"},{id:3,image:"/assets/imgs/works/full/3.jpg",link:"/project3",text:"Bank Rebranding"},{id:4,image:"/assets/imgs/works/full/10.jpg",link:"/project4",text:"Day Starter"},{id:5,image:"/assets/imgs/works/full/5.jpg",link:"/project1",text:"Blue Adobe MAX"},{id:6,image:"/assets/imgs/works/full/6.jpg",link:"/project2",text:"Carved Wood"},{id:7,image:"/assets/imgs/works/full/7.jpg",link:"/project3",text:"Viclone"},{id:8,image:"/assets/imgs/works/full/8.jpg",link:"/project4",text:"Blom Air Purifier"},{id:9,image:"/assets/imgs/works/full/11.jpg",link:"/project1",text:"Avocado Cutter"}],x={class:"inter-links-center vertical d-flex align-items-end section-padding pb-80"},j={class:"container-xxl"},b={class:"row"},L={class:"col-12 d-flex align-items-center justify-content-center"},y={class:"links-text"},w={class:"rest"},A=["data-tab"],E={class:"num"},S=["href"],B={class:"text f-bold"},M={class:"links-img"},V=["id"],$=["src"],q={__name:"InteractiveVertical",setup(g){const c=e=>{const r=e.currentTarget.dataset.tab;if(document.querySelectorAll(".links-text li").forEach(t=>{t.classList.remove("current"),t.classList.remove("no-active")}),e.currentTarget.classList.add("current"),e.currentTarget.classList.remove("no-active"),document.querySelectorAll(".links-img .img").forEach(t=>t.classList.remove("current")),document.querySelector("#"+r).classList.add("current"),e.currentTarget.classList.contains("current"))return!1},l=()=>{document.querySelectorAll(".links-text li").forEach(e=>{e.classList.remove("current"),e.classList.remove("no-active")}),document.querySelectorAll(".links-img .img").forEach(e=>e.classList.remove("current"))};return(e,r)=>(o(),a("section",x,[s("div",j,[s("div",b,[s("div",L,[s("div",y,[s("ul",w,[(o(!0),a(n,null,d(m(_),t=>(o(),a("li",{key:t.id,"data-tab":`tab-${t.id}`,onMouseenter:c,onMouseleave:l},[s("h2",null,[s("span",E,"0"+u(t.id)+".",1),s("a",{href:t.link,class:"animsition-link"},[s("span",B,u(t.text),1)],8,S)])],40,A))),128))])])])])]),s("div",M,[(o(!0),a(n,null,d(m(_),t=>(o(),a("div",{key:t.id,id:`tab-${t.id}`,class:"img","data-overlay-dark":"3"},[s("img",{src:t.image,alt:""},null,8,$)],8,V))),128))])]))}},P={__name:"interactive-vertical",setup(g){return v({titleTemplate:"%s - Portfolio Interactive Vertical",bodyAttrs:{class:"main-bg"}}),(c,l)=>{const e=f,r=k,t=h,p=q;return o(),a(n,null,[i(e),i(r),i(t),i(p)],64)}}};export{P as default};