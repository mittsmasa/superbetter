import{j as e,c as r}from"./iframe-C-pds_YC.js";import{M as d}from"./index-BSKwXMzv.js";import{c as u,R as y}from"./index-1vGI8m45.js";import{E as f}from"./index-CLmsT6cp.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BeL9UywY.js";import"./proxy-CnRz_1AX.js";const m=["powerup","quest","villain","epicwin"],x=(t,i)=>{const s=m.indexOf(t.itemType),o=m.indexOf(i.itemType);return s-o},a=t=>e.jsx("div",{className:r({alignItems:"center",display:"flex",justifyContent:"center",gap:"12px"}),children:t.items.sort(x).map((i,s)=>e.jsx("div",{className:r({height:"[24px]",width:"[24px]",flexShrink:0}),children:e.jsx(f,{...i},s)},s))});try{a.displayName="MissionEntities",a.__docgenInfo={description:"",displayName:"MissionEntities",props:{items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"EntityIconProps[]"}}}}}catch{}const l=({id:t,title:i,items:s})=>{const o=s.every(c=>c.completed);return e.jsx(d,{href:`/missions/${t}`,children:e.jsxs("div",{className:r({textStyle:"Body.secondary",display:"flex",flexDirection:"column",gap:"16px",padding:"[8px]",width:"[100%]"}),children:[e.jsxs("div",{className:r({alignItems:"center",display:"flex",justifyContent:"space-between",gap:"8px"}),children:[e.jsx("p",{children:i}),o?e.jsx(u,{size:28}):e.jsx(y,{size:28,color:"colors.entity.disabled"})]}),e.jsx(a,{items:s})]})})};try{l.displayName="Mission",l.__docgenInfo={description:"",displayName:"Mission",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"EntityIconProps[]"}}}}}catch{}const v={component:l,args:{id:"1",title:"デイリーミッション",items:[]}},n={args:{items:[{itemType:"powerup",completed:!0},{itemType:"powerup",completed:!0},{itemType:"powerup",completed:!0},{itemType:"quest",completed:!0},{itemType:"villain",completed:!0}]}},p={args:{items:[{itemType:"powerup",completed:!1},{itemType:"powerup",completed:!1},{itemType:"powerup",completed:!1},{itemType:"quest",completed:!1},{itemType:"villain",completed:!1}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      itemType: 'powerup',
      completed: true
    }, {
      itemType: 'powerup',
      completed: true
    }, {
      itemType: 'powerup',
      completed: true
    }, {
      itemType: 'quest',
      completed: true
    }, {
      itemType: 'villain',
      completed: true
    }]
  }
} satisfies Story`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      itemType: 'powerup',
      completed: false
    }, {
      itemType: 'powerup',
      completed: false
    }, {
      itemType: 'powerup',
      completed: false
    }, {
      itemType: 'quest',
      completed: false
    }, {
      itemType: 'villain',
      completed: false
    }]
  }
} satisfies Story`,...p.parameters?.docs?.source}}};const I=["Default","Incomplete"];export{n as Default,p as Incomplete,I as __namedExportsOrder,v as default};
