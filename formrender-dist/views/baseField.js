define(["jquery","underscore","backbone","bootstrap","events","vm","utils","models/model","modelbinder","validation","views/fields/list","text!data/email.json","text!data/schooles.json","text!templates/fields/html.html","text!templates/fields/label.html","text!templates/fields/text.html","text!templates/fields/telephone.html","text!templates/fields/hidden.html","text!templates/fields/timestamp.html","text!templates/fields/useraccount.html","text!templates/fields/file.html","text!templates/fields/multifiles.html","text!templates/fields/state.html","text!templates/fields/zipcode.html","text!templates/fields/country.html","text!templates/fields/fullname.html","text!templates/fields/address.html","text!templates/fields/textarea.html","text!templates/fields/number.html","text!templates/fields/email.html","text!templates/fields/date.html","text!templates/fields/select.html","text!templates/fields/birthdate.html","text!templates/fields/button.html","text!templates/fields/buttongroup.html","text!templates/fields/list.html","text!templates/fields/uneditableinput.html","text!templates/fields/uneditablefile.html","text!templates/fields/uneditableimage.html","text!templates/fields/buttonclipboard.html","text!templates/subform-layouts/table.html","jquery.expose","jquery.datepicker","jquery.birthdaypicker"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q){return n.View.extend({_modelBinder:undefined,clean:function(){n.Validation.unbind(this),typeof this._modelBinder!="undefined"&&this._modelBinder.unbind()},initialize:function(){var n=this;this._div=0,this._hasDate=!1,this._hasBDate=!1,this._hasEmailPicker=!1,this._internalFields=[],this._visibleOn=[],this._multiFiles=[],this._buttonClipboards=[],this._buttonDecision=[],this._ajaxSubmit=!0,this._stepDiv=0,this._currentStep=1,this._stepValidated=[],this._modelBinder=new a,this.options.formSchema.validation=this.options.formSchema.validation||{},this.model=new u(t.extend(this.options.formSchema,{is_internal:this.options.internal,render_mode:this.options.mode})),e.isEmptyObject(this.options.formData)||t.each(this.model.attributes,function(e,t){if(typeof e!="object"){var r={};r[t]=n.options.formData.fields[t],n.model.set(r)}}),this.prefixedName={list:"subform_",listdisplayid:"_form_content",collectiondisplayid:"_form_collection"},this.notRenderLabel=["html","list","button","submit","clear","fieldset","fieldsetstart","fieldsetend","step"],this.inputTemplate={html:t.template(p),label:t.template(d),text:t.template(v),telephone:t.template(m),hidden:t.template(g),timestamp:t.template(y),useraccount:t.template(b),file:t.template(w),multifiles:t.template(E),state:t.template(S),zipcode:t.template(x),country:t.template(T),fullname:t.template(N),address:t.template(C),textarea:t.template(k),number:t.template(L),email:t.template(A),date:t.template(O),select:t.template(M),birthdate:t.template(_),button:t.template(D),buttongroup:t.template(P),list:t.template(H),uneditableinput:t.template(B),uneditablefile:t.template(j),uneditableimage:t.template(F),buttonclipboard:t.template(I),"subform-table":t.template(q)};var r={submitbutton:"Submit",resetbutton:"Cancel"};this.options.formSchema.formoptions=t.extend(r,this.options.formSchema.formoptions)||r},getFormValidationData:function(e){return this.options.formSchema.validation=this.options.formSchema.validation||{},typeof this.options.formSchema.validation[e]=="undefined"?{}:this.options.formSchema.validation[e]},closeOpenDiv:function(e){e=e||"_div";var t="",n=0,r=this[e];for(;n<r;++n)t+="</div>";return this._div=0,t},render:function(n,r){var i=this,s="",u=[n.name],a=n.type.toLowerCase(),f="";n.attributes=n.attributes||{},n.options=n.options||{},this.options.formSchema.validation=this.options.formSchema.validation||{},this.options.formData=this.options.formData||{};if(!this.options.internal&&n.options.internal)return"";if((a==="button"||a==="submit")&&!n.options.internal&&this.options.internal)return"";switch(a){case"multifiles":this._multiFiles.push(n);var l=this.getFormValidationData(n.name+"[]");typeof this._stepValidated[this._currentStep-2]!="undefined"&&!e.isEmptyObject(l)&&this._stepValidated[this._currentStep-2].push(n.name+"[]"),this.options.mode==="read"&&(a="file");break;case"image":n.attributes.accept="image/*";case"file":(!this.options.internal||typeof n.options.internalcanupdate=="undefined"||!!n.options.internalcanupdate)&&e("form"+this.el).attr("enctype","multipart/form-data");var l=this.getFormValidationData(n.name);l.accept&&(n.attributes.accept=l.accept);break;case"textbox":a="text",n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"span12");break;case"telephone":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"integer telephone span12");break;case"textarea":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"span10");break;case"action":return this._div++,'<div class="form-actions">';case"fieldsetstart":return"<fieldset><legend>"+n.description+"</legend>";case"fieldsetend":return"</fieldset>";case"hr":return"<hr>";case"dateinput":a="date";case"date":if(n.options.render&&n.options.render.toLowerCase()==="select"){a="birthdate",this._hasBDate=!0,n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"birthdaypicker");var l=this.getFormValidationData(n.name),p={id:n.name};typeof this.options.formData.fields!="undefined"&&(p.defaultdate=this.options.formData.fields[n.name]),n.attributes["data-options"]=JSON.stringify(t.extend(p,l)),typeof this._stepValidated[this._currentStep-2]!="undefined"&&!e.isEmptyObject(l)&&(this._stepValidated[this._currentStep-2].push(n.name+"_birth[month]"),this._stepValidated[this._currentStep-2].push(n.name+"_birth[day]"),this._stepValidated[this._currentStep-2].push(n.name+"_birth[year]"))}else{this._hasDate=!0,n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"datepicker");var l=this.getFormValidationData(n.name);l.maxdate&&(n.attributes["data-maxdate"]=l.maxdate)}break;case"email":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"tolowercase span12"),typeof n.options.autocomplete!="undefined"&&n.options.autocomplete&&(this._hasEmailPicker=!0,n.attributes={},n.attributes["data-provide"]="typeahead",n.attributes.autocomplete="off",n.attributes.style="width:45%;",n.attributes["class"]="not_sending emailpicker_server tolowercase",n.attributes["data-source"]=c.replace(/\n/g,"").replace(/'/g,"&#39"),typeof n.options["default"]!="undefined"&&(n.attributes["data-value"]=n.options["default"]),u.push(n.name+"_username"),u.push(n.name+"_server"));break;case"address":delete n.attributes["class"],delete n.attributes.placeholder,u=[],u.push(n.name+"_address_street"),u.push(n.name+"_address_city"),u.push(n.name+"_address_state"),u.push(n.name+"_address_zip"),u.push(n.name+"_address_country"),typeof r!="undefined"&&typeof this.options.formData!="undefined"&&(this.options.formData.fields[n.name+"_address_street"]&&this.options.formData.fields[n.name+"_address_street"].charAt(this.options.formData.fields[n.name+"_address_street"].length-1)!=="."&&(this.options.formData.fields[n.name+"_address_street"]+="."),this.options.formData.fields[n.name+"_address_street"]+="<br>",this.options.formData.fields[n.name+"_address_city"]+=",");break;case"number":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"number span12"),typeof n.options.spinner!="undefined"&&n.options.spinner&&(n.attributes["class"]=n.attributes["class"].replace(/ span12/,"","gi"),n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"spinner-input"),this.options.mode==="update"&&this.options.formData.fields[n.name]&&(n.attributes["data-value"]=this.options.formData.fields[n.name]));break;case"fullname":delete n.attributes["class"],delete n.attributes.placeholder,u=[],u.push(n.name+"_fullname_first_name"),(typeof n.options.middlename=="undefined"||n.options.middlename)&&u.push(n.name+"_fullname_middle_name"),u.push(n.name+"_fullname_last_name");break;case"clear":a="button",n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-clear-form");break;case"submit":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn"),a="button",n._submit=!0;if(typeof n.url=="undefined")throw"In order to use submit button, must pass the Url value in the formSchema";n.options.appendid&&(n.url=(n.url?n.url:"")+(n.url.indexOf("?")>-1?"&id=":"/")+this.options.formData._id.$oid),e(this.el).attr("action",n.url),typeof n.options.ajaxsubmit!="undefined"&&(this._ajaxSubmit=n.options.ajaxsubmit);break;case"buttonclipboard":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-primary"),this._buttonClipboards.push({name:n.name,values:n.values});break;case"buttondecision":r||(n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-primary"),a="button",this._buttonDecision.push(n));break;case"button":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn"),n.options.appendid&&(n.url=(n.url?n.url:"")+(n.url.indexOf("?")>-1?"&id=":"/")+this.options.formData._id.$oid);break;case"schooles":a="text",n.attributes["data-provide"]="typeahead",n.attributes.autocomplete="off",n.attributes["data-source"]=h.replace(/\n/g,"").replace(/'/g,"&#39");break;case"step":if(!("view"in this.options.formSchema&&this.options.formSchema.view==="wizard"))return"";this._stepDiv!==0&&(s+="</div>",this._stepDiv--),typeof this._stepValidated[this._currentStep-1]=="undefined"&&(this._stepValidated[this._currentStep-1]=[]);var d="step-pane"+(this._currentStep===1?" active":"");s+='<div class="'+d+'" id="wizard_step'+this._currentStep+'">',this._stepDiv++,this._currentStep++;break;case"useraccount":n.data_value="",n.options.getvaluefromid&&(n.data_value=e("#"+n.options.getvaluefromid).text());break;case"list":n.attributes.id=this.prefixedName.list+(typeof n.attributes.id!="undefined"?n.attributes.id:n.name),n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"subform-container");var v=typeof this.options.formSchema.validation[n.name]!="undefined"?this.options.formSchema.validation[n.name]:{};this.attachSubFormEvent(n.attributes.id,n,v)}if(a==="button"&&n.options.visibleon){var m=function(t){t.type==="change"&&n.options.visibleon.values.indexOf(e(this).val())>-1?e("#"+n.name,i.el).show("slow"):e("#"+n.name,i.el).hide("slow")};e(this.el).on("change",':input[name="'+n.options.visibleon.name+'"]',m).on("removeVisibleOn",':input[name="'+n.options.visibleon.name+'"]',m)}typeof this._stepValidated[this._currentStep-2]!="undefined"&&a!=="step"&&a!=="list"&&o.checkRequireFields(n,this.options.formSchema.validation)&&t.each(u,function(e){i._stepValidated[i._currentStep-2].push(e)});if(typeof r!="undefined"&&r&&typeof u[0]!="undefined"&&a!=="button"&&a!=="buttonclipboard"){var g="",y="";t.each(u,function(e){g+=(typeof i.options.formData.fields[e]!="undefined"?i.options.formData.fields[e]:"")+" "}),g=e.trim(g);if(a==="file"||a==="image")a==="image"?(n.attributes.src=(typeof n.attributes.src!="undefined"?n.attributes.src:"/form/getFile/")+i.options.formData.fields[n.name],y=n.attributes.src):(n.attributes.target="_blank",n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-primary"),n.attributes.href=(typeof n.attributes.href!="undefined"?n.attributes.href:"/form/getFile/")+i.options.formData.fields[n.name]),delete n.attributes.accept,t.each(n.attributes,function(e,t){f+=" "+t+"='"+e+"'"}),s+=i.inputTemplate["uneditable"+a]({value:g,text:n.description,_attr:f,id:n.name,href:y});else if(a==="list")if(typeof this.options.formData.fields[n.name]!="undefined"&&this.options.formData.fields[n.name].length>0){var b=[],w=new Array(this.options.formData.fields[n.name].length);t.each(n.fields,function(e,r){b.push(e.description),t.each(i.options.formData.fields[n.name],function(t,n){var r;typeof w[n]=="undefined"&&(w[n]=[]);switch(e.type.toLowerCase()){case"timestamp":b[b.length-1]="Time",w[n].push(o.getHumanTime(t[e.name]));break;case"useraccount":b[b.length-1]="User",w[n].push(t[e.name]);break;case"fullname":r=t[e.name+"_fullname_first_name"],typeof t[e.name+"_fullname_middle_name"]!="undefined"&&(r+=" "+t[e.name+"_fullname_middle_name"]),r+=" "+t[e.name+"_fullname_last_name"],w[n].push(r);break;default:w[n].push(t[e.name])}})}),s+=i.inputTemplate["subform-table"]({labels:b,values:w,heading:typeof n.options.readmodedescription=="undefined"?n.description:n.options.readmodedescription})}else s+="";else{var E="";switch(a){case"textarea":case"address":E=" uneditable-input-textarea";break;case"timestamp":g=o.getHumanTime(g)}s+=i.inputTemplate.uneditableinput({value:g,css_class:E,id:n.name})}}else this.options.internal&&typeof n.options.internalcanupdate!="undefined"&&!n.options.internalcanupdate?a="hidden":t.each(n.attributes,function(e,t){f+=" "+t+"='"+e+"'"}),a==="image"&&(a="file"),s+=typeof this.inputTemplate[a]!="undefined"?this.inputTemplate[a](t.extend({_attr:f},n)):"";if(n.options.visibleon){if(!n.options.visibleon.name||!e.isArray(n.options.visibleon.values))throw n.name+".Options.VisibleOn need Name and Values!";this._visibleOn.push(n)}return s},renderLabel:function(e,n,r){n=n||!1,e.attributes=e.attributes||{},e.options=e.options||{};var i=e.type.toLowerCase(),s=typeof r!="undefined"&&r?' class="'+r+'"':"";switch(i){case"buttondecision":return""}return this.inputTemplate.label(t.extend({_cssClass:s,_required:n},e))},renderButton:function(e){var t="";if(e.submitbutton||e.resetbutton)t+='<div class="form-actions">';return e.submitbutton&&!e.subForm?t+='<button type="submit" class="btn btn-primary btn-submit">'+e.submitbutton+"</button>":t+='<button type="button" class="btn btn-primary btn-submit">'+e.submitbutton+"</button>",e.resetbutton&&(t+='<button type="button" class="btn btn-cancel">'+e.resetbutton+"</button>"),t.length>0&&(t+="</div>"),t},checkShowOnMode:function(n,r,i){var s=n.type.toLowerCase();if(n.options.internal&&n.options.internal!==this.options.internal)return!1;n.options.internal===!0&&n.name&&s!=="buttonclipboard"&&this._internalFields.push(n.name);if(!this.options.hideButtons||s!=="button"&&s!=="submit"&&s!=="reset"&&s!=="action"){if(this.options.mode==="read"&&!e.isEmptyObject(n.options.visibleon)&&!this.options.formData.fields[n.name]&&s!=="address"&&s!=="buttonclipboard")return!1;r=r||!1,i=i||!1;if(r!=="read"&&n.type.toLowerCase()==="buttonclipboard")return!1;if(r==="read"&&!this.options.internal&&n.options.hideonexternalread)return!1;if(typeof n.options.showonmode!="undefined"&&n.options.showonmode.indexOf(r)===-1)return!1;if(typeof n.options.showonstatus!="undefined"){var o=t.map(n.options.showonstatus,function(e){return e.toLowerCase()});if(i===!1||o.indexOf(i.toLowerCase())===-1)return!1}else if(this.options.internal&&r==="update"&&typeof n.options.internalcanupdate!="undefined"&&!n.options.internalcanupdate)return!1;return!0}return!1},attachSubFormEvent:function(r,i,s){i=t.extend(i,{validation:s});var o=this,u={el:"#"+r+this.prefixedName.listdisplayid,formSchema:i,formId:r},a=t.extend({},n.Events);e(this.el).on("click","#"+r+"_add_btn",u,this.displaySubForm).on(r+".close",this.closeSubForm).on(r+".add",t.extend({formId:r},this),this.addSubformData),this.options.mode==="update"&&typeof this.options.formData.fields[i.name]!="undefined"&&this.options.formData.fields[i.name].length>0&&(a.on(u.formId+".listViewCreated",function(t){e(o.el).trigger(r+".add",[t,o.options.formData.fields[i.name]]),a.off()}),this.displaySubForm({data:u},{},!0,a))},displaySubForm:function(n,r,i,o){r=r||{},i=i||!1,o=o||!1;var u,a=t.clone(n.data);e.isEmptyObject(r)?u="SubFormView"+n.data.formId:(a.model=r,u="SubFormViewEdit"+n.data.formId),e(this).parents("div.actions").fadeOut(),require(["views/fields/list"],function(t){var r=s.create(this,u,t,a),f=e(r.el);i&&f.hide(),r.render(),i||(f.show(),f.addClass("active"),f.expose({closeOnEsc:!1,closeOnClick:!1,color:"#000",zIndex:1025,renderBody:!1})),o&&o.trigger(n.data.formId+".listViewCreated",r)})},closeSubForm:function(t,n){n.$el.fadeOut(),e.mask.close(),e(".actions",n.$el.parent(".subform-container")).fadeIn("slow"),s.remove("SubFormView"+n.options.formId,!0),s.remove("SubFormViewEdit"+n.options.formId,!0)},addSubformData:function(e,r,i){i=i||!1;var o=r.options.formSchema.view===""?"table":r.options.formSchema.view,u=r.options.formSchema.name;if(i){var a=n.Model.extend({});t.each(i,function(t){var n=new a;n.set(t),e.data.model.get(u).add(n)})}else e.data.model.get(u).add(r.model);require(["views/subform-layouts/"+o],function(t){var n={el:"#"+r.options.formId+e.data.prefixedName.collectiondisplayid,formSchema:r.options.formSchema,collection:e.data.model.get(u)},i=s.create(this,"CollectionView"+e.data.formId,t,n);i.render(),e.data.closeSubForm(e,r)})},setupVisibleOn:function(n,r,i){i=i||!1;var s=this,o=n.type.toLowerCase();if(!n.name)throw"In order to use VisibleOn option, we need to pass in the Name";switch(o){case"address":delete this.model.validation[n.name+"_address_street"],delete this.model.validation[n.name+"_address_city"],delete this.model.validation[n.name+"_address_state"],delete this.model.validation[n.name+"_address_zip"],delete this.model.validation[n.name+"_address_country"];break;case"multifiles":delete this.model.validation[n.name+"[]"];break;default:delete this.model.validation[n.name]}e(this.el).on("change",':input[name="'+n.options.visibleon.name+'"]',function(u){var a=e(u.currentTarget),f=i?a.parents(i):a,l,c=[];if(t.indexOf(n.options.visibleon.values,a.val())>-1){if(e(".options-visible-on-"+n.name,s.el).length<1){f.after(r),l=f.next(".options-visible-on-"+n.name).fadeIn("slow",function(){e(this).addClass("visible-parent-"+n.options.visibleon.name).attr("data-parent",n.options.visibleon.name);var t=e(".options-visible-on-"+n.options.visibleon.name,s.el);e('[class*="visible-parent"]',s.el).not(".visible-parent-"+n.options.visibleon.name+",.options-visible-on-"+n.options.visibleon.name+",.visible-parent-"+t.attr("data-parent")).remove(),o==="multifiles"?e("#"+n.name+"_multifiles_wrapper",this).trigger("visibleOnRenderComplete"):e(':input[name="'+n.name+'"]',this).trigger("visibleOnRenderComplete")});if(o==="address"){var h=n.name+"_address_street";s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h]),c.push(h),h=n.name+"_address_city",s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h]),c.push(h),h=n.name+"_address_state",s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h]),c.push(h),h=n.name+"_address_zip",s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h]),c.push(h),h=n.name+"_address_country",s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h]),c.push(h),n.options.hidecountry&&s.model.set(h,"US")}else s.options.formSchema.validation[n.name]&&o!=="html"?(s.model.validation[n.name]=s.options.formSchema.validation[n.name],c.push(n.name)):s.options.formSchema.validation[n.name+"[]"]&&(s.model.validation[n.name+"[]"]=s.options.formSchema.validation[n.name+"[]"],c.push(n.name+"[]"));s.options.mode==="update"&&c.length>0&&t.each(c,function(t){s.options.formData.fields[t]&&e(':input[name="'+t+'"]',l).val(s.options.formData.fields[t])})}}else{e("#"+n.name,s.el).trigger("removeVisibleOn"),e(".options-visible-on-"+n.name,s.el).remove();if(o==="address"){var h=n.name+"_address_street";s.model.set(h,""),s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h],delete s.model.validation[h]),h=n.name+"_address_city",s.model.set(h,""),s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h],delete s.model.validation[h]),h=n.name+"_address_state",s.model.set(h,""),s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h],delete s.model.validation[h]),h=n.name+"_address_zip",s.model.set(h,""),s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h],delete s.model.validation[h]),h=n.name+"_address_country",s.model.set(h,""),s.options.formSchema.validation[h]&&(s.model.validation[h]=s.options.formSchema.validation[h],delete s.model.validation[h])}else o!=="html"&&(s.model.set(n.name,""),s.model.validation[n.name]?delete s.model.validation[n.name]:s.model.validation[n.name+"[]"]&&delete s.model.validation[n.name+"[]"])}})},setupCopyValuesFrom:function(n){if(!n.options.copyvaluesfrom.name||!n.options.copyvaluesfrom.description)throw"In order to use CopyValuesFrom options, need to have Name and Description";var r=this,i="";return i+='<div class="copy-values-from '+n.options.copyvaluesfrom.name+'">'+this.inputTemplate.buttongroup({description:n.options.copyvaluesfrom.description})+"</div>",e(this.el).on("click",".copy-values-from."+n.options.copyvaluesfrom.name+" .btn-group button",function(i){var s=e(i.currentTarget),u,a,f=[];s.hasClass("btn-yes")?(u=o.getSpecialFieldsName(n.options.copyvaluesfrom.name,n.type),t.each(u,function(t){f.push(e(':input[name="'+t+'"]',r.el).val())}),a=o.getSpecialFieldsName(n.name,n.type),o.setFieldsValues(r.el,r.model,a,f)):(a=o.getSpecialFieldsName(n.name,n.type),o.setFieldsValues(r.el,r.model,a))}),i}})});