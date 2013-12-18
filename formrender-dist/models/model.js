define(["jquery","underscore","backbone","collections/collections"],function(e,t,n,r){var i=function(n,i){var o={},u={},a,f=i.is_internal?!0:!1,l=i.render_mode||!1;return t.each(i.fields,function(c){c.options=c.options||{};if(!f&&c.options.internal)return;if(l&&c.options.showonmode&&c.options.showonmode.indexOf(l)===-1)return;if(f&&typeof c.options.internalcanupdate!="undefined"&&!c.options.internalcanupdate)return;typeof i.validation[c.name]!="undefined"&&t.each(i.validation[c.name],function(e,n){var r=["required","length","range","pattern","acceptance","min","max","length"];if(!t.contains(r,n.toLowerCase()))return;delete i.validation[c.name][n],i.validation[c.name][n.toLowerCase()]=e});switch(c.type.toLowerCase()){case"booleaninput":o[c.name]="",s(c.name,i,u,""),n.bindings[c.name]='[name="'+c.name+'"]',n.on("change:"+c.name,function(e,t){var n={};n[c.name]=t==="true"?!0:t==="false"?!1:"",e.set(n,{silent:!0})}),n.hasBooleanInput=!0;break;case"multifiles":a=c.name+"[]",o[a]="",typeof i.validation[c.name]!="undefined"&&(i.validation[a]=t.clone(i.validation[c.name]),delete i.validation[c.name]),s(a,i,u,"");break;case"address":a=c.name+"_address_street",o[a]="",s(a,i,u," (Street)"),n.bindings[a]='[name="'+a+'"]',a=c.name+"_address_city",o[a]="",s(a,i,u," (City)"),n.bindings[a]='[name="'+a+'"]',a=c.name+"_address_state",o[a]="",s(a,i,u," (State)"),n.bindings[a]='[name="'+a+'"]',a=c.name+"_address_zip",o[a]="",s(a,i,u," (ZIP)"),n.bindings[a]='[name="'+a+'"]',a=c.name+"_address_country",o[a]="",s(a,i,u," (Country)"),n.bindings[a]='[name="'+a+'"]';break;case"fullname":if(typeof c.options.middlename=="undefined"||c.options.middlename)a=c.name+"_fullname_middle_name",o[a]="",s(a,i,u," (Middle Name)"),n.bindings[a]='[name="'+a+'"]';a=c.name+"_fullname_first_name",o[a]="",s(a,i,u," (First Name)"),n.bindings[a]='[name="'+a+'"]',a=c.name+"_fullname_last_name",o[a]="",s(a,i,u," (Last Name)"),n.bindings[a]='[name="'+a+'"]';break;case"list":o[c.name]=new r,s(c.name,i,u,""),n.subFormLists.push(c.name);break;case"check":case"checkbox":a=c.name+"[]",o[a]="",s(a,i,u,"");break;case"fieldsetstart":case"fieldsetend":case"fieldset":case"clear":case"action":case"button":case"submit":case"hr":case"html":case"step":break;case"date":if(c.options.render&&c.options.render.toLowerCase()==="select"){o[c.name]="",o[c.name+"_birth[month]"]="",o[c.name+"_birth[day]"]="",o[c.name+"_birth[year]"]="";if(typeof i.validation[c.name]!="undefined"){u[c.name]=t.clone(i.validation[c.name]);var h=t.clone(i.validation[c.name]);h.mindate&&delete h.mindate,h.maxdate&&delete h.maxdate,u[c.name+"_birth[month]"]=t.clone(h),u[c.name+"_birth[day]"]=t.clone(h),u[c.name+"_birth[year]"]=t.clone(h)}}else o[c.name]="",s(c.name,i,u,"");break;case"email":o[c.name]="";if(typeof i.validation[c.name]!="undefined"){u[c.name]=t.clone(i.validation[c.name]);if(c.options.autocomplete){var p=t.clone(i.validation[c.name]),d=t.clone(i.validation[c.name]);p.pattern&&p.pattern==="email"&&(p.pattern=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i,d.pattern=/^((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),u[c.name+"_username"]=p,u[c.name+"_server"]=d}}break;case"telephone":o[c.name]="",typeof i.validation[c.name]!="undefined"&&(u[c.name]=t.clone(i.validation[c.name]),u[c.name].required&&(u[c.name].pattern=/^\(\d{3}\) \d{3}-\d{4}$/i));break;case"userid":o[c.name]="",typeof i.validation[c.name]!="undefined"&&(u[c.name]=t.clone(i.validation[c.name]),!u[c.name].pattern&&(!c.options.render||c.options.render.toLowerCase()!=="select")&&(u[c.name].pattern="email"));break;case"buttondecision":n.on("change:"+c.name,function(t,n){e("#"+c.name+"_btn_condition").val(n).trigger("change")});default:o[c.name]="",s(c.name,i,u,""),n.bindings[c.name]='[name="'+c.name+'"]'}}),n.validation=u,o},s=function(e,n,r,i){typeof n.validation[e]!="undefined"&&(r[e]=t.clone(n.validation[e]),n.validation[e].msg&&(r[e].msg=n.validation[e].msg+i))};return n.Model.extend({initialize:function(){this.subFormLists=[],this.bindings={};var n=i(this,this.attributes);this.clear(),this.set(n),this.on("validated:invalid",function(n,r){t.each(r,function(t,n){e(':input[name="'+n+'"]').addClass("invalid")})})},setTrim:function(r,i,s){var o;i=e.trim(i),t.isObject(r)||r==null?(o=r,s=i):(o={},o[r]=i),s=s||{},s.trim&&(o[r]=e.trim(o[r])),n.Model.prototype.set.call(this,o,s)},appendSubFormInput:function(n,r){var i=t.clone(this.toJSON()),s,o=e("#"+n);e("input.subform_before_submit",o).remove(),t.each(i,function(e,t){s=r.indexOf(t)>-1?"_internal":"",typeof e!="undefined"&&typeof e.toJSON=="function"&&o.prepend('<input type="hidden" name="'+t+s+"\" value='"+JSON.stringify(e.toJSON())+'\' class="subform_before_submit">')})},triggerError:function(t){if(this.hasBooleanInput){var n=e('.form-render_booleaninput input[type="hidden"].invalid',t.el);n.each(function(){var t=e(this),n='<span class="text-error">Please answer this question.</span>';t.closest(".form-render_booleaninput").next().html(n).show("slow")})}},isSubformValid:function(){var n=this,r=!0;return t.each(this.subFormLists,function(i){if(!n.validation[i])return;t.each(n.validation[i],function(n,s){if(t.isObject(n)||!r)return;var o=e('input.subform_before_submit[name="'+i+'"]').val();switch(s){case"required":o==="[]"&&(r=!1)}})}),r}})});