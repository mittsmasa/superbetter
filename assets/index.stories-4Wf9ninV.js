import{j as e,c as r,r as c}from"./iframe-DDnZtspN.js";import{D as d,B as l,u as m}from"./index-CzomHYWP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BtApOZTY.js";const n=({dialog:s,itemName:a,onDelete:o})=>e.jsx(d,{ref:s.ref,children:e.jsxs("div",{className:r({display:"flex",flexDirection:"column",gap:"24px"}),children:[e.jsxs("div",{children:[e.jsx("p",{className:r({textAlign:"center",lineClamp:3}),children:a}),e.jsx("p",{className:r({textAlign:"center",textStyle:"Body.secondary"}),children:"をアーカイブしますか"})]}),e.jsxs("div",{className:r({display:"flex",gap:"8px",justifyContent:"center"}),children:[e.jsx(l,{onClick:()=>o(),children:e.jsx("div",{className:r({width:"[100px]"}),children:"アーカイブ"})}),e.jsx(l,{onClick:s.close,variant:"secondary",children:e.jsx("div",{className:r({width:"[100px]"}),children:"キャンセル"})})]})]})});try{n.displayName="DeleteConfirmDialog",n.__docgenInfo={description:"",displayName:"DeleteConfirmDialog",props:{dialog:{defaultValue:null,description:"",name:"dialog",required:!0,type:{name:"any"}},itemName:{defaultValue:null,description:"",name:"itemName",required:!0,type:{name:"string"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"() => void"}}}}}catch{}const{fn:i}=__STORYBOOK_MODULE_TEST__,x={component:n,args:{dialog:{ref:{current:null},show:i(()=>{}),close:i(()=>{})},itemName:"アイテムめい",onDelete:i()}},t={render:s=>{const a=m();return c.useEffect(()=>{a.show()},[a]),e.jsx(n,{...s,dialog:a})},tags:["skip-vrt"]};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    const dialog = useDialog();
    useEffect(() => {
      dialog.show();
    }, [dialog]);
    return <DeleteConfirmDialog {...args} dialog={dialog} />;
  },
  tags: ['skip-vrt']
} satisfies Story`,...t.parameters?.docs?.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,x as default};
