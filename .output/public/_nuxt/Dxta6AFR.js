import{g as U,b as W,$ as E}from"./CJdJ3ru-.js";function L({swiper:e,extendParams:K,on:y,emit:N}){const i=U(),g=W();e.keyboard={enabled:!1},K({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}});function m(P){if(!e.enabled)return;const{rtlTranslate:f}=e;let t=P;t.originalEvent&&(t=t.originalEvent);const o=t.keyCode||t.charCode,v=e.params.keyboard.pageUpDown,a=v&&o===33,l=v&&o===34,d=o===37,s=o===39,c=o===38,u=o===40;if(!e.allowSlideNext&&(e.isHorizontal()&&s||e.isVertical()&&u||l)||!e.allowSlidePrev&&(e.isHorizontal()&&d||e.isVertical()&&c||a))return!1;if(!(t.shiftKey||t.altKey||t.ctrlKey||t.metaKey)&&!(i.activeElement&&i.activeElement.nodeName&&(i.activeElement.nodeName.toLowerCase()==="input"||i.activeElement.nodeName.toLowerCase()==="textarea"))){if(e.params.keyboard.onlyInViewport&&(a||l||d||s||c||u)){let D=!1;if(e.$el.parents(`.${e.params.slideClass}`).length>0&&e.$el.parents(`.${e.params.slideActiveClass}`).length===0)return;const $=e.$el,C=$[0].clientWidth,H=$[0].clientHeight,x=g.innerWidth,A=g.innerHeight,n=e.$el.offset();f&&(n.left-=e.$el[0].scrollLeft);const V=[[n.left,n.top],[n.left+C,n.top],[n.left,n.top+H],[n.left+C,n.top+H]];for(let b=0;b<V.length;b+=1){const r=V[b];if(r[0]>=0&&r[0]<=x&&r[1]>=0&&r[1]<=A){if(r[0]===0&&r[1]===0)continue;D=!0}}if(!D)return}e.isHorizontal()?((a||l||d||s)&&(t.preventDefault?t.preventDefault():t.returnValue=!1),((l||s)&&!f||(a||d)&&f)&&e.slideNext(),((a||d)&&!f||(l||s)&&f)&&e.slidePrev()):((a||l||c||u)&&(t.preventDefault?t.preventDefault():t.returnValue=!1),(l||u)&&e.slideNext(),(a||c)&&e.slidePrev()),N("keyPress",o)}}function k(){e.keyboard.enabled||(E(i).on("keydown",m),e.keyboard.enabled=!0)}function h(){e.keyboard.enabled&&(E(i).off("keydown",m),e.keyboard.enabled=!1)}y("init",()=>{e.params.keyboard.enabled&&k()}),y("destroy",()=>{e.keyboard.enabled&&h()}),Object.assign(e.keyboard,{enable:k,disable:h})}export{L as K};
