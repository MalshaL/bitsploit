(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"7FsM":function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var n=t("Wbzz"),r=t("q1tI"),s=t.n(r),c=function(e){var a=e.currentPage,t=e.pageCount;return s.a.createElement("nav",{className:"pagination"},2===a?s.a.createElement(n.Link,{className:"pageItem1",title:"Go to previous page",to:"/"},"← Newer posts"):a>2?s.a.createElement(n.Link,{className:"pageItem1",title:"Go to previous page",to:"/"+(a-1)},"← Newer posts"):s.a.createElement("span",null),t>1?s.a.createElement("p",{className:"pageItem2"},"Page ",a," of ",t):s.a.createElement("span",null),a<t?s.a.createElement(n.Link,{className:"pageItem3",title:"Go to next page",to:"/"+(a+1)},"Older posts →"):s.a.createElement("span",null))};function l(e){var a=e.posts,t=e.pageContext;return s.a.createElement("div",{className:"postListContainer"},s.a.createElement("div",{className:"postList"},a.filter((function(e){return e.node.frontmatter.title.length>0})).map((function(e){var a=e.node;return s.a.createElement("div",{className:"postPreview",key:a.id},s.a.createElement(n.Link,{to:a.frontmatter.path},s.a.createElement("div",{className:"postPreviewImageDiv"},s.a.createElement("img",{className:"postPreviewImage",src:a.frontmatter.image,alt:""})),s.a.createElement("div",{className:"postPreviewContent"},s.a.createElement(n.Link,{to:a.frontmatter.path,className:"postPreviewTitle"},a.frontmatter.title),s.a.createElement("p",{className:"postPreviewDate"},a.frontmatter.date),a.frontmatter.tags.map((function(e){return s.a.createElement("div",{className:"postPreviewTag",key:e},e)})),s.a.createElement("p",{className:"postPreviewExcerpt"},a.frontmatter.excerpt))))}))),s.a.createElement(c,{pageCount:t.pageCount,currentPage:t.currentPage}))}},nEv0:function(e,a,t){"use strict";t.r(a),t.d(a,"postListQuery",(function(){return m}));var n=t("q1tI"),r=t.n(n),s=t("Bl7J"),c=t("vrFN"),l=t("pMgH"),o=t("7FsM"),m="3735483430";a.default=function(e){var a=e.data,t=e.pageContext,n=a.allMarkdownRemark.edges;return r.a.createElement(s.a,null,r.a.createElement("div",{className:"gridContainer"},r.a.createElement(o.a,{posts:n,pageContext:t}),r.a.createElement(l.a,null)),r.a.createElement(c.a,{title:"Posts"}))}},pMgH:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var n=t("KQm4"),r=t("Wbzz"),s=t("q1tI"),c=t.n(s),l=t("8AOc");function o(){var e=Object(r.useStaticQuery)("1145805751"),a=[];e.allMarkdownRemark.edges.forEach((function(e){var t=e.node;a=a.concat(t.frontmatter.tags)}));var t,s,o=(t=a,Object(n.a)(new Set((s=[]).concat.apply(s,Object(n.a)(t)))));return console.log(o),c.a.createElement("div",{className:"sidebar"},c.a.createElement("div",{className:"aboutSidebar"},c.a.createElement("div",{className:"authorImageDiv"},c.a.createElement("img",{className:"authorImage",src:"https://user-images.githubusercontent.com/10103699/150982674-35b56056-877e-4bc3-b3af-cdd24f2d2fe5.jpg",alt:"author"})),c.a.createElement("p",{className:"authorHeading"},"Malsha Ranawaka"),c.a.createElement("p",{className:"sidebarContent"},"Software Engineer and Data Analyst, creating content that makes learning new concepts easy and fun."),c.a.createElement(l.a,null)),c.a.createElement("div",{className:"tagCloud"},c.a.createElement("p",{className:"sidebarHeading"},"Tag Cloud"),o.map((function(e){var a="/tags/"+e;return c.a.createElement("div",{className:"postPreviewTag",key:e},c.a.createElement(r.Link,{to:a,className:"postPreviewTagText"},e))}))))}}}]);
//# sourceMappingURL=component---src-templates-homepage-js-8643fa7270bd8f9f1068.js.map