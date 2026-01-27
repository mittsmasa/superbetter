import{m as O,a as A,s as k,u as T,b as E,d as m,c as F,j as p}from"./iframe-DPlMxrgh.js";import{L as N}from"./link-B8eMmaKr.js";import{c as w}from"./cx-BFURdk0p.js";import{p as M}from"./pixel-border-B1oUDgUn.js";import{g as P,a as $}from"./date-CyM_0PVW.js";import"./preload-helper-PPVm8Dsz.js";const S=t=>({base:{},variants:{},defaultVariants:{},compoundVariants:[],...t});function C(t){const{base:e,variants:a,defaultVariants:s,compoundVariants:n}=S(t),c=r=>({...s,...A(r)});function i(r={}){const o=c(r);let d={...e};for(const[D,x]of Object.entries(o))a[D]?.[x]&&(d=m(d,a[D][x]));const u=K(n,o);return m(d,u)}function b(r){const o=S(r.config),d=T(r.variantKeys,Object.keys(a));return C({base:m(e,o.base),variants:Object.fromEntries(d.map(u=>[u,m(a[u],o.variants[u])])),defaultVariants:E(s,o.defaultVariants),compoundVariants:[...n,...o.compoundVariants]})}function y(r){return F(i(r))}const j=Object.keys(a);function V(r){return k(r,j)}const _=Object.fromEntries(Object.entries(a).map(([r,o])=>[r,Object.keys(o)]));return Object.assign(O(y),{__cva__:!0,variantMap:_,variantKeys:j,raw:i,config:t,merge:b,splitVariantProps:V,getVariantProps:c})}function K(t,e){let a={};return t.forEach(s=>{Object.entries(s).every(([c,i])=>c==="css"?!0:(Array.isArray(i)?i:[i]).some(y=>e[c]===y))&&(a=m(a,s.css))}),a}const L=C({base:{alignItems:"center",backgroundColor:"background",color:"foreground",display:"flex",flexDirection:"column",justifyContent:"center",width:"[30px]"},variants:{status:{"no-data":{color:"foreground.disabled"},achieved:{color:"background",backgroundColor:"foreground"},"not-achieved":{},today:{}}}}),I=t=>{const e=$(t),a=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${s}-${n}`},h=({date:t,status:e,isToday:a})=>{const{day:s,date:n}=P(t),c=I(t);return p.jsx(N,{href:`/history/${c}`,children:p.jsxs("div",{className:w(L({status:e}),a&&M({borderColor:"interactive.border.alt"})),children:[p.jsx("p",{children:s}),p.jsx("p",{children:n})]})})};try{h.displayName="DailyAchievementCard",h.__docgenInfo={description:"",displayName:"DailyAchievementCard",props:{}}}catch{}const z={component:h,args:{date:new Date("2024-12-30"),dateString:"2024-12-30",adventureLogs:[]}},l={args:{status:"not-achieved"}},g={args:{status:"achieved"}},f={args:{status:"no-data"}},v={args:{status:"achieved",isToday:!0}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'not-achieved'
  }
} satisfies Story`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'achieved'
  }
} satisfies Story`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'no-data'
  }
} satisfies Story`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'achieved',
    isToday: true
  }
} satisfies Story`,...v.parameters?.docs?.source}}};const G=["Default","Achieved","NoData","Today"];export{g as Achieved,l as Default,f as NoData,v as Today,G as __namedExportsOrder,z as default};
