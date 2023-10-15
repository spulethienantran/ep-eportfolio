"use strict";(self.webpackChunkeporfolio_frontend=self.webpackChunkeporfolio_frontend||[]).push([[702],{6328:function(A,a,e){e.d(a,{Z:function(){return o}});e(2791);var n=e(9806),r=e(184);var o=function(A){var a="".concat(A.className," IconButton-Container");return(0,r.jsx)("button",{className:a,onClick:A.onClick,children:(0,r.jsx)(n.G,{icon:A.icon})})}},1072:function(A,a,e){e.d(a,{Z:function(){return r}});e(2791);var n=e(184);var r=function(A){var a="".concat(A.className," StandardButton-Container");return(0,n.jsx)("button",{className:a,onClick:A.onClick,children:(0,n.jsx)("p",{className:"heading-4",children:A.title})})}},9602:function(A,a,e){e.d(a,{Z:function(){return l}});var n=e(1413),r=e(9439),o=e(2791),t=e(4782),c=e(1243),s=e(3442),i=e(184);var l=function(A){var a=o.useState([]),e=(0,r.Z)(a,2),l=e[0],u=e[1],d=o.useState([]),v=(0,r.Z)(d,2),h=v[0],m=v[1],f=o.useState(""),C=(0,r.Z)(f,2),x=C[0],N=C[1],g=function(a){u(a),A.onCollaboratorsChange(a)},j={dropdownIndicator:function(A){return(0,n.Z)((0,n.Z)({},A),{},{display:"none"})},indicatorSeparator:function(A){return(0,n.Z)((0,n.Z)({},A),{},{display:"none"})},clearIndicator:function(A){return(0,n.Z)((0,n.Z)({},A),{},{display:"none"})},control:function(A,a){return(0,n.Z)((0,n.Z)({},A),{},{height:"calc(7vmin)",width:"calc(38vmin)",overflowY:"auto",borderRadius:"calc(1vmin)",border:a.isFocused?"solid var(--Black1) calc(0.31vmin)":"solid var(--Gray1) calc(0.31vmin)",paddingLeft:"calc(2.5vmin)",paddingRight:"calc(2.5vmin)",fontFamily:'"Inter Regular"',fontSize:"calc(1.65vmin)",outline:"none",boxShadow:"none","&:hover":{borderColor:a.isFocused?"var(--Black1)":"var(--Gray1)"}})},placeholder:function(A){return(0,n.Z)((0,n.Z)({},A),{},{fontFamily:'"Inter Regular"',fontSize:"calc(1.65vmin)"})},input:function(A){return(0,n.Z)((0,n.Z)({},A),{},{fontFamily:'"Inter Regular"',fontSize:"calc(1.65vmin)"})},multiValue:function(A){return(0,n.Z)((0,n.Z)({},A),{},{overflow:"hidden",textOverflow:"ellipsis"})},menu:function(A){return(0,n.Z)((0,n.Z)({},A),{},{maxHeight:"calc(12.5vmin)",overflowY:"auto"})},multiValueRemove:function(A){return(0,n.Z)((0,n.Z)({},A),{},{fontSize:"calc(1.65vmin)"})}};return(0,o.useEffect)((function(){N("")}),[l]),(0,i.jsx)(i.Fragment,{children:A.isCollaboratorDropdown?(0,i.jsx)(t.ZP,{isMulti:A.isMulti,name:A.name,value:l,onChange:g,options:h,placeholder:A.placeholder,styles:j,className:"".concat(A.className," StandardDropDown"),onInputChange:function(A){return N(A)},onKeyDown:function(A){if("Enter"===A.key&&x){A.preventDefault();var a="/api/users/search?username=".concat(x);c.Z.get(a,{headers:{"X-API-KEY":s.b.key}}).then((function(A){var a=JSON.stringify(A.data.responseObject),e=JSON.parse(a).map((function(A){return{value:A.userId,label:A.username}}));m(e),console.log(h)})).catch((function(A){console.error("API request error:",A)}))}}}):(0,i.jsx)(t.ZP,{isMulti:A.isMulti,name:A.name,value:l,onChange:g,options:h,placeholder:A.placeholder,styles:j,className:"".concat(A.className," StandardDropDown")})})}},3039:function(A,a,e){e.d(a,{Z:function(){return r}});e(2791);var n=e(184);var r=function(A){var a="".concat(A.className," StandardTextAreaInputField"),e=A.onChange;return(0,n.jsx)("textarea",{placeholder:A.placeholder,className:a,value:A.value,name:A.name,onChange:function(A){var a=A.target,n=a.name,r=a.value;e(n,r)}})}},8912:function(A,a,e){e.d(a,{Z:function(){return r}});e(2791);var n=e(184);var r=function(A){var a=A.onChange,e="".concat(A.className," StandardTextInputField");return(0,n.jsx)("input",{type:A.type?A.type:"text",placeholder:A.placeholder,className:e,value:A.value,name:A.name,onChange:function(A){var e=A.target,n=e.name,r=e.value;a(n,r)}})}},8081:function(A,a,e){e.d(a,{Z:function(){return r}});e(2791);var n=e(184);var r=function(A){var a="".concat(A.className," Logo-Container");return(0,n.jsx)("div",{className:a,children:(0,n.jsx)("img",{src:"data:image/png;base64,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",alt:"EP LOGO"})})}},5321:function(A,a,e){e.d(a,{Z:function(){return N}});var n=e(4942),r=e(1413),o=e(9439),t=e(2791),c=e(8081),s=e(9806),i=e(1632),l=e(6850),u=e(184);var d=function(A){return(0,u.jsxs)("button",{className:"NavBarButton-Container",onClick:A.onClick,children:[(0,u.jsx)(s.G,{icon:A.icon,className:"NavBarButton-Icon"}),(0,u.jsx)("p",{className:"paragraph-1 NavBarButton-Description",children:A.title})]})},v=e(6328),h=e(7622),m=e(7689),f=e(8687),C=e(1243);var x=function(A){var a=A.onChange,e=A.onKeyPress,n="".concat(A.className," SearchBox-SearchBoxContainer");return(0,u.jsxs)("div",{className:n,children:[(0,u.jsx)(s.G,{icon:i.wn1,className:"SearchBox-SearchIcon"}),(0,u.jsx)("input",{type:"text",placeholder:A.placeholder,value:A.value,className:"SearchBox-SearchBox",onChange:function(A){var e=A.target,n=e.name,r=e.value;a(n,r)},name:A.name,onKeyPress:e})]})};var N=(0,f.$j)((function(A){return{userData:A.user.userData}}))((function(A){var a,e=A.userData,s=(0,m.s0)(),f=(0,t.useState)({searchUsername:""}),N=(0,o.Z)(f,2),g=N[0],j=N[1],B=function(A){s("/Profile",{state:{userId:A}})};return(0,u.jsxs)("div",{className:"NavBar-Container",children:[(0,u.jsxs)("div",{className:"NavBar-TopContainer",children:[(0,u.jsxs)("div",{className:"NavBar-UserProfileContainer",children:[(0,u.jsx)("div",{className:"NavBar-UserAvatarContainer",children:(0,u.jsx)(h.Z,{userClassName:"NavBar-UserAvatar",defaultClassName:"NavBar-DefaultUserAvatar",userAvatar:null===e||void 0===e||null===(a=e.userImage)||void 0===a?void 0:a.photoEncode64,onClick:function(){B(null===e||void 0===e?void 0:e.userId)}})}),(0,u.jsxs)("div",{className:"NavBar-UserInformationContainer",children:[(0,u.jsx)("p",{className:"heading-3 NavBar-UserName",children:null===e||void 0===e?void 0:e.fullname}),(0,u.jsx)("p",{className:"paragraph-2 NavBar-UserMajor",children:null===e||void 0===e?void 0:e.major})]})]}),(0,u.jsx)(x,{name:"searchUsername",onChange:function(A,a){j((0,r.Z)((0,r.Z)({},g),{},(0,n.Z)({},A,a)))},placeholder:"Search others by usernames...",onKeyPress:function(A){"Enter"===A.key&&C.Z.get("/api/users/search?username=".concat(null===g||void 0===g?void 0:g.searchUsername)).then((function(A){if(A.data.responseObject.length>0){var a=A.data.responseObject[0].userId;s("/Profile",{state:{userId:a}})}else console.log("User not found")}))}}),(0,u.jsx)(d,{icon:l.g6h,title:"Post Project",onClick:function(){s("/PostProject")}}),(0,u.jsx)(d,{icon:l.hQn,title:"Profile",onClick:function(){B(e.userId)}})]}),(0,u.jsxs)("div",{className:"NavBar-BottomContainer",children:[(0,u.jsxs)("div",{className:"NavBar-LogoContainer",children:[(0,u.jsx)(c.Z,{className:"NavBar-Logo"}),(0,u.jsx)("p",{className:"paragraph-2",children:(0,u.jsx)("em",{children:'"Projects by Peers, Passion in Progress."'})})]}),(0,u.jsx)(v.Z,{icon:i.SJh,className:"NavBar-SignOut",onClick:function(){s("/")}})]})]})}))},7622:function(A,a,e){e.d(a,{Z:function(){return t}});e(2791);var n=e(9806),r=e(6850),o=e(184);var t=function(A){var a="".concat(A.userClassName," ProfileAvatar-User"),e="".concat(A.defaultClassName," ProfileAvatar-Default"),t=A.userAvatar;return(0,o.jsx)(o.Fragment,{children:t?(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("button",{className:"ProfileAvatar-Container",onClick:A.onClick,children:(0,o.jsx)("img",{src:t,alt:"User Avatar",className:a})})}):(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("button",{className:"ProfileAvatar-Container",onClick:A.onClick,children:(0,o.jsx)("div",{className:e,children:(0,o.jsx)(n.G,{icon:r.ILF})})})})})}},3442:function(A,a,e){e.d(a,{b:function(){return n}});var n={key:"JZD1zC0efO7rnomTaNr8f1aoL6WRup5z4BmOEWut",signInURL:"/api/authentication/sign-in",signUpURL:"/api/authentication/sign-up",editUserInformationURL:"/api/users/information",followURL:"/api/follow/new"}}}]);
//# sourceMappingURL=702.d3ebbe42.chunk.js.map