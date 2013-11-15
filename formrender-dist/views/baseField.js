define(["jquery","underscore","backbone","bootstrap","events","vm","utils","models/model","modelbinder","validation","views/fields/list","text!data/email.json","text!data/schooles.json","text!templates/fields/html.html","text!templates/fields/label.html","text!templates/fields/text.html","text!templates/fields/password.html","text!templates/fields/telephone.html","text!templates/fields/hidden.html","text!templates/fields/timestamp.html","text!templates/fields/useraccount.html","text!templates/fields/file.html","text!templates/fields/multifiles.html","text!templates/fields/state.html","text!templates/fields/zipcode.html","text!templates/fields/country.html","text!templates/fields/fullname.html","text!templates/fields/address.html","text!templates/fields/textarea.html","text!templates/fields/number.html","text!templates/fields/email.html","text!templates/fields/date.html","text!templates/fields/select.html","text!templates/fields/birthdate.html","text!templates/fields/button.html","text!templates/fields/buttongroup.html","text!templates/fields/list.html","text!templates/fields/uneditableinput.html","text!templates/fields/uneditablefile.html","text!templates/fields/uneditableimage.html","text!templates/fields/buttonclipboard.html","text!templates/subform-layouts/table.html","jquery.expose","jquery.datepicker","jquery.birthdaypicker","bootstrap"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R){return n.View.extend({_modelBinder:undefined,clean:function(){n.Validation.unbind(this),typeof this._modelBinder!="undefined"&&this._modelBinder.unbind()},initialize:function(){var n=this;this._div=0,this._hasUserId=!1,this._hasDate=!1,this._hasBDate=!1,this._hasEmailPicker=!1,this._internalFields=[],this._visibleOn=[],this._multiFiles=[],this._buttonClipboards=[],this._buttonDecision=[],this._ajaxDataCall=[],this._javaUpload=[],this._ajaxSubmit=!0,this._stepDiv=0,this._currentStep=1,this._stepValidated=[],this._modelBinder=new a,this.options.formSchema.validation=this.options.formSchema.validation||{},this.model=new u(t.extend(this.options.formSchema,{is_internal:this.options.internal,render_mode:this.options.mode})),e.isEmptyObject(this.options.formData)||t.each(this.model.attributes,function(e,t){if(typeof e!="object"){var r={};r[t]=n.options.formData.fields[t],n.model.set(r)}}),this.prefixedName={list:"subform_",listdisplayid:"_form_content",collectiondisplayid:"_form_collection"},this.notRenderLabel=["html","list","button","submit","clear","fieldset","fieldsetstart","fieldsetend","step"],this.inputTemplate={html:t.template(p),label:t.template(d),text:t.template(v),password:t.template(m),telephone:t.template(g),hidden:t.template(y),timestamp:t.template(b),useraccount:t.template(w),file:t.template(E),multifiles:t.template(S),state:t.template(x),zipcode:t.template(T),country:t.template(N),fullname:t.template(C),address:t.template(k),textarea:t.template(L),number:t.template(A),email:t.template(O),date:t.template(M),select:t.template(_),birthdate:t.template(D),button:t.template(P),buttongroup:t.template(H),list:t.template(B),uneditableinput:t.template(j),uneditablefile:t.template(F),uneditableimage:t.template(I),buttonclipboard:t.template(q),"subform-table":t.template(R)};var r={submitbutton:"Submit",resetbutton:"Cancel"};this.options.formSchema.formoptions=t.extend(r,this.options.formSchema.formoptions)||r},getFormValidationData:function(e){return this.options.formSchema.validation=this.options.formSchema.validation||{},typeof this.options.formSchema.validation[e]=="undefined"?{}:this.options.formSchema.validation[e]},closeOpenDiv:function(e){e=e||"_div";var t="",n=0,r=this[e];for(;n<r;++n)t+="</div>";return this._div=0,t},render:function(n,r){var i=this,u="",a=[n.name],f=n.type.toLowerCase(),l="";n.lang=this.options.lang,n.attributes=n.attributes||{},n.options=n.options||{},this.options.formSchema.validation=this.options.formSchema.validation||{},this.options.formData=this.options.formData||{};if(!this.options.internal&&n.options.internal)return"";if((f==="button"||f==="submit")&&!n.options.internal&&this.options.internal)return"";switch(f){case"multifiles":this._multiFiles.push(n);var p=this.getFormValidationData(n.name+"[]");typeof this._stepValidated[this._currentStep-2]!="undefined"&&!e.isEmptyObject(p)&&this._stepValidated[this._currentStep-2].push(n.name+"[]"),this.options.mode==="read"&&(f="file");break;case"image":n.attributes.accept="image/*";case"file":(!this.options.internal||typeof n.options.internalcanupdate=="undefined"||!!n.options.internalcanupdate)&&e("form"+this.el).attr("enctype","multipart/form-data");var p=this.getFormValidationData(n.name);p.accept&&(n.attributes.accept=p.accept);if(n.options.javaupload){var d={name:n.name,id:n.name,code:"com.elementit.JavaPowUpload.Manager",archive:"//public.southernnevadahealthdistrict.org/assets/jar/jupload/JavaPowUpload.jar, //public.southernnevadahealthdistrict.org/assets/jar/jupload/skinlf.jar, //public.southernnevadahealthdistrict.org/assets/jar/jupload/commons-httpclient.jar, //public.southernnevadahealthdistrict.org/assets/jar/jupload/commons-compress.jar",width:500,height:350,mayscript:"true",alt:"JavaPowUpload by www.element-it.com"};this._javaUpload.push(d)}break;case"userid":this._hasUserId=!0,n.options.url&&(n.attributes["data-url"]=n.options.url),n.options.data&&(n.attributes["data-url-data"]=JSON.stringify(n.options.data)),n.attributes.placeholder=n.attributes.placeholder||"Valid E-mail as Username",n.attributes["class"]=(n.attributes["class"]||"")+" userid-lookup",f=n.options.render?n.options.render.toLowerCase():"text",f==="select"&&(n.values=[]),n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"span12");break;case"textbox":f="text";case"select":n.options.url&&(n.attributes["data-url"]=n.options.url),n.options.data&&(n.attributes["data-url-data"]=JSON.stringify(n.options.data)),n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"span12");break;case"password":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"span12");break;case"telephone":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"integer telephone span12");break;case"textarea":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"span12");break;case"action":return this._div++,'<div class="form-actions">';case"fieldsetstart":return"<fieldset><legend>"+n.description+"</legend>";case"fieldsetend":return"</fieldset>";case"hr":return"<hr>";case"dateinput":f="date";case"date":if(n.options.render&&n.options.render.toLowerCase()==="select"){f="birthdate",this._hasBDate=!0,n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"birthdaypicker");var p=this.getFormValidationData(n.name),v={id:n.name};n.lang!=="en"&&(v.lang=n.lang),typeof this.options.formData.fields!="undefined"&&(v.defaultdate=this.options.formData.fields[n.name]),n.attributes["data-options"]=JSON.stringify(t.extend(v,p)),typeof this._stepValidated[this._currentStep-2]!="undefined"&&!e.isEmptyObject(p)&&(this._stepValidated[this._currentStep-2].push(n.name+"_birth[month]"),this._stepValidated[this._currentStep-2].push(n.name+"_birth[day]"),this._stepValidated[this._currentStep-2].push(n.name+"_birth[year]"))}else{this._hasDate=!0,n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"datepicker");var p=this.getFormValidationData(n.name);p.maxdate&&(n.attributes["data-maxdate"]=p.maxdate)}break;case"email":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"tolowercase span12"),typeof n.options.autocomplete!="undefined"&&n.options.autocomplete&&(this._hasEmailPicker=!0,n.attributes={},n.attributes["data-provide"]="typeahead",n.attributes.autocomplete="off",n.attributes.style="width:45%;",n.attributes["class"]="not_sending emailpicker_server tolowercase",n.attributes["data-source"]=c.replace(/\n/g,"").replace(/'/g,"&#39"),typeof n.options["default"]!="undefined"&&(n.attributes["data-value"]=n.options["default"]),a.push(n.name+"_username"),a.push(n.name+"_server"));break;case"address":delete n.attributes["class"],delete n.attributes.placeholder,a=[],a.push(n.name+"_address_street"),a.push(n.name+"_address_city"),a.push(n.name+"_address_state"),a.push(n.name+"_address_zip"),a.push(n.name+"_address_country"),typeof r!="undefined"&&typeof this.options.formData!="undefined"?(this.options.formData.fields[n.name+"_address_country"]=s.getCountry(this.options.formData.fields[n.name+"_address_country"]),this.options.formData.fields[n.name+"_address_street"]&&this.options.formData.fields[n.name+"_address_street"].charAt(this.options.formData.fields[n.name+"_address_street"].length-1)!=="."&&(this.options.formData.fields[n.name+"_address_street"]+="."),this.options.formData.fields[n.name+"_address_street"]+="<br>",this.options.formData.fields[n.name+"_address_city"]+=",",this.options.formData.fields[n.name+"_address_state"]+="<br>",this.options.formData.fields[n.name+"_address_zip"]+="<br>"):this.options.mode==="update"&&this.options.formData.fields[n.name+"_address_country"]!=="US"&&(n.default_value_state=this.options.formData.fields[n.name+"_address_state"]);break;case"number":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"natural span12");if(n.options.decimals&&this.options.formData.fields[n.name]){var m=parseFloat(this.options.formData.fields[n.name]/Math.pow(10,parseInt(n.options.decimals)));isNaN(m)||(this.options.formData.fields[n.name]=m.toFixed(2))}typeof n.options.spinner!="undefined"&&n.options.spinner&&(n.attributes["class"]=n.attributes["class"].replace(/ span12/,"","gi"),n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"spinner-input"),this.options.mode==="update"&&this.options.formData.fields[n.name]&&(n.attributes["data-value"]=this.options.formData.fields[n.name]));break;case"fullname":delete n.attributes["class"],delete n.attributes.placeholder,a=[],a.push(n.name+"_fullname_first_name"),(typeof n.options.middlename=="undefined"||n.options.middlename)&&a.push(n.name+"_fullname_middle_name"),a.push(n.name+"_fullname_last_name"),n.options.url&&this._ajaxDataCall.push(n);break;case"clear":f="button",n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-clear-form");break;case"submit":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn"),f="button",n._submit=!0;if(typeof n.url=="undefined")throw"In order to use submit button, must pass the Url value in the formSchema";n.options.appendid&&(n.url=(n.url?n.url:"")+(n.url.indexOf("?")>-1?"&id=":"/")+this.options.formData._id.$oid),e(this.el).attr("action",n.url),typeof n.options.ajaxsubmit!="undefined"&&(this._ajaxSubmit=n.options.ajaxsubmit);break;case"buttonclipboard":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-primary"),this._buttonClipboards.push({name:n.name,values:n.values});break;case"buttondecision":r||(n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-primary"),f="button",this._buttonDecision.push(n));break;case"button":n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn"),n.options.appendid&&(n.url=(n.url?n.url:"")+(n.url.indexOf("?")>-1?"&id=":"/")+this.options.formData._id.$oid);break;case"schooles":f="text",n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"span12"),n.attributes["data-provide"]="typeahead",n.attributes.autocomplete="off",n.attributes["data-source"]=h.replace(/\n/g,"").replace(/'/g,"&#39");break;case"step":if(!("view"in this.options.formSchema&&this.options.formSchema.view==="wizard"))return"";this._stepDiv!==0&&(u+="</div>",this._stepDiv--),typeof this._stepValidated[this._currentStep-1]=="undefined"&&(this._stepValidated[this._currentStep-1]=[]);var g="step-pane"+(this._currentStep===1?" active":"");u+='<div class="'+g+'" id="wizard_step'+this._currentStep+'">',this._stepDiv++,this._currentStep++;break;case"useraccount":n.data_value="",n.options.getvaluefromid&&(n.data_value=e("#"+n.options.getvaluefromid).text());break;case"list":n.attributes.id=this.prefixedName.list+(typeof n.attributes.id!="undefined"?n.attributes.id:n.name),n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"subform-container");var y=typeof this.options.formSchema.validation[n.name]!="undefined"?this.options.formSchema.validation[n.name]:{};this.attachSubFormEvent(n.attributes.id,n,y)}if(f==="button"&&n.options.visibleon){var b=function(t){t.type==="change"&&n.options.visibleon.values.indexOf(e(this).val())>-1?e("#"+n.name,i.el).show("slow"):e("#"+n.name,i.el).hide("slow")};e(this.el).on("change",':input[name="'+n.options.visibleon.name+'"]',b).on("removeVisibleOn",':input[name="'+n.options.visibleon.name+'"]',b)}typeof this._stepValidated[this._currentStep-2]!="undefined"&&f!=="step"&&f!=="list"&&o.checkRequireFields(n,this.options.formSchema.validation)&&t.each(a,function(e){i._stepValidated[i._currentStep-2].push(e)});if(typeof r!="undefined"&&r&&typeof a[0]!="undefined"&&f!=="button"&&f!=="buttonclipboard"){var w="",E="";t.each(a,function(e){typeof i.options.formData.fields[e]!="object"?w+=(typeof i.options.formData.fields[e]!="undefined"?i.options.formData.fields[e]:"")+" ":w=i.options.formData.fields[e]}),typeof w=="string"&&(w=e.trim(w));if(f==="file"||f==="image")f==="image"?(n.attributes.src=(typeof n.attributes.src!="undefined"?n.attributes.src:"/form/getFile/")+i.options.formData.fields[n.name],E=n.attributes.src):(n.attributes.target="_blank",n.attributes["class"]=o.setupClassAttr(n.attributes["class"],"btn btn-primary"),n.attributes.href=(typeof n.attributes.href!="undefined"?n.attributes.href:"/form/getFile/")+i.options.formData.fields[n.name]),delete n.attributes.accept,t.each(n.attributes,function(e,t){l+=" "+t+"='"+e+"'"}),u+=i.inputTemplate["uneditable"+f]({value:w,text:n.description,_attr:l,id:n.name,href:E});else if(f==="list")if(typeof this.options.formData.fields[n.name]!="undefined"&&this.options.formData.fields[n.name].length>0){var S=[],x=new Array(this.options.formData.fields[n.name].length);t.each(n.fields,function(e,r){S.push(e.description),t.each(i.options.formData.fields[n.name],function(t,n){var r;typeof x[n]=="undefined"&&(x[n]=[]);switch(e.type.toLowerCase()){case"timestamp":S[S.length-1]="Time",x[n].push(o.getHumanTime(t[e.name]));break;case"useraccount":S[S.length-1]="User",x[n].push(t[e.name]);break;case"fullname":r=t[e.name+"_fullname_first_name"],typeof t[e.name+"_fullname_middle_name"]!="undefined"&&(r+=" "+t[e.name+"_fullname_middle_name"]),r+=" "+t[e.name+"_fullname_last_name"],x[n].push(r);break;default:x[n].push(t[e.name])}})}),u+=i.inputTemplate["subform-table"]({labels:S,values:x,heading:typeof n.options.readmodedescription=="undefined"?n.description:n.options.readmodedescription})}else u+="";else{var T="";switch(f){case"textarea":case"address":T=" uneditable-input-textarea";break;case"timestamp":w=o.getHumanTime(w)}u+=i.inputTemplate.uneditableinput({value:w,css_class:T,id:n.name})}}else this.options.internal&&typeof n.options.internalcanupdate!="undefined"&&!n.options.internalcanupdate?f="hidden":t.each(n.attributes,function(e,t){l+=" "+t+"='"+e+"'"}),f==="image"&&(f="file"),u+=typeof this.inputTemplate[f]!="undefined"?this.inputTemplate[f](t.extend({_attr:l},n)):"";if(n.options.visibleon){if(!n.options.visibleon.name||!e.isArray(n.options.visibleon.values))throw n.name+".Options.VisibleOn need Name and Values!";this._visibleOn.push(n)}return u},renderLabel:function(e,n,r){n=n||!1,e.attributes=e.attributes||{},e.options=e.options||{};var i=e.type.toLowerCase(),s=typeof r!="undefined"&&r?' class="'+r+'"':"";switch(i){case"buttondecision":return""}return this.inputTemplate.label(t.extend({_cssClass:s,_required:n},e))},renderButton:function(e){var t="";if(e.submitbutton||e.resetbutton)t+='<div class="form-actions">';return e.submitbutton&&!e.subForm?t+='<button type="submit" class="btn btn-primary btn-submit">'+e.submitbutton+"</button>":t+='<button type="button" class="btn btn-primary btn-submit">'+e.submitbutton+"</button>",e.resetbutton&&(t+='<button type="button" class="btn btn-cancel">'+e.resetbutton+"</button>"),t.length>0&&(t+="</div>"),t},checkShowOnMode:function(n,r,i){var s=n.type.toLowerCase();if(n.options.internal!=undefined&&n.options.internal!==this.options.internal)return!1;n.options.internal===!0&&n.name&&s!=="buttonclipboard"&&this._internalFields.push(n.name);if(!this.options.hideButtons||s!=="button"&&s!=="submit"&&s!=="reset"&&s!=="action"){if(this.options.mode==="read"&&!e.isEmptyObject(n.options.visibleon)&&!this.options.formData.fields[n.name]&&s!=="address"&&s!=="buttonclipboard")return!1;r=r||!1,i=i||!1;if(r!=="read"&&n.type.toLowerCase()==="buttonclipboard")return!1;if(r==="read"&&!this.options.internal&&n.options.hideonexternalread)return!1;if(typeof n.options.showonmode!="undefined"&&n.options.showonmode.indexOf(r)===-1)return!1;if(typeof n.options.showonstatus!="undefined"){var o=t.map(n.options.showonstatus,function(e){return e.toLowerCase()});if(i===!1||o.indexOf(i.toLowerCase())===-1)return!1}else if(this.options.internal&&r==="update"&&typeof n.options.internalcanupdate!="undefined"&&!n.options.internalcanupdate)return!1;return!0}return!1},attachSubFormEvent:function(r,i,s){i=t.extend(i,{validation:s});var o=this,u={el:"#"+r+this.prefixedName.listdisplayid,formSchema:i,formId:r},a=t.extend({},n.Events);e(this.el).on("click","#"+r+"_add_btn",u,this.displaySubForm).on(r+".close",this.closeSubForm).on(r+".add",t.extend({formId:r},this),this.addSubformData),this.options.mode==="update"&&typeof this.options.formData.fields[i.name]!="undefined"&&this.options.formData.fields[i.name].length>0&&(a.on(u.formId+".listViewCreated",function(t){e(o.el).trigger(r+".add",[t,o.options.formData.fields[i.name]]),a.off()}),this.displaySubForm({data:u},{},!0,a))},displaySubForm:function(n,r,i,o){r=r||{},i=i||!1,o=o||!1;var u,a=t.clone(n.data);e.isEmptyObject(r)?u="SubFormView"+n.data.formId:(a.model=r,u="SubFormViewEdit"+n.data.formId),e(this).parents("div.actions").fadeOut(),require(["views/fields/list"],function(t){var r=s.create(this,u,t,a),f=e(r.el);i&&f.hide(),r.render(),i||(f.show(),f.addClass("active"),f.expose({closeOnEsc:!1,closeOnClick:!1,color:"#000",zIndex:1025,renderBody:!1})),o&&o.trigger(n.data.formId+".listViewCreated",r)})},closeSubForm:function(t,n){n.$el.fadeOut(),e.mask.close(),e(".actions",n.$el.parent(".subform-container")).fadeIn("slow"),s.remove("SubFormView"+n.options.formId,!0),s.remove("SubFormViewEdit"+n.options.formId,!0)},addSubformData:function(e,r,i){i=i||!1;var o=r.options.formSchema.view===""?"table":r.options.formSchema.view,u=r.options.formSchema.name;if(i){var a=n.Model.extend({});t.each(i,function(t){var n=new a;n.set(t),e.data.model.get(u).add(n)})}else e.data.model.get(u).add(r.model);require(["views/subform-layouts/"+o],function(t){var n={el:"#"+r.options.formId+e.data.prefixedName.collectiondisplayid,formSchema:r.options.formSchema,collection:e.data.model.get(u)},i=s.create(this,"CollectionView"+e.data.formId,t,n);i.render(),e.data.closeSubForm(e,r)})},setupVisibleOn:function(n,r,i){i=i||!1;var s=this,u=n.type.toLowerCase();if(!n.name)throw"In order to use VisibleOn option, we need to pass in the Name";switch(u){case"address":delete this.model.validation[n.name+"_address_street"],delete this.model.validation[n.name+"_address_city"],delete this.model.validation[n.name+"_address_state"],delete this.model.validation[n.name+"_address_zip"],delete this.model.validation[n.name+"_address_country"];break;case"multifiles":delete this.model.validation[n.name+"[]"];break;default:delete this.model.validation[n.name]}e(this.el).on("change",':input[name="'+n.options.visibleon.name+'"]',function(a){var f=e(a.currentTarget),l=i?f.parents(i):f,c,h,p=[];if(t.indexOf(n.options.visibleon.values,f.val())>-1){if(e(".options-visible-on-"+n.name,s.el).length<1){l.after(r),c=l.next(".options-visible-on-"+n.name).fadeIn("slow",function(){e(this).addClass("visible-parent-"+n.options.visibleon.name).attr("data-parent",n.options.visibleon.name);var t=e(".options-visible-on-"+n.options.visibleon.name,s.el);e('[class*="visible-parent"]',s.el).not(".visible-parent-"+n.options.visibleon.name+",.options-visible-on-"+n.options.visibleon.name+",.visible-parent-"+t.attr("data-parent")).remove(),u==="multifiles"?e("#"+n.name+"_multifiles_wrapper",this).trigger("visibleOnRenderComplete"):e(':input[name="'+n.name+'"]',this).trigger("visibleOnRenderComplete")}),h=l.next("div"),h.length===0&&(h=l.parent()),h.find(":input").not('input[type="hidden"]').placeholder();if(u==="address"){var d=n.name+"_address_street";s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d]),p.push(d),d=n.name+"_address_city",s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d]),p.push(d),d=n.name+"_address_state",s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d]),p.push(d),d=n.name+"_address_zip",s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d]),p.push(d),d=n.name+"_address_country",s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d]),p.push(d),n.options.hidecountry&&s.model.set(d,"US")}else s.options.formSchema.validation[n.name]&&u!=="html"?(s.model.validation[n.name]=s.options.formSchema.validation[n.name],p.push(n.name)):s.options.formSchema.validation[n.name+"[]"]&&(s.model.validation[n.name+"[]"]=s.options.formSchema.validation[n.name+"[]"],p.push(n.name+"[]"));s.options.mode==="update"&&p.length>0&&t.each(p,function(t){s.options.formData.fields[t]&&(s.model.set(t,s.options.formData.fields[t]),e(':input[name="'+t+'"]',c).val(s.options.formData.fields[t]))}),u==="userid"&&(o.setupUserIdAjaxCall(e("form.form-render")),!s.model.validation[n.name].pattern&&(!n.options.render||n.options.render.toLowerCase()!=="select")&&(s.model.validation[n.name].pattern="email")),o.setupUrlAjaxCall(e("form.form-render"))}}else{e("#"+n.name,s.el).trigger("removeVisibleOn"),e(".options-visible-on-"+n.name,s.el).remove();if(u==="address"){var d=n.name+"_address_street";s.model.set(d,""),s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d],delete s.model.validation[d]),d=n.name+"_address_city",s.model.set(d,""),s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d],delete s.model.validation[d]),d=n.name+"_address_state",s.model.set(d,""),s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d],delete s.model.validation[d]),d=n.name+"_address_zip",s.model.set(d,""),s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d],delete s.model.validation[d]),d=n.name+"_address_country",s.model.set(d,""),s.options.formSchema.validation[d]&&(s.model.validation[d]=s.options.formSchema.validation[d],delete s.model.validation[d])}else u!=="html"&&(s.model.set(n.name,""),s.model.validation[n.name]?delete s.model.validation[n.name]:s.model.validation[n.name+"[]"]&&delete s.model.validation[n.name+"[]"])}})},setupCopyValuesFrom:function(n){if(!n.options.copyvaluesfrom.name||!n.options.copyvaluesfrom.description)throw"In order to use CopyValuesFrom options, need to have Name and Description";var r=this,i="";return i+='<div class="copy-values-from '+n.options.copyvaluesfrom.name+'">'+this.inputTemplate.buttongroup({description:n.options.copyvaluesfrom.description})+"</div>",e(this.el).on("click",".copy-values-from."+n.options.copyvaluesfrom.name+" .btn-group button",function(i){var s=e(i.currentTarget),u,a,f=[];s.hasClass("btn-yes")?(u=o.getSpecialFieldsName(n.options.copyvaluesfrom.name,n.type),t.each(u,function(t){f.push(e(':input[name="'+t+'"]',r.el).val())}),a=o.getSpecialFieldsName(n.name,n.type),o.setFieldsValues(r.el,r.model,a,f)):(a=o.getSpecialFieldsName(n.name,n.type),o.setFieldsValues(r.el,r.model,a))}),i}})});