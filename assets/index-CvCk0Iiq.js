import{d as g}from"./pinia-CzUw9r5-.js";import{h as c,j as I,D as h,a7 as w,c as u,a as l,o as d,B as f,a8 as v}from"./@vue-CRniypSI.js";import{_}from"./plugin-vueexport-helper-DlAUqK2U.js";const x=g("counter",()=>{const o=c(1),t=I(()=>o.value*2);function e(){o.value++}return{count:o,doubleCount:t,increment:e}});function $(o,t,e,r){const i=new IntersectionObserver(a=>{a.forEach(s=>{s.isIntersecting?t.value=e:t.value=""})},{root:null,rootMargin:"55px",threshold:0});o&&i.observe(o)}const y="/DevelopmentPlatform/static/webp/oneImage-CDb9-_P3.webp",b=["src"],V={__name:"oneImage",setup(o){const t=c(""),e=c(null),r=c(null);x().increment();function a(){const s=window.scrollY,n=r.value.offsetHeight,p=n-s,m=Math.min(p/n,1);m<.3?(e.value.style.transform="scale(0)",e.value.style.opacity="0"):(e.value.style.transform=`scale(${m})`,e.value.style.opacity=`${m}`)}return h(()=>{e.value&&($(e.value,t,y),window.addEventListener("scroll",a))}),w(()=>{window.removeEventListener("scroll",a)}),(s,n)=>(d(),u("div",{class:"netImage",ref_key:"imageRef",ref:e},[l("div",{class:"oneImage_left",ref_key:"imageRefBox",ref:r},[l("img",{class:"slide-rotate-hor-t-bck",style:{width:"100%",height:"100%"},src:t.value},null,8,b)],512),n[0]||(n[0]=l("div",{class:"oneImage_right"},"编辑您的专属个人信息",-1))],512))}},B=_(V,[["__scopeId","data-v-0238617c"]]),k={},C={class:"netImage"};function E(o,t){return d(),u("div",C,t[0]||(t[0]=[l("div",{class:"twoImage"}," 构建构建构建构建构建构建构建构建构建构建 ",-1)]))}const S=_(k,[["render",E],["__scopeId","data-v-39ed510a"]]),D={name:"netConsist",components:{oneImageVue:B,twoImageVue:S},data(){return{}}},M={class:"net"};function R(o,t,e,r,i,a){const s=v("oneImageVue"),n=v("twoImageVue");return d(),u("div",M,[f(s),f(n,{style:{"z-index":"10"}})])}const O=_(D,[["render",R],["__scopeId","data-v-9c882866"]]);export{O as default};
