(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{mR1u:function(e,t,n){"use strict";n.r(t);var a=n("/S4K"),r=n("9Hrx"),o=n("kD0k"),c=n.n(o),s=n("q1tI"),i=n.n(s),l=n("v4IS"),m=n("0zVQ"),u=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={username:"",authcode:""},t.onChange=function(e){var n;t.setState(((n={})[e.target.name]=e.target.value,n))},t}return Object(r.a)(t,e),t.prototype.render=function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h3",null,"Sign Up"),i.a.createElement("div",{className:"flex flex-1 justify-center"},i.a.createElement("div",{className:"w-full max-w-144"},i.a.createElement("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"},i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"username"},"Username"),i.a.createElement("input",{onChange:this.onChange,name:"username",className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"username",type:"text",placeholder:"Username"})),i.a.createElement("div",{className:"mb-6"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"authcode"},"Authentication Code"),i.a.createElement("input",{onChange:this.onChange,name:"authcode",className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"authcode",type:"authcode"})),i.a.createElement("div",{className:"flex items-center justify-between"},i.a.createElement("button",{onClick:function(){return e.props.confirmSignUp(e.state)},className:"bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",type:"button"},"Confirm Sign Up"),i.a.createElement("a",{className:"inline-block align-baseline font-bold text-sm",href:"#/"},"Forgot Password?"))),i.a.createElement("p",{className:"text-center text-gray-500 text-xs"},"©2020 JAMstack ECommerce. All rights reserved."))))},t}(i.a.Component),d=n("Lq6l"),p=n("l1VB"),g=n("oDCQ"),f=n("awqx"),h="\n  mutation CreateProduct(\n    $input: CreateProductInput!\n    $condition: ModelProductConditionInput\n  ) {\n    createProduct(input: $input, condition: $condition) {\n      id\n      categories\n      price\n      name\n      image\n      description\n      currentInventory\n      maxInventory\n      brand\n      intro\n      sold\n      endDate\n      question\n      options\n      answer\n      gallery\n      tickets\n      createdAt\n      updatedAt\n    }\n  }\n",b="\n  mutation UpdateProduct(\n    $input: UpdateProductInput!\n    $condition: ModelProductConditionInput\n  ) {\n    updateProduct(input: $input, condition: $condition) {\n      id\n      categories\n      price\n      name\n      image\n      description\n      currentInventory\n      maxInventory\n      brand\n      intro\n      sold\n      endDate\n      question\n      options\n      answer\n      gallery\n      tickets\n      createdAt\n      updatedAt\n    }\n  }\n",x="\n  mutation DeleteProduct(\n    $input: DeleteProductInput!\n    $condition: ModelProductConditionInput\n  ) {\n    deleteProduct(input: $input, condition: $condition) {\n      id\n      categories\n      price\n      name\n      image\n      description\n      currentInventory\n      maxInventory\n      brand\n      intro\n      sold\n      endDate\n      question\n      options\n      answer\n      gallery\n      tickets\n      createdAt\n      updatedAt\n    }\n  }\n",v=n("xk4V"),y=n.n(v),w={name:"",brand:"",price:"",categories:[],image:"",description:"",currentInventory:"",maxInventory:"",intro:"",sold:!1},E=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this).state=w,t.clearForm=function(){t.setState((function(){return w}))},t.onImageChange=function(){var e=Object(a.a)(c.a.mark((function e(n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.target.files[0],r=y()()+a.name,e.next=4,p.a.put(r,a);case 4:t.setState({image:r});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.addItem=Object(a.a)(c.a.mark((function e(){var n,a,r,o,s,i,l,m,u,d,p,b;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.state,a=n.name,r=n.brand,o=n.price,s=n.categories,i=n.image,l=n.description,m=n.currentInventory,u=n.maxInventory,d=n.intro,p=n.sold,a&&r&&o&&s.length&&l&&m&&i&&u&&d&&p){e.next=3;break}return e.abrupt("return");case 3:return b=Object.assign({},t.state,{categories:s.replace(/\s/g,"").split(",")}),e.next=6,g.a.graphql(Object(f.b)(h,{input:b}));case 6:t.clearForm();case 7:case"end":return e.stop()}}),e)}))),t}return Object(r.a)(t,e),t.prototype.render=function(){var e=this,t=this.state,n=t.name,a=t.brand,r=t.price,o=t.categories,c=t.intro,s=t.description,l=t.currentInventory,m=t.sold,u=t.maxInventory;return i.a.createElement("div",null,i.a.createElement("h3",null,"Add Item"),i.a.createElement("div",{className:"flex flex-1 justify-center"},i.a.createElement("div",{className:"w-full max-w-144"},i.a.createElement("form",{className:"bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4"},i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"name"},"Item name"),i.a.createElement("input",{onChange:this.onChange,value:n,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"name",type:"text",placeholder:"Item name",name:"name"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"price"},"Item price"),i.a.createElement("input",{onChange:this.onChange,value:r,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"price",type:"text",placeholder:"Item price",name:"price"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"description"},"Item Description"),i.a.createElement("input",{onChange:this.onChange,value:s,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"description",placeholder:"Item Description",name:"description"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"item image"},"Item image"),i.a.createElement("input",{type:"file",onChange:function(t){return e.onImageChange(t)}})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"currentInventory"},"In stock"),i.a.createElement("input",{onChange:this.onChange,value:l,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"currentInventory",placeholder:"Items in stock",name:"currentInventory"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"maxInventory"},"Max Inventory"),i.a.createElement("input",{onChange:this.onChange,value:u,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"maxInventory",placeholder:"Items max inventory",name:"maxInventory"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"categories"},"Item categories"),i.a.createElement("input",{onChange:this.onChange,value:o,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"categories",placeholder:"Comma separated list of item categories",name:"categories"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"brand"},"Item brand"),i.a.createElement("input",{onChange:this.onChange,value:a,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"brand",placeholder:"Item brand",name:"brand"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"intro"},"Item intro"),i.a.createElement("input",{onChange:this.onChange,value:c,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"intro",placeholder:"Item intro",name:"intro"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"sold"},"Item sold"),i.a.createElement("input",{onChange:this.onChange,value:m,className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"sold",placeholder:"Item sold",name:"sold"})),i.a.createElement("div",{className:"flex items-center justify-between mt-4"},i.a.createElement("button",{onClick:this.addItem,className:"bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",type:"button"},"Add Item"),i.a.createElement("a",{onClick:this.clearForm,className:"inline-block align-baseline font-bold text-sm",href:"#/"},"Clear Form"))),i.a.createElement("p",{className:"text-center text-gray-500 text-xs"},"©2020 JAMstack ECommerce. All rights reserved."))))},t}(i.a.Component),I=n("t8Zj"),N="\n  query ListProducts(\n    $filter: ModelProductFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        categories\n        price\n        name\n        image\n        description\n        currentInventory\n        maxInventory\n        brand\n        intro\n        sold\n        endDate\n        question\n        options\n        answer\n        gallery\n        tickets\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n",k=n("5Epl"),C=n("Wbzz"),S=n("IF/j"),j=n("ma3e"),O=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this).state={inventory:[],currentItem:{},editingIndex:[]},t.fetchInventory=Object(a.a)(c.a.mark((function e(){var n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.graphql(Object(f.b)(N));case 2:n=e.sent,a=n.data.listProducts.items,console.log("inventory items: ",a),t.setState({inventory:a});case 6:case"end":return e.stop()}}),e)}))),t.editItem=function(e,n){var a=n;t.setState({editingIndex:a,currentItem:e})},t.saveItem=function(){var e=Object(a.a)(c.a.mark((function e(n){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=Object(I.a)(t.state.inventory))[n]=t.state.currentItem,e.next=4,g.a.graphql(Object(f.b)(b,{input:t.state.currentItem}));case 4:t.setState({editingIndex:null,inventory:a});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.deleteItem=function(){var e=Object(a.a)(c.a.mark((function e(n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.state.inventory[n].id,r=[].concat(Object(I.a)(t.state.inventory.slice(0,n)),Object(I.a)(t.state.inventory.slice(n+1))),t.setState({inventory:r}),e.next=5,g.a.graphql(Object(f.b)(x,{input:{id:a}}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.onChange=function(e){var n,a=Object.assign({},t.state.currentItem,((n={})[e.target.name]=e.target.value,n));t.setState({currentItem:a})},t}Object(r.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.fetchInventory()},n.render=function(){var e=this,t=this.state,n=t.inventory,a=t.currentItem,r=t.editingIndex;return console.log("currentItem: ",a),i.a.createElement("div",{className:"mobile:px-10 px-4 pb-10 flex justify-center main-content"},i.a.createElement("div",{className:"w-fw"},i.a.createElement("div",null,i.a.createElement("h2",null,"Inventory"),n.map((function(t,n){return r===n?i.a.createElement("div",{className:"border-b py-10",key:t.id},i.a.createElement("div",{className:"flex items-center"},i.a.createElement(C.Link,{to:Object(S.c)(t.name)},i.a.createElement(k.a,{className:"w-32 m-0",src:t.image,alt:t.name})),i.a.createElement("input",{onChange:function(t){return e.onChange(t,n)},className:"ml-8 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",value:a.name,placeholder:"Item name",name:"name"}),i.a.createElement("div",{className:"flex flex-1 justify-end items-center"},i.a.createElement("p",{className:"m-0 text-sm mr-2"},"In stock:"),i.a.createElement("input",{onChange:e.onChange,className:"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",value:a.currentInventory,name:"currentInventory",placeholder:"Item inventory"}),i.a.createElement("input",{onChange:e.onChange,className:"ml-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",value:a.price,name:"price",placeholder:"Item price"})),i.a.createElement("button",{onClick:function(){return e.saveItem(n)},className:"m-0 ml-10 text-gray-900 text-s cursor-pointer"},i.a.createElement("span",{className:"text-sm ml-10 m-0"},"Save")))):i.a.createElement("div",{className:"border-b py-10",key:t.id},i.a.createElement("div",{className:"flex items-center"},i.a.createElement(C.Link,{to:Object(S.c)(t.name)},i.a.createElement(k.a,{className:"w-32 m-0",src:t.image,alt:t.name})),i.a.createElement(C.Link,{to:Object(S.c)(t.name)},i.a.createElement("p",{className:"m-0 pl-10 text-gray-600 text-sm"},t.name)),i.a.createElement("div",{className:"flex flex-1 justify-end"},i.a.createElement("p",{className:"m-0 pl-10 text-gray-900 tracking-tighter text-sm"},"In stock: ",t.currentInventory),i.a.createElement("p",{className:"m-0 pl-20 text-gray-900 tracking-tighter font-semibold"},Object(S.b)(t.price))),i.a.createElement("div",{className:"flex items-center m-0 ml-10 text-gray-900 text-s cursor-pointer"},i.a.createElement(j.d,{onClick:function(){return e.deleteItem(n)}}),i.a.createElement("button",{onClick:function(){return e.editItem(t,n)},className:"text-sm ml-10 m-0"},"Edit"))))})))))},t}(i.a.Component),A=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={viewState:"view"},t}Object(r.a)(t,e);var n=t.prototype;return n.toggleViewState=function(e){this.setState((function(){return{viewState:e}}))},n.render=function(){var e=this;return i.a.createElement("div",{className:"mobile:px-10 px-4 pb-10 flex justify-center main-content"},i.a.createElement("div",{className:"w-fw"},i.a.createElement("div",null,i.a.createElement("h3",null,"Inventory"),i.a.createElement("div",{className:"flex"},i.a.createElement("button",{className:"mr-4 cursor-pointer hover:text-secondary",onClick:function(){return e.toggleViewState("view")}},"View"),i.a.createElement("button",{className:"cursor-pointer hover:text-secondary",onClick:function(){return e.toggleViewState("add")}},"Add")),"view"===this.state.viewState?i.a.createElement(O,null):i.a.createElement(E,null),i.a.createElement("button",{onClick:this.props.signOut,className:"bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",type:"button"},"Sign Out"))))},t}(i.a.Component),F=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this).state={formState:"signUp",isAdmin:!1},t.toggleFormState=function(e){t.setState((function(){return{formState:e}}))},t.signUp=function(){var e=Object(a.a)(c.a.mark((function e(n){var a,r,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.username,r=n.email,o=n.password,e.next=3,l.a.signUp({username:a,password:o,attributes:{email:r}});case 3:t.setState({formState:"confirmSignUp"});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.confirmSignUp=function(){var e=Object(a.a)(c.a.mark((function e(n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.username,r=n.authcode,e.next=3,l.a.confirmSignUp(a,r);case 3:t.setState({formState:"signIn"});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.signIn=function(){var e=Object(a.a)(c.a.mark((function e(n){var a,r,o,s,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.username,r=n.password,e.next=3,l.a.signIn(a,r);case 3:return e.next=5,l.a.currentAuthenticatedUser();case 5:o=e.sent,s=o.signInUserSession.idToken.payload,console.log("user",o),i=s["cognito:groups"]&&s["cognito:groups"].includes("admin"),t.setState({formState:"signedIn",isAdmin:i});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.signOut=Object(a.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.signOut();case 2:t.setState({formState:"signUp"});case 3:case"end":return e.stop()}}),e)}))),t}Object(r.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=Object(a.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.currentAuthenticatedUser();case 2:t=e.sent,(n=t.signInUserSession.idToken.payload)["cognito:groups"]&&n["cognito:groups"].includes("Admin")&&this.setState({formState:"signedIn",isAdmin:!0});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),n.render=function(){var e=this,t=this.state,n=t.formState,a=t.isAdmin;return i.a.createElement("div",{className:"flex flex-col"},i.a.createElement("div",{className:"max-w-fw flex flex-col"},i.a.createElement("div",{className:"pt-10"},i.a.createElement("h1",{className:"text-5xl font-light"},"Admin Panel")),function(t,n){switch(t){case"signUp":return i.a.createElement(m.a,Object.assign({},n,{signUp:e.signUp,toggleFormState:e.toggleFormState}));case"confirmSignUp":return i.a.createElement(u,Object.assign({},n,{confirmSignUp:e.confirmSignUp}));case"signIn":return i.a.createElement(d.a,Object.assign({},n,{signIn:e.signIn,toggleFormState:e.toggleFormState}));case"signedIn":return a?i.a.createElement(A,Object.assign({},n,{signOut:e.signOut})):i.a.createElement("h3",null,"Not an admin");default:return null}}(n)))},t}(i.a.Component);t.default=F}}]);
//# sourceMappingURL=component---src-pages-admin-js-c912a66eee8867eaa9a4.js.map