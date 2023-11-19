import{O as S,_ as ee,v as ne,i as P,r as O,f as F,$ as Z,a0 as K,g as W,o as i,p as w,w as b,j as a,k as d,t as A,m as C,N as te,h as o,F as I,n as q,l as D,K as se,s as le,x as ie,b as oe,a as ue,D as ce,E as re,G as V}from"./index-6034c5b2.js";import{I as de}from"./ItemStatList-0545c6a0.js";const pe=()=>{const f=h=>{let y=N(h),v="https://www.wakfu.com/en/mmorpg/encyclopedia",c="";return h.type.validSlots.includes(S.FIRST_WEAPON.id)||h.type.validSlots.includes(S.SECOND_WEAPON.id)?c=`${v}/weapons/${y}`:h.type.validSlots.includes(S.PET.id)?c=`${v}/pets/${y}`:h.type.validSlots.includes(S.MOUNT.id)?c=`${v}/mounts/${y}`:h.type.validSlots.includes(S.ACCESSORY.id)?c=`${v}/accessories/${y}`:c=`${v}/armors/${y}`,c},N=h=>{let y=h.id,v=h.name.toLowerCase().replace(" ","-");return`${y}-${v}`};return{getItemEncyclopediaUrl:f}};const ae=f=>(le("data-v-cd9260d8"),f=f(),ie(),f),me=ae(()=>a("div",{class:"drag-bar"},null,-1)),ve={class:"edit-item-modal-content flex flex-column pb-2"},_e={class:"header-area flex px-3 pt-2 pb-1"},he={class:"flex flex-column ml-1"},ye={class:"item-name mr-2 truncate",style:{"max-width":"15ch"}},fe={class:"flex"},ge={key:0},ke={key:1},xe=ae(()=>a("div",{class:"flex-grow-1"},null,-1)),Se={key:0,class:"random-mastery-section flex flex-column px-3"},$e={class:"text-center w-full text-lg mb-2 pt-2"},be={class:"flex justify-content-center gap-2 px-3"},Ee={key:0,class:"flex align-items-center"},we={key:1},Ae={class:"flex align-items-center py-1 px-2"},Ce={class:"capitalize"},Ie={key:1,class:"random-resistance-section flex flex-column px-3"},We={class:"text-center w-full text-lg mb-2 pt-2"},Oe={class:"flex justify-content-center gap-2 px-3"},Ne={key:0,class:"flex align-items-center"},Re={key:1},Te={class:"flex align-items-center py-1 px-2"},qe={class:"capitalize"},De={class:"flex justify-content-center mt-2"},Le={__name:"EditEquipmentModal",setup(f,{expose:N}){let h=ne();const y=P("currentCharacter"),v=O(!1),c=O(null),n=O({}),g=[{value:"empty",label:"None",icon:"empty_coin"},{value:"water",label:"Water",icon:"water_coin"},{value:"earth",label:"Earth",icon:"earth_coin"},{value:"air",label:"Air",icon:"air_coin"},{value:"fire",label:"Fire",icon:"fire_coin"}],$=F(()=>{var s,e;return(e=(s=c.value)==null?void 0:s.equipEffects)==null?void 0:e.find(t=>t.id===1068)}),_=F(()=>{var s,e;return(e=(s=c.value)==null?void 0:s.equipEffects)==null?void 0:e.find(t=>t.id===1069)});Z.on(K.UPDATE_RAND_ELEM_SELECTORS,()=>{u(),M()});const u=()=>{v.value&&$.value!==void 0&&(n.value.masterySlot1=g.find(s=>{var e;return s.value===((e=$.value.masterySlot1)==null?void 0:e.type)}),n.value.masterySlot2=g.find(s=>{var e;return s.value===((e=$.value.masterySlot2)==null?void 0:e.type)}),n.value.masterySlot3=g.find(s=>{var e;return s.value===((e=$.value.masterySlot3)==null?void 0:e.type)}))},M=()=>{v.value&&_.value!==void 0&&(n.value.resistanceSlot1=g.find(s=>{var e,t;return s.value===((t=(e=_.value)==null?void 0:e.resistanceSlot1)==null?void 0:t.type)}),n.value.resistanceSlot2=g.find(s=>{var e,t;return s.value===((t=(e=_.value)==null?void 0:e.resistanceSlot2)==null?void 0:t.type)}),n.value.resistanceSlot3=g.find(s=>{var e,t;return s.value===((t=(e=_.value)==null?void 0:e.resistanceSlot3)==null?void 0:t.type)}))},j=(s,e)=>{var p,k;let t=(k=(p=c.value)==null?void 0:p.equipEffects)==null?void 0:k.find(l=>l.id===1068);t[e]={type:n.value[e].value,value:$.value.values[0]},Object.keys(t).forEach(l=>{var m;l!==e&&((m=t[l])==null?void 0:m.type)===n.value[e].value&&(t[l]={type:g[0].value,value:[]},n.value[l]=g[0])})},B=()=>{Object.keys(n.value).forEach(s=>{var e,t;if(n.value[s]){let p=(t=(e=c.value)==null?void 0:e.equipEffects)==null?void 0:t.find(k=>k.id===1069);p[s]={type:n.value[s].value,value:_.value.values[0]}}})},R=()=>{Object.keys(y.value.equipment).forEach(s=>{y.value.equipment[s]!==null&&y.value.equipment[s].equipEffects.forEach(e=>{var t,p,k,l,m,r;e.id===1068&&$.value&&(e.values[2]>=1&&(e.masterySlot1={type:((t=n.value.masterySlot1)==null?void 0:t.value)||"empty",value:e.values[0]}),e.values[2]>=2&&(e.masterySlot2={type:((p=n.value.masterySlot2)==null?void 0:p.value)||"empty",value:e.values[0]}),e.values[2]>=3&&(e.masterySlot3={type:((k=n.value.masterySlot3)==null?void 0:k.value)||"empty",value:e.values[0]})),e.id===1069&&_.value&&(e.values[2]>=1&&(e.resistanceSlot1={type:((l=n.value.resistanceSlot1)==null?void 0:l.value)||"empty",value:e.values[0]}),e.values[2]>=2&&(e.resistanceSlot2={type:((m=n.value.resistanceSlot2)==null?void 0:m.value)||"empty",value:e.values[0]}),e.values[2]>=3&&(e.resistanceSlot3={type:((r=n.value.resistanceSlot3)==null?void 0:r.value)||"empty",value:e.values[0]}))})}),Z.emit(K.UPDATE_RAND_ELEM_SELECTORS)},T=(s,e,t)=>{c.value=y.value.equipment[s],v.value=!0,se(()=>{let p=document.getElementById(h);p.style.position="fixed",p.style.left=`${e}px`,p.style.top=`${t}px`,u(),M()})},U=()=>{v.value=!1};return N({open:T}),(s,e)=>{const t=W("p-image"),p=W("p-button"),k=W("p-dropdown"),l=W("p-dialog");return i(),w(l,{id:C(h),visible:v.value,"onUpdate:visible":e[0]||(e[0]=m=>v.value=m)},{header:b(()=>[me]),default:b(()=>[a("div",ve,[a("div",_e,[d(t,{src:`https://tmktahu.github.io/WakfuAssets/items/${c.value.imageId}.png`,"image-style":"width: 40px"},null,8,["src"]),a("div",he,[a("div",ye,A(c.value.name),1),a("div",fe,[d(t,{class:"mr-1",src:`https://tmktahu.github.io/WakfuAssets/rarities/${c.value.rarity}.png`,"image-style":"width: 12px;"},null,8,["src"]),d(t,{class:"mr-1",src:`https://tmktahu.github.io/WakfuAssets/itemTypes/${c.value.type.id}.png`,"image-style":"width: 18px;"},null,8,["src"]),C(te).includes(c.value.type.id)?(i(),o("div",ge,"Item Level: 50")):(i(),o("div",ke,"Level: "+A(c.value.level),1))])]),xe,d(p,{class:"close-button px-1 py-1",icon:"mdi mdi-close-thick",onClick:U})]),$.value?(i(),o("div",Se,[a("div",$e,"+"+A($.value.values[0])+" Mastery Assignment",1),a("div",be,[(i(!0),o(I,null,q($.value.values[2],m=>(i(),w(k,{key:m,modelValue:n.value["masterySlot"+m],"onUpdate:modelValue":r=>n.value["masterySlot"+m]=r,class:"mastery-dropdown",options:g,onChange:r=>j(r,"masterySlot"+m)},{value:b(r=>[r.value?(i(),o("div",Ee,[d(t,{src:`https://tmktahu.github.io/WakfuAssets/statistics/${r.value.icon}.png`,style:{height:"40px"},"image-style":"height: 40px; margin-top: -1px"},null,8,["src"])])):(i(),o("span",we,[d(t,{src:"https://tmktahu.github.io/WakfuAssets/statistics/empty_coin.png",style:{height:"36px"},"image-style":"height: 36px; margin-top: 1px; margin-left: 2px"},null,8,["src"])]))]),option:b(r=>[a("div",Ae,[a("div",Ce,A(r.option.label),1)])]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"]))),128))])])):D("",!0),_.value?(i(),o("div",Ie,[a("div",We,"+"+A(_.value.values[0])+" Resistance Assignment",1),a("div",Oe,[(i(!0),o(I,null,q(_.value.values[2],m=>(i(),w(k,{key:m,modelValue:n.value["resistanceSlot"+m],"onUpdate:modelValue":r=>n.value["resistanceSlot"+m]=r,class:"mastery-dropdown",options:g,onChange:B},{value:b(r=>[r.value?(i(),o("div",Ne,[d(t,{src:`https://tmktahu.github.io/WakfuAssets/statistics/${r.value.icon}.png`,style:{height:"40px"},"image-style":"height: 40px; margin-top: -1px"},null,8,["src"])])):(i(),o("span",Re,[d(t,{src:"https://tmktahu.github.io/WakfuAssets/statistics/empty_coin.png",style:{height:"36px"},"image-style":"height: 36px; margin-top: 1px; margin-left: 2px"},null,8,["src"])]))]),option:b(r=>[a("div",Te,[a("div",qe,A(r.option.label),1)])]),_:2},1032,["modelValue","onUpdate:modelValue"]))),128))])])):D("",!0),a("div",De,[d(p,{class:"py-2",label:"Apply to all Items",onClick:R})])])]),_:1},8,["id","visible"])}}},Me=ee(Le,[["__scopeId","data-v-cd9260d8"]]);const L=f=>(le("data-v-ef1442d1"),f=f(),ie(),f),je={class:"flex equipment-slots-wrapper"},Be={key:0,class:"flex align-items-center justify-content-center"},Ue={key:1,class:"flex align-items-center justify-content-center"},Ve={class:"flex align-items-center justify-content-center"},Pe=L(()=>a("div",{class:"hover-icon search"},[a("i",{class:"pi pi-search"})],-1)),Fe={class:"flex align-items-center justify-content-center w-full",style:{position:"relative"}},ze=["onClick"],Ge=L(()=>a("i",{class:"pi pi-pencil"},null,-1)),Ye=[Ge],He=["onClick"],Je=L(()=>a("i",{class:"pi pi-trash"},null,-1)),Qe=[Je],Xe={key:0,class:"random-stat-icons-wrapper"},Ze={key:1,class:"random-stat-icons-wrapper"},Ke={key:0,class:"item-card-tooltip"},et={class:"effect-header flex pt-2 px-1"},tt={class:"flex flex-column"},st={class:"item-name mr-2"},lt={class:"flex"},it={key:0},at={key:1},nt=L(()=>a("div",{class:"flex-grow-1"},null,-1)),ot={class:"flex"},ut=L(()=>a("div",{class:"simple-tooltip"},"Open Encyclopedia Page",-1)),ct={__name:"EquipmentButtons",props:{character:{type:Object,default:()=>{}},readOnly:{type:Boolean,default:!1}},setup(f){const{t:N}=oe();let h=f;const y=ue(),{getItemEncyclopediaUrl:v}=pe(),c=P("itemFilters"),n=O(null),g=F(()=>{let s=_.value.equipment[S.FIRST_WEAPON.id];return s?!!s.type.disabledSlots.includes(S.SECOND_WEAPON.id):!1}),$=P("masterData"),_=O(h.character),u=O({});ce($,re.debounce(()=>{se(()=>{var s;_.value=h.character,u.value=(s=_.value)==null?void 0:s.equipment})},100),{immediate:!0});const M=s=>{c.itemTypeFilters.forEach(e=>{e.validSlots.includes(S[s])?e.checked=!0:e.checked=!1})},j=(s,e,t)=>{n.value[s].open(e,t.target.getBoundingClientRect().left-200,t.target.getBoundingClientRect().bottom+10)},B=(s,e)=>{y.require({group:"popup",target:e.currentTarget,message:N("confirms.areYouSure"),accept:()=>{_.value.equipment[s]=null}})},R=s=>{var e;return((e=_.value.equipment[s])==null?void 0:e.equipEffects.find(t=>t.id===1068))||null},T=s=>{var e;return((e=_.value.equipment[s])==null?void 0:e.equipEffects.find(t=>t.id===1069))||null},U=s=>{let e=v(s);window.open(e,"_blank")};return(s,e)=>{const t=W("p-image"),p=W("p-button"),k=W("tippy");return i(),o("div",je,[(i(!0),o(I,null,q(C(S),(l,m,r)=>{var z,G;return i(),o(I,{key:l.id},[f.readOnly?(i(),o("div",{key:0,class:V(["equipment-display",{"has-item":u.value[l.id]!==null}])},[(z=u.value[l.id])!=null&&z.imageId?(i(),o("div",Be,[d(t,{src:`https://tmktahu.github.io/WakfuAssets/items/${(G=u.value[l.id])==null?void 0:G.imageId}.png`,"image-style":"width: 40px"},null,8,["src"])])):(i(),o("div",Ue,[d(t,{src:`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${l.id}.png`,"image-style":"width: 60px"},null,8,["src"])]))],2)):(i(),o(I,{key:1},[u.value[l.id]===null?(i(),w(p,{key:0,class:V(["equipment-button",{"has-item":u.value[l.id]!==null,disabled:l.id===C(S).SECOND_WEAPON.id&&g.value}]),onClick:E=>M(l.id)},{default:b(()=>{var E;return[a("div",Ve,[Pe,l.id===C(S).SECOND_WEAPON.id&&g.value?(i(),w(t,{key:0,class:"equipment-image",src:`https://tmktahu.github.io/WakfuAssets/items/${(E=u.value[C(S).FIRST_WEAPON.id])==null?void 0:E.imageId}.png`,"image-style":"width: 40px"},null,8,["src"])):(i(),w(t,{key:1,class:"equipment-image",src:`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${l.id}.png`,"image-style":"width: 60px"},null,8,["src"]))])]}),_:2},1032,["class","onClick"])):(i(),w(k,{key:1,placement:"bottom",interactive:"",duration:"0"},{content:b(()=>{var E,x,Y,H,J,Q,X;return[u.value[l.id]?(i(),o("div",Ke,[a("div",et,[d(t,{src:`https://tmktahu.github.io/WakfuAssets/items/${(E=u.value[l.id])==null?void 0:E.imageId}.png`,"image-style":"width: 40px"},null,8,["src"]),a("div",tt,[a("div",st,A(s.$t(`items.${u.value[l.id].id}`)),1),a("div",lt,[d(t,{class:"mr-1",src:`https://tmktahu.github.io/WakfuAssets/rarities/${(x=u.value[l.id])==null?void 0:x.rarity}.png`,"image-style":"width: 12px;"},null,8,["src"]),d(t,{class:"mr-1",src:`https://tmktahu.github.io/WakfuAssets/itemTypes/${(H=(Y=u.value[l.id])==null?void 0:Y.type)==null?void 0:H.id}.png`,"image-style":"width: 18px;"},null,8,["src"]),C(te).includes((Q=(J=u.value[l.id])==null?void 0:J.type)==null?void 0:Q.id)?(i(),o("div",it,"Item Level: 50")):(i(),o("div",at,"Level: "+A((X=u.value[l.id])==null?void 0:X.level),1))])]),nt,a("div",ot,[d(k,{placement:"left"},{content:b(()=>[ut]),default:b(()=>[d(p,{icon:"pi pi-question-circle",class:"equip-button",onClick:rt=>U(u.value[l.id])},null,8,["onClick"])]),_:2},1024)])]),d(de,{item:u.value[l.id]},null,8,["item"])])):D("",!0)]}),default:b(()=>{var E;return[a("div",{class:V(["equipment-button",{"has-item":u.value[l.id]!==null}])},[a("div",Fe,[a("div",{class:"hover-icon edit",onClick:x=>j(r,l.id,x)},Ye,8,ze),a("div",{class:"hover-icon remove",onClick:x=>B(l.id,x)},Qe,8,He),d(t,{class:"equipment-image",src:`https://tmktahu.github.io/WakfuAssets/items/${(E=u.value[l.id])==null?void 0:E.imageId}.png`,"image-style":"width: 40px"},null,8,["src"]),R(l.id)!==null?(i(),o("div",Xe,[(i(!0),o(I,null,q(R(l.id).values[2],x=>(i(),w(t,{key:x,src:`https://tmktahu.github.io/WakfuAssets/statistics/${R(l.id)[`masterySlot${x}`].type}_coin.png`,"image-style":"width: 16px"},null,8,["src"]))),128))])):D("",!0),T(l.id)!==null?(i(),o("div",Ze,[(i(!0),o(I,null,q(T(l.id).values[2],x=>(i(),w(t,{key:x,src:`https://tmktahu.github.io/WakfuAssets/statistics/${T(l.id)[`resistanceSlot${x}`].type}_coin.png`,"image-style":"width: 16px"},null,8,["src"]))),128))])):D("",!0)])],2)]}),_:2},1024)),d(Me,{ref_for:!0,ref_key:"editEquipmentModal",ref:n},null,512)],64))],64)}),128))])}}},mt=ee(ct,[["__scopeId","data-v-ef1442d1"]]);export{mt as E,pe as u};