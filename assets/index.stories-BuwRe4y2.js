import{j as e,c as i}from"./iframe-DDnZtspN.js";import{p}from"./pixel-border-CI7qsZrz.js";import"./preload-helper-PPVm8Dsz.js";const m=t=>new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric",timeZone:"Asia/Tokyo"}).format(t),c=({totalCount:t,weeklyCount:l,daysSinceCreation:u,lastExecutedAt:d})=>e.jsxs("div",{className:i({display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",px:"12px"}),children:[e.jsx(a,{label:"そうしょうかかいすう",value:`${t}回`}),e.jsx(a,{label:"こんしゅう",value:`${l}回`}),e.jsx(a,{label:"けいかにっすう",value:`${u}日`}),e.jsx(a,{label:"さいしゅうしょうか",value:d?m(d):"未実行"})]}),a=({label:t,value:l})=>e.jsx("div",{className:p({borderWidth:2,borderColor:"interactive.border"}),children:e.jsxs("div",{className:i({display:"flex",flexDirection:"column",gap:"4px",padding:"8px",backgroundColor:"interactive.background"}),children:[e.jsx("span",{className:i({textStyle:"Body.quaternary",color:"foreground"}),children:t}),e.jsx("span",{className:i({textStyle:"Body.secondary"}),children:l})]})});try{c.displayName="EntityStats",c.__docgenInfo={description:"",displayName:"EntityStats",props:{totalCount:{defaultValue:null,description:"",name:"totalCount",required:!0,type:{name:"number"}},weeklyCount:{defaultValue:null,description:"",name:"weeklyCount",required:!0,type:{name:"number"}},daysSinceCreation:{defaultValue:null,description:"",name:"daysSinceCreation",required:!0,type:{name:"number"}},lastExecutedAt:{defaultValue:null,description:"",name:"lastExecutedAt",required:!0,type:{name:"Date"}}}}}catch{}const g={component:c,args:{totalCount:42,weeklyCount:5,daysSinceCreation:30,lastExecutedAt:new Date("2025-01-10T15:30:00")},decorators:[t=>e.jsx("div",{style:{maxWidth:"400px",padding:"16px"},children:e.jsx(t,{})})]},r={},n={args:{totalCount:0,weeklyCount:0,daysSinceCreation:7,lastExecutedAt:null}},s={args:{totalCount:1,weeklyCount:1,daysSinceCreation:0,lastExecutedAt:new Date}},o={args:{totalCount:365,weeklyCount:14,daysSinceCreation:100,lastExecutedAt:new Date}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{} satisfies Story",...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    totalCount: 0,
    weeklyCount: 0,
    daysSinceCreation: 7,
    lastExecutedAt: null
  }
} satisfies Story`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    totalCount: 1,
    weeklyCount: 1,
    daysSinceCreation: 0,
    lastExecutedAt: new Date()
  }
} satisfies Story`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    totalCount: 365,
    weeklyCount: 14,
    daysSinceCreation: 100,
    lastExecutedAt: new Date()
  }
} satisfies Story`,...o.parameters?.docs?.source}}};const S=["Default","NeverExecuted","NewEntity","HighActivity"];export{r as Default,o as HighActivity,n as NeverExecuted,s as NewEntity,S as __namedExportsOrder,g as default};
