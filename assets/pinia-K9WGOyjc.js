import{Y as r,h as l,Z as p}from"./@vue-DGm23lbW.js";/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const u=Symbol();var o;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(o||(o={}));function f(){const t=r(!0),s=t.run(()=>l({}));let a=[],n=[];const c=p({install(e){c._a=e,e.provide(u,c),e.config.globalProperties.$pinia=c,n.forEach(i=>a.push(i)),n=[]},use(e){return this._a?a.push(e):n.push(e),this},_p:a,_a:null,_e:t,_s:new Map,state:s});return c}export{f as c};
