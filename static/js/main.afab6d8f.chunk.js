(this["webpackJsonptri-tap"]=this["webpackJsonptri-tap"]||[]).push([[0],{144:function(e,t,a){e.exports=a(624)},149:function(e,t,a){},54:function(e,t){},545:function(e,t){},547:function(e,t){},577:function(e,t){},578:function(e,t){},624:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(139),i=a.n(r),s=(a(149),a(6)),l=a(18),o=a(9),m="local",u="session",d=[{label:"Date",field:"date",type:"hidden",db:u},{label:"Email",field:"email",type:"hidden",db:m},{label:"Name",field:"name",db:m},{label:"Age",field:"age",type:"number",db:m},{label:"How motivated are you to train?",field:"motivated",type:"slider",db:u},{label:"How fresh do your legs feel?",field:"fast",type:"slider",scale:["Slow","Normal","Fast"],db:u},{label:"How well did you sleep last night?",field:"sleep",type:"slider",scale:["Worse","Normal","Better"],db:u},{label:"How long did you sleep?",field:"sleepHours",type:"time",db:u}],f=function(e){var t=d.find((function(t){return t.field===e}));return t&&t.db};function b(e){return f(e)===m?window.localStorage.getItem(e):window.sessionStorage.getItem(e)}var v={items:d,getItem:b,setItem:function(e,t){f(e)===m?window.localStorage.setItem(e,t):window.sessionStorage.setItem(e,t)},isValid:function(){return!d.map((function(e){return!!b(e.field)})).includes(!1)&&b("date")===(new Date).toLocaleDateString()},isValidUser:function(){return!d.filter((function(e){var t=e.field;return["email","name","age"].includes(t)})).map((function(e){return!!b(e.field)})).includes(!1)}},p=a(36),E=a.n(p);E.a.config.region="us-east-2",E.a.config.credentials=new E.a.CognitoIdentityCredentials({IdentityPoolId:"us-east-2:1056edee-e9e2-4c61-8f7e-45d31a5ab8a4"});var h=new E.a.DynamoDB.DocumentClient;var g=a(140),N=a.n(g),j=a(141),w=a.n(j),y=function(e,t){return function(e,t,a){var n={TableName:e,Key:t};return a&&(n.AttributesToGet=a),new Promise((function(e,t){h.get(n,(function(a,n){a?t("item cannot be retrieved"):e(n.Item)}))}))}("users",{hash:w.a.stringify(N()("".concat(e).concat(t)))},["email","name","age"])};var O=Object(o.g)((function(e){var t=e.setUser,a=e.history,r=Object(n.useState)(""),i=Object(s.a)(r,2),l=i[0],o=i[1],m=Object(n.useState)(""),u=Object(s.a)(m,2),d=u[0],f=u[1],b=Object(n.useState)(!1),p=Object(s.a)(b,2),E=p[0],h=p[1],g=Object(n.useState)(!1),N=Object(s.a)(g,2),j=N[0],w=N[1],O=function(){h(!1),w(!0)};return c.a.createElement("div",{className:"hero"},c.a.createElement("div",{className:"hero-body has-text-centered"},c.a.createElement("section",{className:"section is-flex-grow-1"},c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),l&&d?(h(!0),w(!1),y(l,d).then((function(e){e.email?(["email","name","age"].forEach((function(t){return v.setItem(t,e[t])})),t(e),a.push("/home")):O()})).catch(O)):w(!0)}},c.a.createElement("input",{className:"input mb-4",id:"email",name:"email",defaultValue:"",type:"text",placeholder:"email",autoComplete:"email",onChange:function(e){return o(e.target.value)}}),c.a.createElement("input",{className:"input mb-4",id:"password",name:"password",defaultValue:"",type:"password",placeholder:"password",autoComplete:"current-password",onChange:function(e){return f(e.target.value)}}),c.a.createElement("button",{className:"button is-black ".concat(E?"is-loading":""),type:"submit"},"Go")),j&&c.a.createElement("div",{className:"mt-4 has-text-danger"},"invalid"))))}));function x(e){e.x;var t=Object(n.useState)([]),a=Object(s.a)(t,2),r=a[0],i=a[1],l=Object(n.useState)({}),o=Object(s.a)(l,2),m=o[0],u=o[1];Object(n.useEffect)((function(){var e;(e="lift",new Promise((function(t,a){h.scan({TableName:e},(function(e,n){e?a("data cannot be retrieved"):t(n.Items)}))}))).then(i)}),[]),Object(n.useEffect)((function(){var e={};r.map((function(t){return Object.keys(t).map((function(t){return e[t]=!0}))})),u(e)}),[r]);var d='"'.concat(Object.keys(m).join('","'),'"\n');return r.map((function(e){var t=[];return Object.keys(m).map((function(a){return t.push(e[a])})),d+='"'.concat(t.join('","'),'"\n'),!0})),c.a.createElement("textarea",{style:{fontSize:"6px",height:"99vh",width:"99vw"},value:d})}var S=a(19),k=a(13),I=a(14),D=["Less","Normal","More"];function T(e){var t=e.scale,a=void 0===t?D:t;return c.a.createElement("div",{className:"slider-scale mb-4"},a.map((function(e){return c.a.createElement("div",{key:e},e)})))}var C=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],H=function(e,t){return t?1===t?"Tomorrow":(a=e+t)<7?C[a]:C[a-7]:"Today";var a};function P(){var e=Object(n.useState)({}),t=Object(s.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)([]),o=Object(s.a)(i,2),m=o[0],u=o[1];Object(n.useEffect)((function(){var e;try{e=JSON.parse(v.getItem("forecast"))||{}}catch(n){e={}}var t=[],a=(new Date).getDay();[0,1,2,3,4,5,6].forEach((function(n){var c=new Date(Date.now()+864e5*n),r="".concat(c.getFullYear(),"-").concat(c.getMonth(),"-").concat(c.getDate());e[r]=e[r]||{date:r,day:H(a,n),activity:[0,0,0],effort:5},t.push(r)})),r(e),u(t)}),[]);var d=function(e){r(e),v.setItem("forecast",JSON.stringify(e))},f=function(e,t){var n=Object(S.a)({},a);n[e]=Object(S.a)({},a[e],{activity:t}),d(n)},b=!m.map((function(e){var t;return null===(t=a[e])||void 0===t?void 0:t.activity.includes(1)})).includes(!1),p=v.getItem("speed"),E=v.isValid()&&p?"/results?speed=".concat(p):"/today",h=function(e){return e?"has-text-success":"has-text-grey-light"};return c.a.createElement("div",{className:"forecast m-4 x"},c.a.createElement("div",{className:"headings columns is-mobile"},c.a.createElement("div",{className:"column has-text-weight-bold is-3 forecast-day"},"Day"),c.a.createElement("div",{className:"column has-text-weight-bold is-3 has-text-centered"},"Off"),c.a.createElement("div",{className:"column has-text-weight-bold is-3 has-text-centered"},"HIIT"),c.a.createElement("div",{className:"column has-text-weight-bold is-3 has-text-centered"},"Other")),m.map((function(e,t){return c.a.createElement(n.Fragment,{key:e},c.a.createElement("div",{className:"columns is-mobile ".concat(t%2?"has-background-white-ter":"")},c.a.createElement("div",{className:"column has-text-weight-bold is-3 forecast-day"},a[e].day),c.a.createElement("div",{className:"clickable column is-3 has-text-centered",onClick:function(){return f(e,[1,0,0])}},c.a.createElement(k.a,{className:h(a[e].activity[0]),icon:I.a,size:"lg"})),c.a.createElement("div",{className:"clickable column is-3 has-text-centered",onClick:function(){return f(e,[0,1,0])}},c.a.createElement(k.a,{className:h(a[e].activity[1]),icon:I.i,size:"lg"})),c.a.createElement("div",{className:"clickable column is-3 has-text-centered is-relative",onClick:function(){return f(e,[0,0,1])}},c.a.createElement(k.a,{className:"mx-1 ".concat(h(a[e].activity[2])),icon:I.j,size:"sm"}),c.a.createElement(k.a,{className:"mx-1 ".concat(h(a[e].activity[2])),icon:I.b,size:"sm"}),c.a.createElement(k.a,{className:"mx-1 ".concat(h(a[e].activity[2])),icon:I.f,size:"sm"}))),b&&0===t&&!!a[e].activity[1]&&c.a.createElement("div",{className:"columns is-mobile ".concat(t%2?"has-background-white-ter":"")},c.a.createElement("div",{className:"column is-12 has-text-centered"},c.a.createElement(l.b,{to:E},c.a.createElement("button",{className:"button is-large"},"Today's Workout")))),!!a[e].activity[2]&&c.a.createElement("div",{className:"columns is-mobile ".concat(t%2?"has-background-white-ter":"")},c.a.createElement("div",{className:"column is-12 is-flex is-align-items-center"},c.a.createElement("div",{className:"mb-5 mx-4"},"Anticipated Effort"),c.a.createElement("div",{className:"is-flex-grow-1 mx-4"},c.a.createElement("input",{defaultValue:a[e].effort,className:"slider is-warning is-fullwidth is-large mt-2",step:".25",min:"0",max:"10",type:"range",onChange:function(t){return function(e,t){var n=Object(S.a)({},a);n[e]=Object(S.a)({},a[e],{effort:t}),d(n)}(e,t.target.value)}}),c.a.createElement(T,{scale:["light","moderate","hard"]})))))})))}var V=Object(o.g)((function(e){var t,a=e.location.pathname,n=(t=a,function(e){var a="step-item is-success";return"/today"===t&&0===e&&(a+=" is-active"),"/lift"===t&&(0===e&&(a+=" is-completed"),1===e&&(a+=" is-active")),"/results"===t&&(a+=e<2?" is-completed":" is-active"),a}),r="/login"!==a;return c.a.createElement("div",{className:"px-4 is-flex has-background-link-light is-justify-content-space-between is-align-items-center"},c.a.createElement("div",{className:"head-space has-text-info"},c.a.createElement("b",null,"HIITRx")),function(e){return["/today","/lift","/results"].includes(e)}(a)&&c.a.createElement("div",{className:"is-flex-grow-1 my-1 px-6"},c.a.createElement("div",{className:"steps is-small"},c.a.createElement("div",{className:n(0)},c.a.createElement("div",{className:"step-marker"},c.a.createElement(k.a,{icon:I.g}))),c.a.createElement("div",{className:n(1)},c.a.createElement("div",{className:"step-marker"},c.a.createElement(k.a,{icon:I.d}))),c.a.createElement("div",{className:n(2)},c.a.createElement("div",{className:"step-marker"},c.a.createElement(k.a,{icon:I.c}))))),c.a.createElement("div",{className:"head-space"},r&&c.a.createElement(l.b,{to:"/home"},c.a.createElement(k.a,{className:"has-text-info",icon:I.e,size:"lg"}))))}));function z(e){var t=e.h,a=e.m,r=Object(n.useState)(t),i=Object(s.a)(r,2),l=i[0],o=i[1],m=Object(n.useState)(a),u=Object(s.a)(m,2),d=u[0],f=u[1],b=function(e){return function(t){return function(a){if(a.preventDefault(),"h"===e){var n=l+t;n>=0&&n<25&&o(l+t)}else{var c=d+t;c>=0&&c<60&&f(d+t)}}}};return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"time-picker mt-4 mb-4"},c.a.createElement("div",null,c.a.createElement("button",{onClick:b("h")(-1),className:"button mr-4"},"-"),c.a.createElement("button",{onClick:b("h")(1),className:"button"},"+")),c.a.createElement("div",null,l," hrs ",d," min"),c.a.createElement("div",null,c.a.createElement("button",{onClick:b("m")(-15),className:"button mr-4"},"-"),c.a.createElement("button",{onClick:b("m")(15),className:"button"},"+"))),c.a.createElement(T,{scale:["subtract/add hours","subtract/add minutes"]}),c.a.createElement("input",{type:"hidden",name:"sleepHours",defaultValue:"".concat(l+d/60)}))}var F=function(e){return"date"===e?(new Date).toLocaleDateString():v.getItem(e)||""};function M(e){var t=e.onSubmit,a=Object(n.useState)(!1),r=Object(s.a)(a,2),i=r[0],m=r[1];if(i)return c.a.createElement(o.a,{push:!0,to:"/lift"});var u=v.isValidUser(),d=u?v.items.map((function(e){return"name"===e.field||"age"===e.field?Object(S.a)({},e,{type:"hidden"}):e})):v.items;return c.a.createElement("div",{className:"px-4 py-4"},c.a.createElement("div",null,u?c.a.createElement("div",{className:"mb-2 pb-2 is-flex is-justify-content-space-between is-align-items-center"},c.a.createElement("strong",null,"Hello, ",v.getItem("name")),c.a.createElement(l.b,{to:"/login"},c.a.createElement("button",{className:"button is-small"},"not ",v.getItem("name"),"?"))):null,c.a.createElement("form",{onSubmit:function(e){t(e).then(m)}},d.map((function(e){var t=e.label,a=e.field,n=e.type,r=e.scale;return c.a.createElement("div",{key:a,id:"".concat(a,"-wrapper")},"hidden"!==n&&c.a.createElement("label",{htmlFor:a},t),function(e,t){var a=t.field,n=t.scale;switch(e){case"slider":return c.a.createElement(c.a.Fragment,null,c.a.createElement("input",{id:a,name:a,defaultValue:F(a),className:"slider is-warning is-fullwidth is-large mt-2",step:".25",min:"0",max:"10",type:"range"}),c.a.createElement(T,{scale:n}));case"time":var r=F(a).split("."),i=Object(s.a)(r,2),l=i[0],o=i[1];return l=l||8,o=o||0,c.a.createElement(z,{h:Number(l),m:60*Number(".".concat(o))});case"text":default:return c.a.createElement("input",{className:"input mb-4",id:a,name:a,defaultValue:F(a),type:e||"text"})}}(n,{field:a,scale:r}))})),c.a.createElement("div",{className:"has-text-centered"},c.a.createElement("input",{className:"button is-black",type:"submit",value:"Next"})))))}var R=a(46),U=a(143),W=a.n(U),A=a(27),B=a(626),J={name:"unspecified",age:"unspecified"};function L(e){var t=e.id,a=void 0===t?Object(B.a)():t,n=e.timestamp,c=void 0===n?Date.now():n,r=e.winNavUa,i=void 0===r?window.navigator.userAgent:r;return Object(S.a)({id:a,timestamp:c,winNavUa:i},v.items.reduce((function(e,t){var a=t.field;return Object(S.a)(Object(A.a)({},a,v.getItem(a)||J[a]),e)}),{}),{},e)}var G="Press",K=function(e){for(var t=[],a=Date.now(),n=function(n){t.push(new Promise((function(t,c){var r,i,s=L({timeStamp:a,trigger:e[n].timeStamp,lift:e[n+1].timeStamp,pressure:e[n+1].pressure});(r=s,i="lift",new Promise((function(e,t){h.put({Item:r,TableName:i},(function(a,n){a?t("Error: data was not saved to ".concat(i)):e()}))}))).then(t).catch(c)})))},c=0;c<e.length;c+=2)n(c);return Promise.all(t)};var Y=Object(o.g)((function(e){var t=e.history,a=Object(n.useState)(G),r=Object(s.a)(a,2),i=r[0],l=r[1],o=Object(n.useState)([]),m=Object(s.a)(o,2),u=m[0],d=m[1],f=Object(n.useState)(!1),b=Object(s.a)(f,2),p=b[0],E=b[1],h=Object(n.useState)(!1),g=Object(s.a)(h,2),N=g[0],j=g[1],w=Object(n.useState)(!1),y=Object(s.a)(w,2),O=y[0],x=y[1],S=Object(n.useState)(!1),D=Object(s.a)(S,2),T=D[0],C=D[1],H=Object(n.useRef)(null),P=Object(n.useRef)(0),V=Object(n.useRef)();return Object(n.useEffect)((function(){W.a.set("#circle",{start:function(){P.current=0},change:function(e){P.current=e>P.current?e:P.current},unsupported:function(){P.current=-1}},{only:"touch",polyfill:!1})}),[]),Object(n.useEffect)((function(){if(O){var e=1500+Math.round(250*Math.random());H.current=setTimeout((function(){C(!0),d((function(e){return[].concat(Object(R.a)(e),[{timeStamp:Date.now()}])}))}),e)}}),[O]),Object(n.useEffect)((function(){10===u.length&&(j(!0),clearTimeout(V.current),function(e){return K(e).then((function(){return e.reduce((function(e,t,a,n){return a%2?e:[].concat(Object(R.a)(e),[n[a+1].timeStamp-t.timeStamp])}),[])}))}(u).then((function(e){v.setItem("speed",e),t.push("/results?speed=".concat(e))})))}),[u,t]),c.a.createElement("div",{className:"px-4 py-4"},c.a.createElement("div",{className:"mb-4"},"Press with your thumb. When the border turns red, lift your thumb. Repeat five times."),c.a.createElement("section",{className:"section py-0 lift",style:{position:"absolute",bottom:30,left:"50%",transform:"translate(-50%)"}},N?c.a.createElement("div",{className:"circle"},c.a.createElement(k.a,{spin:!0,size:"1x",icon:I.h})):c.a.createElement("div",{id:"circle",className:"circle ".concat(O&&"pressed"," ").concat(T&&"triggered"),onPointerDown:function(e){i===G&&(E(!0),x(!0))},onPointerUp:function(e){x(!1),p&&i===G&&(T?(l("Good"),d([].concat(Object(R.a)(u),[{timeStamp:Date.now(),pressure:P.current}]))):(l("!"),clearTimeout(H.current)),E(!1),C(!1),V.current=setTimeout((function(){return l(G)}),1500))}},i)))})),$=[0,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75,7,7.25,7.5,7.75,8,8.25,8.5,8.75,9,9.25,9.5,9.75,10],q=function(e){return e.reduce((function(e,t,a){return Object(S.a)({},e,Object(A.a)({},$[a],t))}),{})},Q={motivated:q([0,2.5,3.125,3.75,4.375,5,5.625,6.25,6.875,7.5,8.125,8.75,9.375,10,10.625,11.25,11.875,12.5,13.125,13.75,14.375,15,15.625,16.25,16.875,17.5,18.125,18.75,19.375,20,20.625,21.25,21.875,22.5,23.125,23.75,24.375,25]),fast:q([0,2.5,3.125,3.75,4.375,5,5.625,6.25,6.875,7.5,8.125,8.75,9.375,10,10.625,11.25,11.875,12.5,13.125,13.75,14.375,15,15.625,16.25,16.875,17.5,18.125,18.75,19.375,20,20.625,21.25,21.875,22.5,23.125,23.75,24.375,25]),sleep:q([0,2.5,3.125,3.75,4.375,5,5.625,6.25,6.875,7.5,8.125,8.75,9.375,10,10.625,11.25,11.875,12.5,13.125,13.75,14.375,15,15.625,16.25,16.875,17.5,18.125,18.75,19.375,20,20.625,21.25,21.875,22.5,23.125,23.75,24.375,25]),sleepHours:q([0,1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.45,1.6,1.95,2.5,3.3,4.2,5.2,6.3,7.5,8.8,10.2,11.7,13.45,15.2,16.95,18.45,19.7,20.95,22.2,23.2,23.95,24.45,24.75,24.9,25,25,25,25,25])};var X=Object(o.g)((function(e){var t=e.location.search,a=["motivated","fast","sleep","sleepHours"].reduce((function(e,t){return e+Q[t][v.getItem(t)]}),0),n=t.split("=")[1].split(",").sort();5===n.length&&(n.pop(),n.shift());var r=n.reduce((function(e,t){return Number(e)+Number(t)}),0)/n.length;return c.a.createElement("section",{className:"section"},c.a.createElement("article",{className:"message is-info"},c.a.createElement("div",{className:"message-header"},c.a.createElement("p",null,"HIIT readiness")),c.a.createElement("div",{className:"message-body"},a,"%")),c.a.createElement("article",{className:"message is-info"},c.a.createElement("div",{className:"message-header"},c.a.createElement("p",null,"Reaction score")),c.a.createElement("div",{className:"message-body"},Math.round(r)," ms")),c.a.createElement("div",{className:"has-text-centered"},c.a.createElement(l.b,{to:"/"},c.a.createElement("button",{className:"button is-black"},"Done"))))}));function Z(){var e=Object(n.useState)(),t=Object(s.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(!0),m=Object(s.a)(i,2),u=m[0],d=m[1],f=Object(n.useRef)(!1);Object(n.useEffect)((function(){r({email:v.getItem("email"),name:v.getItem("name"),age:v.getItem("age")})}),[]),Object(n.useEffect)((function(){f.current&&d(!!(null===a||void 0===a?void 0:a.email)),f.current=!0}),[a]);return c.a.createElement(l.a,null,c.a.createElement(V,null),c.a.createElement(o.d,null,c.a.createElement(o.b,{path:"/login"},c.a.createElement(O,{setUser:r})),!u&&c.a.createElement(o.a,{to:"/login"}),c.a.createElement(o.b,{path:"/home"},c.a.createElement(P,null)),c.a.createElement(o.b,{path:"/today"},c.a.createElement(M,{onSubmit:function(e){return e.preventDefault(),new Promise((function(t){v.items.forEach((function(t){var a=t.field,n=(e.target[a].value||"").trim();v.setItem(a,n)})),v.isValid()&&(setTimeout((function(){return window.scrollTo(0,0)}),500),t(!0)),t(!1)}))}})),c.a.createElement(o.b,{path:"/lift"},c.a.createElement(Y,null)),c.a.createElement(o.b,{path:"/results"},c.a.createElement(X,null)),c.a.createElement(o.b,{path:"/data/:table(lift)",render:function(e){return c.a.createElement(x,{rp:e})}}),c.a.createElement(o.a,{to:"/home"})))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));window.addEventListener("contextmenu",(function(e){e.preventDefault()})),i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[144,1,2]]]);
//# sourceMappingURL=main.afab6d8f.chunk.js.map