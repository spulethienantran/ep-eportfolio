"use strict";(self.webpackChunkeporfolio_frontend=self.webpackChunkeporfolio_frontend||[]).push([[357],{3773:function(e,t,o){o.r(t),o.d(t,{default:function(){return v}});var a=o(4942),r=o(1413),s=o(9439),n=o(2791),l=o(1243),c=o(9602),i=o(3442),d=o(5321),h=o(6328),u=o(6850),p=o(1072),j=o(8912),P=o(3039),g=o(8687),f=o(7689),m=o(184);var v=(0,g.$j)((function(e){return{userData:e.user.userData}}))((function(e){var t=e.userData,o=(0,f.s0)(),g=(0,n.useRef)(null),v=(0,n.useState)(null),C=(0,s.Z)(v,2),Z=C[0],x=C[1],w=(0,n.useState)(null),b=(0,s.Z)(w,2),D=b[0],N=b[1],k=(0,n.useState)(null),I=(0,s.Z)(k,2),S=I[0],U=I[1],T=(0,n.useState)(null),y=(0,s.Z)(T,2),A=(y[0],y[1],240),R=240,E=(0,n.useState)(!1),F=(0,s.Z)(E,2),O=F[0],B=F[1],G=(0,n.useState)(""),L=(0,s.Z)(G,2),M=L[0],W=L[1],Y=(0,n.useState)({projectTitle:"",collaborators:[],projectDescription:""}),_=(0,s.Z)(Y,2),q=_[0],H=_[1],K=function(){g.current.click()},V=function(e,t){O&&B(!1),H((0,r.Z)((0,r.Z)({},q),{},(0,a.Z)({},e,t)))};return(0,m.jsxs)("div",{className:"wrapper PostProjectPage-Wrapper",children:[(0,m.jsx)(d.Z,{}),(0,m.jsx)("div",{className:"PostProjectPage-ContentContainer",children:(0,m.jsxs)("div",{className:"PostProjectPage-Content",children:[(0,m.jsx)("p",{className:"heading-1 PostProjectPage-Title",children:"Post Your Project"}),(0,m.jsxs)("div",{className:"PostProjectPage-UploadPhotoContainer",children:[(0,m.jsx)("input",{type:"file",accept:"image/*",style:{display:"none"},ref:g,onChange:function(e){var t=e.target.files[0];if(t){var o=new FileReader;o.onload=function(e){var t=new Image;t.src=e.target.result,t.onload=function(){var e=document.createElement("canvas"),o=t.width,a=t.height;(t.width>A||t.height>R)&&(t.width/A>t.height/R?(o=A,a=t.height/t.width*A):(a=R,o=t.width/t.height*R)),U(t.height),N(t.width),e.width=o,e.height=a,e.getContext("2d").drawImage(t,0,0,o,a);var r=e.toDataURL("image/jpeg",.7);x(r)}},o.readAsDataURL(t)}}}),null===Z?(0,m.jsx)(h.Z,{icon:u.VmB,className:"PostProjectPage-UploadPhoto",onClick:K}):(0,m.jsx)("div",{className:"PostProjectPage-UploadPhotoContainer",onClick:K,children:(0,m.jsx)("img",{src:Z,className:"PostProjectPage-UploadedPhoto",alt:"Uploaded Project Banner"})})]}),O&&(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("p",{className:"paragraph-2 PostProjectPage-ErrorMessage",children:M})}),(0,m.jsxs)("div",{className:"PostProjectPage-Form",children:[(0,m.jsx)(j.Z,{placeholder:"Project Title",onChange:V,name:"projectTitle"}),(0,m.jsx)(c.Z,{placeholder:"Add Collaborators",isMulti:!0,name:"collaborators",isCollaboratorDropdown:!0,onCollaboratorsChange:function(e){var t=e.map((function(e){return e.value}));H((0,r.Z)((0,r.Z)({},q),{},{collaborators:t}))}}),(0,m.jsx)(P.Z,{placeholder:"Project Description",onChange:V,name:"projectDescription"})]}),(0,m.jsx)(p.Z,{title:"Post",onClick:function(){var e={projectTitle:q.projectTitle,encodePhoto:Z,photoOGHeight:S,photoOGWidth:D,projectOwnerId:t.userId,projectCollaborators:q.collaborators,projectDescription:q.projectDescription};console.log(e),l.Z.post("/api/project/upload",e,{headers:{"X-API-KEY":i.b.key}}).then((function(a){var r;console.log(e),r=null===t||void 0===t?void 0:t.userId,o("/Profile",{state:{userId:r}})})).catch((function(e){B(!0),W(e.response.data.message),console.error("API request error:",e.response.data.message)}))}})]})})]})}))}}]);
//# sourceMappingURL=357.1c9aafc0.chunk.js.map