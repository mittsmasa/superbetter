import{j as e,c as s,r as o}from"./iframe-8PfW34ZG.js";import{E as t}from"./index-C95F90gk.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BbWNeX2n.js";import"./proxy-DLSblRkh.js";const x={component:t,args:{itemType:"powerup",completed:!1},argTypes:{itemType:{control:"select",options:["powerup","quest","villain","epicwin"]},completed:{control:"boolean"}}},a={},p={render:()=>e.jsxs("div",{className:s({display:"flex",gap:"4",flexDirection:"column"}),children:[e.jsxs("div",{className:s({display:"flex",gap:"4",alignItems:"center"}),children:[e.jsx("span",{className:s({minW:"[24px]"}),children:"Powerup:"}),e.jsx(t,{itemType:"powerup",completed:!1}),e.jsx(t,{itemType:"powerup",completed:!0})]}),e.jsxs("div",{className:s({display:"flex",gap:"4",alignItems:"center"}),children:[e.jsx("span",{className:s({minW:"[24px]"}),children:"Quest:"}),e.jsx(t,{itemType:"quest",completed:!1}),e.jsx(t,{itemType:"quest",completed:!0})]}),e.jsxs("div",{className:s({display:"flex",gap:"4",alignItems:"center"}),children:[e.jsx("span",{className:s({minW:"[24px]"}),children:"Villain:"}),e.jsx(t,{itemType:"villain",completed:!1}),e.jsx(t,{itemType:"villain",completed:!0})]}),e.jsxs("div",{className:s({display:"flex",gap:"4",alignItems:"center"}),children:[e.jsx("span",{className:s({minWidth:"[100px]"}),children:"Epic Win:"}),e.jsx(t,{itemType:"epicwin",completed:!1}),e.jsx(t,{itemType:"epicwin",completed:!0})]})]})},l={render:()=>{const[i,c]=o.useState(!1);return e.jsxs("div",{className:s({display:"flex",gap:"4",flexDirection:"column",alignItems:"flex-start"}),children:[e.jsx(t,{itemType:"powerup",completed:i}),e.jsxs("button",{type:"button",onClick:()=>c(!i),className:s({px:"4",py:"2",bg:"[#3b82f6]",color:"white",rounded:"md",cursor:"pointer",_hover:{bg:"[#2563eb]"}}),children:["Toggle Completed (Current: ",i?"Completed":"Not Completed",")"]})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{} satisfies Story",...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className={css({
    display: 'flex',
    gap: '4',
    flexDirection: 'column'
  })}>
      <div className={css({
      display: 'flex',
      gap: '4',
      alignItems: 'center'
    })}>
        <span className={css({
        minW: '[24px]'
      })}>Powerup:</span>
        <EntityIcon itemType="powerup" completed={false} />
        <EntityIcon itemType="powerup" completed={true} />
      </div>
      <div className={css({
      display: 'flex',
      gap: '4',
      alignItems: 'center'
    })}>
        <span className={css({
        minW: '[24px]'
      })}>Quest:</span>
        <EntityIcon itemType="quest" completed={false} />
        <EntityIcon itemType="quest" completed={true} />
      </div>
      <div className={css({
      display: 'flex',
      gap: '4',
      alignItems: 'center'
    })}>
        <span className={css({
        minW: '[24px]'
      })}>Villain:</span>
        <EntityIcon itemType="villain" completed={false} />
        <EntityIcon itemType="villain" completed={true} />
      </div>
      <div className={css({
      display: 'flex',
      gap: '4',
      alignItems: 'center'
    })}>
        <span className={css({
        minWidth: '[100px]'
      })}>Epic Win:</span>
        <EntityIcon itemType="epicwin" completed={false} />
        <EntityIcon itemType="epicwin" completed={true} />
      </div>
    </div>
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [completed, setCompleted] = useState(false);
    return <div className={css({
      display: 'flex',
      gap: '4',
      flexDirection: 'column',
      alignItems: 'flex-start'
    })}>
        <EntityIcon itemType="powerup" completed={completed} />
        <button type="button" onClick={() => setCompleted(!completed)} className={css({
        px: '4',
        py: '2',
        bg: '[#3b82f6]',
        color: 'white',
        rounded: 'md',
        cursor: 'pointer',
        _hover: {
          bg: '[#2563eb]'
        }
      })}>
          Toggle Completed (Current: {completed ? 'Completed' : 'Not Completed'}
          )
        </button>
      </div>;
  }
}`,...l.parameters?.docs?.source}}};const y=["Default","AllTypes","WithAnimation"];export{p as AllTypes,a as Default,l as WithAnimation,y as __namedExportsOrder,x as default};
