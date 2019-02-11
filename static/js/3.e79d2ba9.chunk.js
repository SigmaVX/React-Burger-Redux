(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{114:function(e,t,a){"use strict";var n=a(0),i=a.n(n),l=a(115),r=a.n(l);t.a=function(e){var t=null,a=[r.a.InputElement];e.invalid&&e.shouldValidate&&e.touched&&(a.push(r.a.Invalid),t=i.a.createElement("p",{className:r.a.ValidationError},e.elementConfig.placeholder," Error: Please Enter A Valid Value"));var n=null;switch(e.elementType){case"input":n=i.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":n=i.a.createElement("textarea",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":n=i.a.createElement("select",{className:a.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return i.a.createElement("option",{value:e.value,key:e.value},e.displayValue)}));break;default:n=i.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return i.a.createElement("div",{className:r.a.Input},i.a.createElement("label",{className:r.a.Label},e.label),n,t)}},115:function(e,t,a){e.exports={Input:"Input_Input__d5lcR",Label:"Input_Label__s87Af",InputElement:"Input_InputElement__t3rw5",Invalid:"Input_Invalid__1s9cN",ValidationError:"Input_ValidationError__kqcKz"}},123:function(e,t,a){e.exports={Auth:"Auth_Auth__1NRPA",AuthWrapper:"Auth_AuthWrapper__1kmNU"}},126:function(e,t,a){"use strict";a.r(t);var n=a(22),i=a(12),l=a(5),r=a(6),o=a(8),u=a(7),s=a(9),c=a(0),p=a.n(c),d=a(128),h=a(34),m=a(18),g=a(114),v=a(123),f=a.n(v),b=a(15),E=a(14),_=a(10),j=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,s=new Array(r),c=0;c<r;c++)s[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={controls:{email:{value:"",elementType:"input",elementConfig:{type:"email",placeholder:"Enter Email Address"},validation:{required:!0,minLength:3,valid:!1,isEmail:!0},touched:!1},password:{value:"",elementType:"input",elementConfig:{type:"password",placeholder:"Enter Password"},validation:{required:!0,minLength:6,valid:!1},touched:!1}},isSignUp:!0},a.inputChangeHandler=function(e,t){var l=Object(i.a)({},a.state.controls,Object(n.a)({},t,Object(i.a)({},a.state.controls[t],{value:e.target.value,touched:!0,validation:Object(i.a)({},a.state.controls[t].validation,{valid:Object(_.b)(e.target.value,a.state.controls[t].validation)})})));a.setState({controls:l})},a.submitHandler=function(e){e.preventDefault(),a.props.onAuth(a.state.controls.email.value,a.state.controls.password.value,a.state.isSignUp)},a.swithAuthMode=function(){a.setState(function(e){return{isSignUp:!e.isSignUp}})},a}return Object(s.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.props.buildingBurger||"/"===this.props.redirectPath||this.prop.onSetRedirectPath("/")}},{key:"render",value:function(){var e=this,t=[];for(var a in this.state.controls)t.push({id:a,config:this.state.controls[a]});var n=t.map(function(t){return p.a.createElement(g.a,{key:t.id,elementType:t.config.elementType,elementConfig:t.config.elementConfig,value:t.config.value,invalid:!t.config.validation.valid,shouldValidate:t.config.validation.required,touched:t.config.touched,changed:function(a){return e.inputChangeHandler(a,t.id)}})});this.props.loading&&(n=p.a.createElement(m.a,null));var i=null;this.props.error&&(i=p.a.createElement("p",null,this.props.error.message));var l=null;return this.props.isAuthenticated&&(l=p.a.createElement(d.a,{to:this.props.redirectPath})),p.a.createElement("section",{className:f.a.AuthWrapper},p.a.createElement("div",{className:f.a.Auth},l,this.state.isSignUp?p.a.createElement("h2",null,"Sign Up"):p.a.createElement("h2",null,"Login"),i,p.a.createElement("form",{onSubmit:this.submitHandler},n,p.a.createElement(h.a,{btnType:"Success"},"Submit")),p.a.createElement(h.a,{clicked:this.swithAuthMode,btnType:"Danger"},this.state.isSignUp?"Switch To Login":"Switch To Sign Up")))}}]),t}(c.Component);t.default=Object(E.b)(function(e){return{loading:e.auth.loading,error:e.auth.error,isAuthenticated:null!=e.auth.token,buildingBurger:e.burgerBuilder.building,redirectPath:e.auth.authRedirectPath}},function(e){return{onAuth:function(t,a,n){return e(b.b(t,a,n))},onSetRedirectPath:function(t){return e(b.j(t))}}})(j)}}]);
//# sourceMappingURL=3.e79d2ba9.chunk.js.map