(this["webpackJsonpeashwar-demo"]=this["webpackJsonpeashwar-demo"]||[]).push([[7],{150:function(e,t,n){"use strict";n.r(t),n.d(t,"getLabel",(function(){return r})),n.d(t,"addNewLabel",(function(){return u})),n.d(t,"addNewLabelPic",(function(){return l})),n.d(t,"getOnePicture",(function(){return c})),n.d(t,"getLabelPicture",(function(){return i})),n.d(t,"getPictureNotLabel",(function(){return o})),n.d(t,"editLabelPicture",(function(){return d})),n.d(t,"getAllPicture",(function(){return E})),n.d(t,"addNewPicture",(function(){return f})),n.d(t,"setAllButPics",(function(){return s})),n.d(t,"addToCluster",(function(){return p}));var a=n(4),r=function(){return{type:a.a.GET_LABEL_REQUEST,payload:{}}},u=function(e){return{type:a.a.ADD_LABEL_REQUEST,payload:{name:e}}},l=function(e,t){return{type:a.a.ADD_LABEL_PIC_REQUEST,payload:{name:e,url:t}}},c=function(e){return{type:a.a.GET_PICTURE_REQUEST,payload:{url:e}}},i=function(e){return{type:a.a.GET_PICTURE_LABEL_REQUEST,payload:{labels:e}}},o=function(e){return{type:a.a.GET_PICTURE_NOT_LABEL_REQUEST,payload:{labels:e}}},d=function(e,t,n){return{type:a.a.EDIT_PICTURE_LABEL_REQUEST,payload:{labels:e,url:t,label:n}}},E=function(){return{type:a.a.GET_ALL_PICTURE_REQUEST,payload:{}}},f=function(e,t){return{type:a.a.ADD_PICTURE_REQUEST,payload:{name:e,taken:t}}},s=function(e){return{type:a.a.SET_ALL_BUT_PICS,payload:e}},p=function(e,t){return{type:a.a.ADD_TO_CLUSTER_REQUEST,payload:{values:e,labels:t}}}},156:function(e,t,n){"use strict";var a=n(150);n.d(t,"a",(function(){return a}))},181:function(e,t,n){},247:function(e,t,n){"use strict";n.r(t);n(3),n(17);var a=n(166),r=n(0),u=n.n(r),l=n(12),c=(n(159),n(167)),i=(n(160),n(56)),o=n.n(i),d=n(55),E=n(18),f=n(156);n(181);t.default=Object(d.b)((function(e){return{admin:e.admin}}),(function(e){return Object(E.b)({addNewLabel:f.a.addNewLabel,getLabel:f.a.getLabel,addNewLabelPic:f.a.addNewLabelPic,getOnePicture:f.a.getOnePicture,getLabelPicture:f.a.getLabelPicture,getAllPicture:f.a.getAllPicture,addNewPicture:f.a.addNewPicture},e)}))((function(e){var t=Object(r.useState)([]),n=Object(a.a)(t,2),i=(n[0],n[1],Object(r.useState)([])),d=Object(a.a)(i,2),E=(d[0],d[1],o.a.storage().ref(),Object(l.f)()),f=Object(r.useState)([{name:"happy"},{name:"hell"},{name:"hello"}]),s=Object(a.a)(f,2);s[0],s[1];Object(r.useEffect)((function(){e.getLabel(),e.getAllPicture()}),[]);var p=e.admin.allPictures;return u.a.createElement("div",{style:{}},u.a.createElement("div",null,e.admin.labels.map((function(e,t){return u.a.createElement(c.a,null,e.name)})),u.a.createElement(c.a,{onClick:function(){E.push({pathname:"/cluster"})}},"Go to clustering")),u.a.createElement("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap"}},p.map((function(e,t){return u.a.createElement("div",{style:{margin:".5%",display:"flex",flexDirection:"column"}},u.a.createElement("img",{height:150,width:200,src:e.name,onClick:function(){E.push({pathname:"/single",state:{url:e.name}})}}),e.labels.map((function(e,t){return u.a.createElement(c.a,null,e.name)})))}))))}))}}]);
//# sourceMappingURL=7.0a8ed59b.chunk.js.map