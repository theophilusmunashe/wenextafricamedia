import{_ as h}from"./DMywygAQ.js";import{a as v}from"./Bjdl2_Gg.js";import{h as _,i as p,o as u,c as m,a as s,q as d,b as f,w as k,d as a,g as b}from"./Zy1-WHrM.js";const g={class:"container"},w=s("img",{src:v,alt:""},null,-1),y=s("span",{class:"text"},[s("span",{class:"word"},"Menu")],-1),M=s("span",{class:"icon"},[s("i"),s("i")],-1),S=[y,M],U={__name:"Navbar",props:["borderBottom"],setup(c){const n=()=>{const e=document.querySelector(".topnav");window.scrollY>100?e.classList.add("nav-scroll"):e.classList.remove("nav-scroll")};_(()=>{window.addEventListener("scroll",n)}),p(()=>{window.removeEventListener("scroll",n)});const o=()=>{const e=document.querySelector(".topnav");document.querySelector(".hamenu").classList.toggle("open"),document.querySelector(".topnav .menu-icon").classList.toggle("open"),e.classList.toggle("navlit"),document.querySelector(".topnav .menu-icon").classList.contains("open")?document.querySelector(".hamenu").style.top="0":document.querySelector(".hamenu").style.top="-100%"};return(e,r)=>{const i=h;return u(),m("div",{id:"navi",class:d(["topnav blur",{"bord-thin-bottom":c.borderBottom}])},[s("div",g,[s("div",{class:d(`logo icon-img-${c.borderBottom?"100":"90"}`)},[f(i,{to:"/"},{default:k(()=>[w]),_:1})],2),s("div",{class:"menu-icon cursor-pointer",onClick:o},S)])],2)}}},L={class:"hamenu valign"},q={class:"container"},x={class:"row"},C={class:"col-lg-8"},E={class:"menu-links"},B={class:"main-menu rest"},$=s("span",{class:"nm"},"01.",-1),N=s("span",{class:"nm"},"02.",-1),T=s("span",{class:"nm"},"03.",-1),z=s("i",{class:"pe-7s-angle-left"},null,-1),j=s("li",null,null,-1),A=s("span",{class:"nm"},"04.",-1),H=s("span",{class:"nm"},"05.",-1),O=b('<div class="col-lg-4 valign"><div class="cont-info"><div class="item mb-50"><h6 class="text-u fw-600 mb-20">Address</h6><p class="fw-400 fz-18">3rd floor Runhare HOUSE 107 kwame Nkrumah HARARE</p></div><div class="item mb-50"><h6 class="text-u fw-600 mb-20">How to Connect</h6><p class="fw-400 fz-18">+263776517766</p><p class="fw-400 fz-18">admin@sourcesmedia.com</p></div><div class="bottom"><h6 class="text-u fw-600 mb-20">Follow Us</h6><ul class="rest social-text d-flex fz-13"><li class="mr-20"><a href="/#0" class="hover-this"><span class="hover-anim">Facebook</span></a></li><li class="mr-20"><a href="/#0" class="hover-this"><span class="hover-anim">Twitter</span></a></li><li class="mr-20"><a href="/#0" class="hover-this"><span class="hover-anim">LinkedIn</span></a></li><li><a href="/#0" class="hover-this"><span class="hover-anim">Instagram</span></a></li></ul></div></div></div>',1),F={__name:"Menu",setup(c){const n=()=>{document.querySelector(".hamenu").classList.remove("open")},o=t=>{Object.values(t.currentTarget.parentElement.children).forEach(l=>l.style.opacity="0.5"),t.currentTarget.style.opacity="1"},e=t=>{Object.values(t.currentTarget.parentElement.children).forEach(l=>l.style.opacity="1")},r=t=>{document.querySelector(".main-menu").classList.add("gosub"),t.currentTarget.parentElement.parentElement.querySelector(".sub-menu").classList.add("sub-open")},i=()=>{document.querySelector(".main-menu").classList.remove("gosub"),document.querySelector(".main-menu .sub-menu").classList.remove("sub-open")};return(t,l)=>(u(),m("div",L,[s("div",q,[s("div",x,[s("div",C,[s("div",E,[s("ul",B,[s("li",{onMouseenter:o,onMouseleave:e},[s("div",{class:"o-hidden"},[s("a",{href:"/about",class:"link animsition-link",onClick:n},[$,a("Home")])])],32),s("li",{onMouseenter:o,onMouseleave:e},[s("div",{class:"o-hidden"},[s("a",{href:"/about",class:"link animsition-link",onClick:n},[N,a("About")])])],32),s("li",{onMouseenter:o,onMouseleave:e},[s("div",{class:"o-hidden"},[s("span",{class:"link dmenu",onClick:r},[T,a("Projects ")])]),s("div",{class:"sub-menu"},[s("ul",{class:"rest"},[s("li",null,[s("div",{class:"o-hidden"},[s("span",{class:"sub-link back",onClick:i},[z,a(" Go Back")])])])]),s("div",{class:"row"},[s("div",{class:"col-md-6"},[s("ul",{class:"rest"},[j,s("li",null,[s("div",{class:"o-hidden"},[s("a",{href:"/carousel-slider",class:"sub-link animsition-link",onClick:n},"Sources Projects")])])])])])])],32),s("li",{onMouseenter:o,onMouseleave:e},[s("div",{class:"o-hidden"},[s("a",{href:"/#0",class:"link animsition-link",onClick:n},[A,a("Stories")])])],32),s("li",{onMouseenter:o,onMouseleave:e},[s("div",{class:"o-hidden"},[s("a",{href:"/contact",class:"link animsition-link",onClick:n},[H,a("Contact")])])],32)])])]),O])])]))}};export{U as _,F as a};
