(this["webpackJsonp07-mars-viewer"]=this["webpackJsonp07-mars-viewer"]||[]).push([[0],{13:function(e,t,a){e.exports={container:"src_container__3kuyU"}},15:function(e,t,a){e.exports={marsViewer:"app_marsViewer__2hvDP"}},25:function(e,t,a){"use strict";a.r(t);a(1);var r,n=a(7),c=a.n(n),i=a(5),s=a.n(i),_=a(0),l=function(){return Object(_.jsx)("header",{className:s.a.header,children:Object(_.jsxs)("div",{className:"container",children:[Object(_.jsxs)("div",{className:s.a.header__mainTitles,children:[Object(_.jsx)("h1",{className:s.a.header__title,children:"Mars Viewer"}),Object(_.jsx)("h2",{className:s.a.header__subtitle,children:"[ Homework in Bootcamp ]"})]}),Object(_.jsx)("h2",{className:s.a.header__subsubtitle,children:"\xa9 Slutski Nikita"})]})})},o=a(2);!function(e){e.LOADED_NEW="LOADED_NEW",e.LOADING_NOW="LOADING_NOW",e.OTHER="OTHER",e.INPUT_VALUE_CHANGED="INPUT_VALUE_CHANGED",e.TAB_CHANGED="TAB_CHANGED",e.FAVOURITE_STATUS_CHANGED="FAVOURITE_STATUS_CHANGED"}(r||(r={}));var u,O=function(e){return{type:r.LOADING_NOW,payload:e}};!function(e){e.CHOOSE_SOLUTION="CHOOSE_SOLUTION",e.FAVOURITE_PHOTOS="FAVOURITES"}(u||(u={}));var j=a(6),d=a.n(j),b=function(e,t,a){return!t&&e(function(e){return{type:r.TAB_CHANGED,payload:e}}(a))},m=function(){var e=Object(o.c)((function(e){return e.activeTab})),t=Object(o.b)();return Object(_.jsx)(_.Fragment,{children:Object(_.jsxs)("div",{className:d.a.marsViewer__tab,children:[Object(_.jsx)("button",{className:"".concat(d.a.tab," ").concat(e===u.CHOOSE_SOLUTION?d.a.active:""),onClick:function(){return b(t,e===u.CHOOSE_SOLUTION,u.CHOOSE_SOLUTION)},children:"Photos"}),Object(_.jsx)("button",{className:"".concat(d.a.tab," ").concat(e===u.FAVOURITE_PHOTOS?d.a.active:""),onClick:function(){return b(t,e===u.FAVOURITE_PHOTOS,u.FAVOURITE_PHOTOS)},children:"Favourites"})]})})},g=a(8),h=a.n(g),N=function(e){return function(t){fetch(function(e){return"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=".concat(e.toString(),"&api_key=WXfRHHiCvKP1srvmO0EmL8DGs9Vz2Mj4UqWxqfF2")}(e)).then((function(e){return e.json()})).then((function(e){var a,n=[];e.photos.forEach((function(e){return n.push(e.img_src)})),t((a=n,{type:r.LOADED_NEW,payload:a}))}))}},p=function(e){return e({type:r.INPUT_VALUE_CHANGED,payload:null})},x=function(){var e=Object(o.c)((function(e){return e.currentSelectedSolution})),t=Object(o.c)((function(e){return e.activeTab})),a=Object(o.c)((function(e){return e.loaded})),r=Object(o.c)((function(e){return e.loading})),n=Object(o.b)();return Object(_.jsx)(_.Fragment,{children:t===u.CHOOSE_SOLUTION?Object(_.jsxs)("div",{className:h.a.marsViewer__settings,children:[Object(_.jsx)("input",{className:h.a.marsViewer__settings_input,id:"solutionNumber",type:"number",defaultValue:e,min:"1",onChange:function(){return p(n)}}),Object(_.jsx)("button",{className:h.a.marsViewer__settings_button,onClick:function(){return function(e,t,a){var r=document.getElementById("solutionNumber").value.toString().trim(),n=Number.parseInt(r);if(n===t&&!a)return e(O(Number.parseInt(r))),void e(N(Number.parseInt(r)));n!==t&&""!==r&&t!==Number.parseInt(r)&&(e(O(Number.parseInt(r))),e(N(Number.parseInt(r))))}(n,e,a)},disabled:r,children:"Load solution"})]}):Object(_.jsx)(_.Fragment,{})})},f=function(e,t,a){var n,c=Array.from(a);a.has(t)?c=c.filter((function(e){return e!==t})):c.push(t),e((n=new Set(c),{type:r.FAVOURITE_STATUS_CHANGED,payload:n}))},w=a(3),v=a.n(w),y=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.imagesLinks})),a=Object(o.c)((function(e){return e.loaded})),r=Object(o.c)((function(e){return e.loading})),n=Object(o.c)((function(e){return e.favourites}));return Object(_.jsxs)("div",{className:v.a.marsViewer__gallery,children:[a?t.length?Object(_.jsx)(_.Fragment,{children:Object(_.jsx)("div",{className:v.a.marsViewer__gallery_container,children:t.map((function(t){return Object(_.jsxs)("div",{className:v.a.marsViewer__gallery_imageBlock,children:[Object(_.jsx)("img",{src:t,alt:"picture"}),Object(_.jsx)("svg",{className:"".concat(v.a.like," ").concat(n.has(t)?v.a.liked:""),xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"24px",height:"24px",viewBox:"0 0 391.837 391.837",onClick:function(){return f(e,t,n)},children:Object(_.jsx)("path",{d:"M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58\r c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0\r c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"})})]},t)}))})}):Object(_.jsx)("span",{className:v.a.marsViewer__gallery_warning,children:"No photos"}):r?Object(_.jsx)(_.Fragment,{}):Object(_.jsx)("span",{className:v.a.marsViewer__gallery_warning,children:"Not loaded"}),r?Object(_.jsx)("span",{className:v.a.marsViewer__gallery_warning,children:"Loading"}):Object(_.jsx)(_.Fragment,{})]})},V=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.favourites}));return Object(_.jsx)("div",{className:v.a.marsViewer__gallery,children:t.size?Object(_.jsx)("div",{className:v.a.marsViewer__gallery_container,children:Array.from(t).map((function(a){return Object(_.jsxs)("div",{className:v.a.marsViewer__gallery_imageBlock,children:[Object(_.jsx)("img",{src:a,alt:"picture"}),Object(_.jsx)("svg",{className:"".concat(v.a.like," ").concat(t.has(a)?v.a.liked:""),xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"24px",height:"24px",viewBox:"0 0 391.837 391.837",onClick:function(){return f(e,a,t)},children:Object(_.jsx)("path",{d:"M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58\r c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0\r c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"})})]},a)}))}):Object(_.jsx)("span",{className:v.a.marsViewer__gallery_warning,children:"No favourite photos"})})},E=function(){return Object(o.c)((function(e){return e.activeTab}))===u.CHOOSE_SOLUTION?Object(_.jsx)(y,{}):Object(_.jsx)(V,{})},T=a(12),A=a(14),S=a(4),I={currentSelectedSolution:1,loading:!1,loaded:!1,imagesLinks:[],activeTab:u.CHOOSE_SOLUTION,favourites:new Set},U=Object(T.b)((function(e,t){switch(t.type){case r.LOADED_NEW:return Object(S.a)(Object(S.a)({},e),{},{imagesLinks:t.payload,loaded:!0,loading:!1});case r.LOADING_NOW:return Object(S.a)(Object(S.a)({},e),{},{imagesLinks:[],loaded:!1,loading:!0,currentSelectedSolution:t.payload});case r.INPUT_VALUE_CHANGED:return Object(S.a)(Object(S.a)({},e),{},{imagesLinks:[],loaded:!1,loading:!1});case r.TAB_CHANGED:return Object(S.a)(Object(S.a)({},e),{},{imagesLinks:[],loaded:!1,loading:!1,activeTab:t.payload});case r.FAVOURITE_STATUS_CHANGED:return Object(S.a)(Object(S.a)({},e),{},{favourites:t.payload});default:return e}}),I,Object(T.a)(A.a)),k=a(15),H=a.n(k),L=(a(13),function(){return Object(_.jsx)("div",{className:"container",children:Object(_.jsx)("div",{className:H.a.marsViewer,children:Object(_.jsxs)(o.a,{store:U,children:[Object(_.jsx)(m,{}),Object(_.jsx)(x,{}),Object(_.jsx)(E,{})]})})})}),C=function(){return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(l,{}),Object(_.jsx)("div",{className:"container",children:Object(_.jsx)(L,{})})]})};c.a.render(Object(_.jsx)(C,{}),document.getElementById("root"))},3:function(e,t,a){e.exports={marsViewer__gallery:"gallery_marsViewer__gallery__2Mr16",marsViewer__gallery_warning:"gallery_marsViewer__gallery_warning__3dOtw",marsViewer__gallery_container:"gallery_marsViewer__gallery_container__1tJqL",marsViewer__gallery_imageBlock:"gallery_marsViewer__gallery_imageBlock__RFDRc",like:"gallery_like__3Xanj",liked:"gallery_liked__3rpof"}},5:function(e,t,a){e.exports={header:"header_header__pB5aQ",header__mainTitles:"header_header__mainTitles__1_8M-",header__title:"header_header__title__Bwcuj",header__subtitle:"header_header__subtitle__2giEX",header__subsubtitle:"header_header__subsubtitle__2UnIl"}},6:function(e,t,a){e.exports={marsViewer__tab:"tab_marsViewer__tab__1-vTn",tab:"tab_tab__3x6Ad",active:"tab_active__1MSBM"}},8:function(e,t,a){e.exports={marsViewer__settings:"congiguration_marsViewer__settings__2KHt-",marsViewer__settings_input:"congiguration_marsViewer__settings_input__1Yn1M",marsViewer__settings_button:"congiguration_marsViewer__settings_button__2XsbY"}}},[[25,1,2]]]);
//# sourceMappingURL=main.7030735a.chunk.js.map