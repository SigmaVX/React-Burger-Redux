(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{121:function(e,r,n){e.exports={Order:"Order_Order__1eFNr"}},130:function(e,r,n){"use strict";n.r(r);var t=n(5),a=n(6),i=n(8),o=n(7),d=n(9),c=n(0),u=n.n(c),p=n(121),s=n.n(p),l=function(e){var r=[];for(var n in e.ingredients)r.push({name:n,amount:e.ingredients[n]});var t=r.map(function(e){return u.a.createElement("span",{key:e.name,style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",padding:"5px",lineHeight:"70px",border:"1px solid #ccc",borderRadius:"50%",fontSize:"14px",width:"75px",height:"75px",backgroundColor:"#45a4c6"}},e.name," (",e.amount,")")});return u.a.createElement("div",{className:s.a.Order},u.a.createElement("p",null,"Order Number: ",e.id),u.a.createElement("p",null,t),u.a.createElement("p",null,"Order Price: $",e.price.toFixed(2)))},m=n(19),h=n(42),f=n(14),O=n(15),b=n(18),g=function(e){function r(){return Object(t.a)(this,r),Object(i.a)(this,Object(o.a)(r).apply(this,arguments))}return Object(d.a)(r,e),Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=u.a.createElement(b.a,null);return this.props.loading||(e=u.a.createElement("div",null,u.a.createElement("h1",{style:{textAlign:"center",paddingTop:"30px"}},"Order History"),this.props.orders.map(function(e){return u.a.createElement(l,{key:e.id,ingredients:e.ingredients,price:+e.orderPrice,id:e.id})}))),e}}]),r}(c.Component);r.default=Object(f.b)(function(e){return{orders:e.order.orders,loading:e.order.loading,purchased:e.order.purchased,error:e.order.error,token:e.auth.token,userId:e.auth.userId}},function(e){return{onFetchOrders:function(r,n){return e(O.d(r,n))}}})(Object(h.a)(g,m.a))}}]);
//# sourceMappingURL=2.69c0c6c9.chunk.js.map