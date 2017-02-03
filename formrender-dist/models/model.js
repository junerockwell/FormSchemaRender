define(["jquery","underscore","backbone","collections/collections","../utils"],function(e,n,a,t,i){var s=!1,o=function(a,i,s){var o,u,d,m=!1,r={},c={},F=!!i.is_internal,p=i.render_mode||!1;return n.each(i.fields,function(b){if(d=!0,b.options=b.options||{},(F||!b.options.internal)&&(!p||!b.options.showonmode||b.options.showonmode.indexOf(p)!==-1)&&(!F||"undefined"==typeof b.options.internalcanupdate||b.options.internalcanupdate)&&!(a.attributes.status&&b.options.showonstatus&&n.indexOf(b.options.showonstatus,a.attributes.status)<0)){switch("undefined"!=typeof i.validation[b.name]&&n.each(i.validation[b.name],function(e,a){var t=["required","length","range","pattern","acceptance","min","max","length"];n.contains(t,a.toLowerCase())&&(delete i.validation[b.name][a],i.validation[b.name][a.toLowerCase()]=e)}),"undefined"!=typeof b.options.internal&&b.options.internal!==s&&(d=!1),u=b.type.toLowerCase()){case"filerepository":case"radio":d=!1}switch(u){case"textarea":a.escapeHtmlInputs.push(b.name)}switch(u){case"booleaninput":r[b.name]="",l(b.name,i,c,""),d&&(a.bindings[b.name]='[name="'+b.name+'"]'),a.on("change:"+b.name,function(e,n){var a={};a[b.name]="true"===n||n===!0||"false"!==n&&n!==!1&&"",e.set(a,{silent:!0})}),a.hasBooleanInput=!0;break;case"multifiles":o=b.name+"[]",r[o]="",m&&console.log("model.parseFields setting ",u,"name",o),"undefined"!=typeof i.validation[b.name]&&(i.validation[o]=n.clone(i.validation[b.name]),delete i.validation[b.name]),l(o,i,c,""),m&&console.log("- multiFilesDefaultValue",a.multiFilesDefaultValue),a.multiFilesDefaultValue[o]||(a.multiFilesDefaultValue[o]=!0);break;case"fraction":o=b.name+"_numerator",r[o]="",l(o,i,c,""),d&&(a.bindings[o]='[name="'+o+'"]'),o=b.name+"_denominator",r[o]="",l(o,i,c,""),d&&(a.bindings[o]='[name="'+o+'"]');break;case"address":var f=b.options.showstreetnumber?"Street Name":"Street";o=b.name+"_address_street",r[o]="",l(o,i,c," ("+f+")"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]'),o=b.name+"_address_city",r[o]="",l(o,i,c," (City)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]'),o=b.name+"_address_state",r[o]="",l(o,i,c," (State)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]'),o=b.name+"_address_zip",r[o]="",l(o,i,c," (ZIP)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]'),o=b.name+"_address_country",r[o]="",l(o,i,c," (Country)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]'),b.options.showstreetnumber&&(o=b.name+"_address_street_number",r[o]="",l(o,i,c," (Street Number)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]')),b.options.showunitnumber&&(o=b.name+"_address_unit_number",r[o]="",l(o,i,c," (Unit Number)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]'));break;case"fullname":("undefined"==typeof b.options.middlename||b.options.middlename)&&(o=b.name+"_fullname_middle_name",r[o]="",l(o,i,c," (Middle Name)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]')),o=b.name+"_fullname_first_name",r[o]="",l(o,i,c," (First Name)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]'),o=b.name+"_fullname_last_name",r[o]="",l(o,i,c," (Last Name)"),d&&!b.options.visibleon&&(a.bindings[o]='[name="'+o+'"]');break;case"list":r[b.name]=new t,l(b.name,i,c,""),a.subFormLists.push(b.name);break;case"check":case"checkbox":o=b.name+"[]",r[o]="","undefined"!=typeof i.validation[b.name]&&(i.validation[o]=n.clone(i.validation[b.name]),delete i.validation[b.name]),l(o,i,c,"");break;case"hidden":case"buttonclipboard":case"fieldsetstart":case"fieldsetend":case"fieldset":case"clear":case"action":case"button":case"submit":case"hr":case"html":case"step":a.notBinding.push(b.name);break;case"date":if(b.options.render&&"select"===b.options.render.toLowerCase()){if(r[b.name]="",r[b.name+"_birth[month]"]="",r[b.name+"_birth[day]"]="",r[b.name+"_birth[year]"]="","undefined"!=typeof i.validation[b.name]){c[b.name]=n.clone(i.validation[b.name]);var h=n.clone(i.validation[b.name]);h.mindate&&delete h.mindate,h.maxdate&&delete h.maxdate,c[b.name+"_birth[month]"]=n.clone(h),c[b.name+"_birth[day]"]=n.clone(h),c[b.name+"_birth[year]"]=n.clone(h)}}else r[b.name]="",l(b.name,i,c,"");break;case"email":if(r[b.name]="","undefined"!=typeof i.validation[b.name]&&(c[b.name]=n.clone(i.validation[b.name]),b.options.autocomplete)){var v=n.clone(i.validation[b.name]),g=n.clone(i.validation[b.name]);v.pattern&&"email"===v.pattern&&(v.pattern=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i,g.pattern=/^((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),o=b.name+"_username",c[o]=v,o=b.name+"_server",c[o]=g}d&&(a.bindings[b.name]='[name="'+b.name+'"]',b.options.autocomplete&&(o=b.name+"_username",a.bindings[o]='[name="'+o+'"]',o=b.name+"_server",a.bindings[o]='[name="'+o+'"]'));break;case"telephone":r[b.name]="","undefined"!=typeof i.validation[b.name]&&(c[b.name]=n.clone(i.validation[b.name]),c[b.name].required&&(c[b.name].pattern=/^\(\d{3}\) \d{3}-\d{4}$/i)),d&&(a.bindings[b.name]='[name="'+b.name+'"]');break;case"socialsecurity":r[b.name]="","undefined"!=typeof i.validation[b.name]&&(c[b.name]=n.clone(i.validation[b.name]),c[b.name].required&&(c[b.name].pattern=/^\d{3}\-\d{2}-\d{4}$/i)),c[b.name]||(c[b.name]={}),c&&!c[b.name].pattern&&("undefined"==typeof c[b.name].required&&(c[b.name].required=!1),c[b.name].pattern=/(^$|^\d{3}\-\d{2}-\d{4}$)/i),d&&(a.bindings[b.name]='[name="'+b.name+'"]');break;case"userid":r[b.name]="","undefined"!=typeof i.validation[b.name]&&(c[b.name]=n.clone(i.validation[b.name]),c[b.name].pattern||b.options.render&&"select"===b.options.render.toLowerCase()||(c[b.name].pattern="email"));break;case"buttondecision":a.on("change:"+b.name,function(n,a){e("#"+b.name+"_btn_condition").val(a).trigger("change")});default:b.attributes&&b.attributes.value?r[b.name]=b.attributes.value:r[b.name]="",l(b.name,i,c,""),"buttondecision"!==u&&d&&(a.bindings[b.name]='[name="'+b.name+'"]'),"select"===u&&b.options.tags&&(a.bindings[b.name]="#"+b.name)}if(b.options&&b.options.visibleon&&a.bindings[b.name]&&delete a.bindings[b.name],a.bindings[b.name]&&b.options&&b.options.showonstatus)if(a.attributes.status){var _=n.indexOf(b.options.showonstatus,a.attributes.status);_<0&&(delete a.bindings[b.name],c[b.name]&&delete c[b.name])}else delete a.bindings[b.name],c[b.name]&&delete c[b.name]}}),a.validation=c,r},l=function(e,a,t,i){"undefined"!=typeof a.validation[e]&&(t[e]=n.clone(a.validation[e]),a.validation[e].msg&&(t[e].msg=a.validation[e].msg+i))};return a.Model.extend({initialize:function(){var a=this;this.multiFilesDefaultValue={},this.subFormLists=[],this.bindings={},this.notBinding=[],this.escapeHtmlInputs=[],this._listFieldType={};var t=o(this,this.attributes,this.attributes.is_internal);if(this.clear(),this.set(t),this.on("validated:invalid",function(a,t){console&&console.log&&console.log("Invalid Fields",t),s&&(console.log("Check Model Values",a.toJSON()),console.log("Check Model Validation",a.validation),console.log("Check Model MultiFilesDefaultValue",a.multiFilesDefaultValue)),n.each(t,function(n,t){e(':input[name="'+t+'"]').addClass("invalid"),s&&(console.log("- Invalid Value for ",t),console.log(a.get(t)),console.log("- Validation",a.validation[t]),console.log("- MultiFilesDefaultValue",a.multiFilesDefaultValue[t]))})}),this.escapeHtmlInputs.length){var l={silent:!0};n.each(this.escapeHtmlInputs,function(e){var n="change:"+e;a.on(n,function(){if(a.has(e)){var n=i.htmlspecialchars(a.get(e)),t={};t[e]=n,a.set(t,l)}})})}n.each(this.subFormLists,function(e){if(a&&a.has&&a.has(e)){var n=a.get(e);n&&n.add&&(a._listFieldType[e]=n)}})},setTrim:function(t,i,s){var o;i=e.trim(i),n.isObject(t)||null==t?(o=t,s=i):(o={},o[t]=i),s=s||{},s.trim&&(o[t]=e.trim(o[t])),a.Model.prototype.set.call(this,o,s)},appendSubFormInput:function(a,t,s){s=s||null;var o,l=n.clone(this.toJSON()),u=e("#"+a);e("input.subform_before_submit",u).remove(),n.each(l,function(a,l){if(o=t.indexOf(l)>-1?"_internal":"","undefined"!=typeof a&&a&&"function"==typeof a.toJSON){s&&s[l].fields&&n.each(s[l].fields,function(t){if(t&&t.name&&t.type){t&&(t.options||(t.options={}),t.attributes||(t.attributes={}));var s=t.type.toLowerCase();n.each(a.models,function(a){var o;switch(s){case"number":var l=parseFloat(a.get(t.name));isNaN(l)||a.set(t.name,l);break;case"select":o=e.trim(a.get(t.name)),(t.options&&t.options.tags||t.attributes&&t.attributes.multiple)&&(n.isString(o)&&(o=o.split(",")),o&&o.length&&""===o[0]&&(o=[]),o.sort&&(o=o.sort(i.sortNumber)),a.set(t.name,o));break;case"date":if(o=a.get(t.name),o=n.isString(o)?e.trim(o):o,""===o)o=null;else if(n.isNull(o));else if(o=o&&o.$date?moment(o.$date):moment(o,"MM/DD/YYYY"),!o.isValid())throw alert('Could not be able to parse this date value for "'+t.name+'" with "'+e.trim(a.get(t.name))+'"'),new Error;a.set(t.name,o)}})}});var d=JSON.stringify(a.toJSON());u.prepend('<input type="hidden" name="'+l+o+'" value="" class="subform_before_submit">'),u.find(':input[name="'+l+o+'"]').val(d)}})},triggerError:function(n){if(this.hasBooleanInput){var a=e('.form-render_booleaninput input[type="hidden"].invalid',n.el);a.each(function(){var n=e(this),a='<span class="text-error">Please answer this question.</span>';n.closest(".form-render_booleaninput").next().html(a).show("slow")})}},isSubformValid:function(){var a=this,t=!0;return n.each(this.subFormLists,function(i){a.validation[i]&&n.each(a.validation[i],function(a,s){if(!n.isObject(a)&&t){var o=e('input.subform_before_submit[name="'+i+'"]').val();switch(s){case"required":"[]"!==o&&o||(t=!1)}}})}),t},bindModelBinder:function(e,n){switch(n.toLowerCase()){default:this.bindings[e]='[name="'+e+'"]'}},unbindModelBinder:function(e,n){switch(n.toLowerCase()){default:delete this.bindings[e]}}})});