define(["jquery","underscore","backbone","collections/collections"],function(e,t,n,r){var i=function(e,n){var i={},o={},u,a=n.is_internal?!0:!1,f=n.render_mode||!1;return t.each(n.fields,function(e){e.options=e.options||{};if(!a&&e.options.internal)return;if(f&&e.options.showonmode&&e.options.showonmode.indexOf(f)===-1)return;if(a&&typeof e.options.internalcanupdate!="undefined"&&!e.options.internalcanupdate)return;typeof n.validation[e.name]!="undefined"&&t.each(n.validation[e.name],function(t,r){delete n.validation[e.name][r],n.validation[e.name][r.toLowerCase()]=t});switch(e.type.toLowerCase()){case"address":u=e.name+"_address_street",i[u]="",s(u,n,o," (Street)"),u=e.name+"_address_city",i[u]="",s(u,n,o," (City)"),u=e.name+"_address_state",i[u]="",s(u,n,o," (State)"),u=e.name+"_address_zip",i[u]="",s(u,n,o," (ZIP)"),u=e.name+"_address_country",i[u]="",s(u,n,o," (Country)");break;case"fullname":if(typeof e.options.middlename=="undefined"||e.options.middlename)u=e.name+"_fullname_middle_name",i[u]="",s(u,n,o," (Middle Name)");u=e.name+"_fullname_first_name",i[u]="",s(u,n,o," (First Name)"),u=e.name+"_fullname_last_name",i[u]="",s(u,n,o," (Last Name)");break;case"list":i[e.name]=new r,s(e.name,n,o,"");break;case"fieldsetstart":case"fieldsetend":case"fieldset":case"clear":case"action":case"button":case"submit":case"hr":case"html":case"step":break;case"date":if(e.options.render&&e.options.render.toLowerCase()==="select"){i[e.name]="",i[e.name+"_birth[month]"]="",i[e.name+"_birth[day]"]="",i[e.name+"_birth[year]"]="";if(typeof n.validation[e.name]!="undefined"){o[e.name]=t.clone(n.validation[e.name]);var l=t.clone(n.validation[e.name]);l.mindate&&delete l.mindate,l.maxdate&&delete l.maxdate,o[e.name+"_birth[month]"]=t.clone(l),o[e.name+"_birth[day]"]=t.clone(l),o[e.name+"_birth[year]"]=t.clone(l)}}else i[e.name]="",s(e.name,n,o,"");break;case"email":i[e.name]="";if(typeof n.validation[e.name]!="undefined"){o[e.name]=t.clone(n.validation[e.name]);if(e.options.autocomplete){var c=t.clone(n.validation[e.name]),h=t.clone(n.validation[e.name]);c.pattern&&c.pattern==="email"&&(c.pattern=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i,h.pattern=/^((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),o[e.name+"_username"]=c,o[e.name+"_server"]=h}}break;default:i[e.name]="",s(e.name,n,o,"")}}),e.validation=o,i},s=function(e,n,r,i){typeof n.validation[e]!="undefined"&&(r[e]=t.clone(n.validation[e]),n.validation[e].msg&&(r[e].msg=n.validation[e].msg+i))};return n.Model.extend({initialize:function(){var n=i(this,this.attributes);this.clear(),this.set(n),this.on("validated:invalid",function(n,r){t.each(r,function(t,n){e(':input[name="'+n+'"]').addClass("invalid")})})},setTrim:function(r,i,s){var o;i=e.trim(i),t.isObject(r)||r==null?(o=r,s=i):(o={},o[r]=i),s=s||{},s.trim&&(o[r]=e.trim(o[r])),n.Model.prototype.set.call(this,o,s)},appendSubFormInput:function(n,r){var i=t.clone(this.toJSON()),s;t.each(i,function(t,i){s=r.indexOf(i)>-1?"_internal":"",typeof t!="undefined"&&typeof t.toJSON=="function"&&e("#"+n).prepend('<input type="hidden" name="'+i+s+"\" value='"+JSON.stringify(t.toJSON())+'\' class="subform_before_submit">')})}})});