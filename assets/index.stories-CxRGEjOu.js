import{J as i,I as r,j as s,c as o}from"./iframe-8PfW34ZG.js";import{b as a}from"./index-t8Ad9woq.js";import{f as l,Z as c,S as p,e as u,H as m}from"./index-BbWNeX2n.js";import"./preload-helper-PPVm8Dsz.js";import"./index-FFRRUK6N.js";const x=()=>{const t=i(),e=r();return s.jsxs("div",{className:o({alignItems:"center",backgroundColor:"background",display:"flex",justifyContent:"space-between",padding:"4px 8px"}),children:[s.jsx(a,{type:"button",label:"ミッション",size:"xl",active:t==="/"||t.startsWith("/missions"),onClick:()=>e.push("/"),children:s.jsx(l,{size:24})}),s.jsx(a,{type:"button",label:"アイテム",size:"xl",active:t.startsWith("/powerups"),onClick:()=>e.push("/powerups"),children:s.jsx(c,{size:24})}),s.jsx(a,{type:"button",label:"クエスト",size:"xl",active:t.startsWith("/quests"),onClick:()=>e.push("/quests"),children:s.jsx(p,{size:24})}),s.jsx(a,{type:"button",label:"ヴィラン",size:"xl",active:t.startsWith("/villains"),onClick:()=>e.push("/villains"),children:s.jsx(u,{size:24})}),s.jsx(a,{type:"button",label:"マイページ",size:"xl",active:t.startsWith("/me"),onClick:()=>e.push("/me"),children:s.jsx(m,{size:24})})]})},y={component:x},n={decorators:[t=>s.jsx("div",{style:{width:"400px"},children:s.jsx(t,{})})],parameters:{nextjs:{navigation:{pathname:"/me"}}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '400px'
  }}>
        <Story />
      </div>],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/me'
      }
    }
  }
} satisfies Story`,...n.parameters?.docs?.source}}};const f=["Default"];export{n as Default,f as __namedExportsOrder,y as default};
