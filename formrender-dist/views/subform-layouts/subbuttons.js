define(["jquery","underscore","backbone","utils","text!templates/subform-layouts/subbuttons.html"],function(e,t,n,r,i){return n.View.extend({template:t.template(i),initialize:function(){var e=this,n="",i=this.options.confirmedtext?this.options.confirmedtext:"Please confirm your selection.";t.each(e.options.subbuttons,function(t,i,s){var o=t.type.toLowerCase();t.options=t.options||{};if(typeof t.options.internal!="undefined"&&t.options.internal!==e.options.internal)return;if(!r.shouldRenderWithShowOnStatusOrShowOnMode(t,e.options.status,e.options.mode))return;switch(o){case"button":var u="",a;t.url&&(t.options.appendid&&e.options._oid&&(t.url=(t.url?t.url:"")+(t.url.indexOf("?")>-1?"&id=":"/")+e.options._oid),u+=' href="'+t.url+'"'),t.attributes&&t.attributes.class?a=t.attributes.class:a="btn-primary",n+='<div class="text-center sub-button"><a class="btn '+a+'" '+u+">"+t.description+"</a></div>"}});if(n==="")return;this.options.button.popover({html:!0,placement:"top",trigger:"click",title:'<span class="text-info">'+i+"</span>",content:n})}})});