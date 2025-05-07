import{r as u,i as y,j as t,a0 as d,H as m,a1 as g,K as x,a2 as h}from"./vendor.bb251fef.js";import{u as T}from"./index.b4ab2d2a.js";const k=e=>{const l=e*.14,s=e*.01,o=e*.00759,r=e-l-s;let i=0,n="";return r<=158e3?(i=r*.15,n=`%15 gelir vergisi diliminde (${r.toFixed(2)} TL \xFCzerinden)`):r<=33e4?(i=158e3*.15+(r-158e3)*.2,n=`\u0130lk 158.000 TL i\xE7in %15, kalan ${(r-158e3).toFixed(2)} TL i\xE7in %20 gelir vergisi`):(n="Kademeli vergi dilimleri uyguland\u0131.",i=158e3*.15+(33e4-158e3)*.2+(r-33e4)*.27),{net:e-l-s-o-i,explanation:`
  \u27A4 Br\xFCt Maa\u015F: ${e.toLocaleString("tr-TR",{style:"currency",currency:"TRY"})}
  \u27A4 SGK \u0130\u015F\xE7i Pay\u0131 (%14): ${l.toFixed(2)} TL
  \u27A4 \u0130\u015Fsizlik Sigortas\u0131 (%1): ${s.toFixed(2)} TL
  \u27A4 Damga Vergisi (%0.759): ${o.toFixed(2)} TL
  \u27A4 Gelir Vergisi: ${i.toFixed(2)} TL (${n})
  \u27A4 Vergiye Tabi Gelir: ${r.toFixed(2)} TL
  `.trim()}},S=e=>({gross:e/.7,explanation:`
  \u27A4 Net maa\u015F yakla\u015F\u0131k olarak %30 toplam kesinti varsay\u0131m\u0131 ile br\xFCt maa\u015Fa \xE7evrilmi\u015Ftir.
  \u27A4 Bu oran SGK, i\u015Fsizlik, damga vergisi ve gelir vergisi kesintilerini kapsar.
  \u27A4 Ger\xE7ek br\xFCt maa\u015F, ki\u015Fisel vergi dilimlerine ve y\u0131l i\xE7i gelir de\u011Fi\u015Fimine g\xF6re farkl\u0131l\u0131k g\xF6sterebilir.
  `.trim()}),f=()=>{const{formatMessage:e}=T(),[l,s]=u.exports.useState(void 0),[o,r]=u.exports.useState(void 0),[i,n]=u.exports.useState(null),p=()=>{if(!l)return;const{explanation:a,net:c}=k(l);n(`${a}

${e({id:"title.calculate.result",defaultMessage:"Net Salary:"})} ${c.toLocaleString("tr-TR",{style:"currency",currency:"TRY"})}`),r(void 0)},F=()=>{if(!o)return;const{explanation:a,gross:c}=S(o);n(`${a}

${e({id:"title.calculate.resultGross"})} ${c.toLocaleString("tr-TR",{style:"currency",currency:"TRY"})}`),s(void 0)};return y("div",{className:"salary-calculator-page",children:[t(d.Title,{level:3,children:e({id:"title.calculate.salary",defaultMessage:"Salary Calculator"})}),t(d.Paragraph,{children:e({id:"title.calculate.description",defaultMessage:"You can convert between gross and net salary. Enter your salary below to calculate."})}),t(h,{children:y(m,{layout:"vertical",children:[t(m.Item,{label:e({id:"title.calculate.grossSalary"}),children:t(g,{style:{width:"100%"},value:l,min:0,onChange:a=>s(a),formatter:a=>`${a}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:a=>Number(a==null?void 0:a.replace(/,/g,"")),placeholder:e({id:"title.calculate.grossSalaryPlaceholder"})})}),t(x,{type:"primary",block:!0,onClick:p,children:e({id:"title.calculate.convertToNet"})}),t(m.Item,{style:{marginTop:24},label:e({id:"title.calculate.netSalary"}),children:t(g,{style:{width:"100%"},value:l,min:0,onChange:a=>s(a),formatter:a=>`${a}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:a=>Number(a==null?void 0:a.replace(/,/g,"")),placeholder:e({id:"title.calculate.netSalaryPlaceholder"})})}),t(x,{type:"dashed",block:!0,onClick:F,children:e({id:"title.calculate.convertToGross"})})]})}),i&&t(h,{style:{marginTop:24},children:t(d.Paragraph,{children:t("pre",{style:{whiteSpace:"pre-wrap"},children:i})})})]})};export{f as default};
