define(["jquery","underscore","backbone","bootstrap","events","vm","models/model","modelbinder","validation","views/fields/list","text!data/email.json","text!data/schooles.json","text!templates/fields/html.html","text!templates/fields/label.html","text!templates/fields/text.html","text!templates/fields/file.html","text!templates/fields/state.html","text!templates/fields/zipcode.html","text!templates/fields/country.html","text!templates/fields/fullname.html","text!templates/fields/address.html","text!templates/fields/textarea.html","text!templates/fields/number.html","text!templates/fields/email.html","text!templates/fields/date.html","text!templates/fields/select.html","text!templates/fields/birthdate.html","text!templates/fields/button.html","text!templates/fields/list.html","text!templates/fields/uneditableinput.html","text!templates/fields/uneditablefile.html","jquery.expose","jquery.datepicker","jquery.birthdaypicker"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O){return n.View.extend({_modelBinder:undefined,clean:function(){n.Validation.unbind(this),typeof this._modelBinder!="undefined"&&this._modelBinder.unbind()},initialize:function(){this._div=0,this._hasDate=!1,this._hasBDate=!1,this._hasEmailPicker=!1,this._stepDiv=0,this._currentStep=1,this._stepValidated=[],this._modelBinder=new u,this.options.formSchema.validation=this.options.formSchema.validation||{},this.model=new o(this.options.formSchema),e.isEmptyObject(this.options.formData)||this.model.set(this.options.formData.fields),this.prefixedName={list:"subform_",listdisplayid:"_form_content",collectiondisplayid:"_form_collection"},this.notRenderLabel=["html","list","button","submit","clear","fieldset","fieldsetstart","fieldsetend","step"],this.inputTemplate={html:t.template(h),label:t.template(p),text:t.template(d),file:t.template(v),state:t.template(m),zipcode:t.template(g),country:t.template(y),fullname:t.template(b),address:t.template(w),textarea:t.template(E),number:t.template(S),email:t.template(x),date:t.template(T),select:t.template(N),birthdate:t.template(C),button:t.template(k),list:t.template(L),uneditableinput:t.template(A),uneditablefile:t.template(O)};var n={submitbutton:"Submit",resetbutton:"Cancel"};this.options.formSchema.formoptions=t.extend(n,this.options.formSchema.formoptions)||n},getFormValidationData:function(e){return this.options.formSchema.validation=this.options.formSchema.validation||{},typeof this.options.formSchema.validation[e]=="undefined"?{}:this.options.formSchema.validation[e]},closeOpenDiv:function(e){e=e||"_div";var t="",n=0,r=this[e];for(;n<r;++n)t+="</div>";return this._div=0,t},render:function(n,r){var i=this,s="",o=[n.name],u=n.type.toLowerCase(),a="";n.attributes=n.attributes||{},n.options=n.options||{},this.options.formSchema.validation=this.options.formSchema.validation||{},this.options.formData=this.options.formData||{};switch(u){case"image":n.attributes.accept="image/*";case"file":e("form"+this.el).attr("enctype","multipart/form-data");var f=this.getFormValidationData(n.name);f.accept&&(n.attributes.accept=f.accept);break;case"birthdate":this._hasBDate=!0,n.attributes["class"]="birthdaypicker "+(typeof n.attributes["class"]!="undefined"?n.attributes["class"]:"");var f=this.getFormValidationData(n.name),h={id:n.name};typeof this.options.formData.fields!="undefined"&&(h.defaultdate=this.options.formData.fields[n.name]),n.attributes["data-options"]=JSON.stringify(t.extend(h,f));break;case"textbox":u="text";break;case"action":return this._div++,'<div class="form-actions">';case"fieldsetstart":return"<fieldset><legend>"+n.description+"</legend>";case"fieldsetend":return"</fieldset>";case"hr":return"<hr>";case"dateinput":u="date";case"date":this._hasDate=!0,n.attributes["class"]="datepicker "+(typeof n.attributes["class"]!="undefined"?n.attributes["class"]:"");var f=this.getFormValidationData(n.name);f.maxdate&&(n.attributes["data-maxdate"]=f.maxdate);break;case"email":typeof n.options.autocomplete!="undefined"&&n.options.autocomplete&&(this._hasEmailPicker=!0,n.attributes={},n.attributes["data-provide"]="typeahead",n.attributes.autocomplete="off",n.attributes["class"]="not_sending emailpicker_server"+(typeof n.attributes["class"]=="undefined"?"":n.attributes["class"]),n.attributes["data-source"]=l.replace(/\n/g,"").replace(/'/g,"&#39"),typeof n.options["default"]!="undefined"&&(n.attributes["data-value"]=n.options["default"]));break;case"address":delete n.attributes["class"],delete n.attributes.placeholder;break;case"fullname":delete n.attributes["class"],delete n.attributes.placeholder,o=[],o.push(n.name+"_fullname_first_name"),o.push(n.name+"_fullname_last_name"),typeof n.options.middlename!="undefined"&&n.options.middlename&&o.push(n.name+"_fullname_middle_name");break;case"clear":u="button",n.attributes["class"]=(typeof n.attributes["class"]!="undefined"?n.attributes["class"]:"btn")+" btn-clear-form";break;case"submit":u="button",n._submit=!0;if(typeof n.url=="undefined")throw"In order to use submit button, must pass the Url value in the formSchema";e(this.el).attr("action",n.url);case"button":n.attributes["class"]=typeof n.attributes["class"]!="undefined"?n.attributes["class"]:"btn";if(typeof n.showonstatus!="undefined"&&typeof this.options.formData.status=="string"&&this.options.formData.status!==n.showonstatus)return"";if(this.options.mode==="create"&&typeof n.showonstatus!="undefined")return"";if(this.options.mode!=="create"&&typeof n.showonstatus=="undefined")return"";break;case"schooles":u="text",n.attributes["data-provide"]="typeahead",n.attributes.autocomplete="off",n.attributes["data-source"]=c.replace(/\n/g,"").replace(/'/g,"&#39");break;case"step":if(!("view"in this.options.formSchema&&this.options.formSchema.view==="wizard"))return"";this._stepDiv!==0&&(s+="</div>",this._stepDiv--),typeof this._stepValidated[this._currentStep-1]=="undefined"&&(this._stepValidated[this._currentStep-1]=[]);var p="step-pane"+(this._currentStep===1?" active":"");s+='<div class="'+p+'" id="wizard_step'+this._currentStep+'">',this._stepDiv++,this._currentStep++;break;case"list":n.attributes.id=this.prefixedName.list+(typeof n.attributes.id!="undefined"?n.attributes.id:n.name),n.attributes["class"]=typeof n.attributes["class"]!="undefined"?n.attributes["class"]:"subform-container";var d=typeof this.options.formSchema.validation[n.name]!="undefined"?this.options.formSchema.validation[n.name]:{};this.attachSubFormEvent(n.attributes.id,n,d)}typeof this._stepValidated[this._currentStep-2]!="undefined"&&u!=="step"&&u!=="list"&&typeof this.options.formSchema.validation[n.name]!="undefined"&&t.each(o,function(e){i._stepValidated[i._currentStep-2].push(e)});if(typeof r!="undefined"&&r&&typeof o[0]!="undefined"&&u!=="button"){var v="";t.each(o,function(e){v+=(typeof i.options.formData.fields[e]!="undefined"?i.options.formData.fields[e]:"")+" "}),v=e.trim(v),u==="file"?(n.attributes["class"]=typeof n.attributes["class"]!="undefined"?n.attributes["class"]:"btn btn-primary",n.attributes.href=(typeof n.attributes.href!="undefined"?n.attributes.href:"/form/getFile/")+i.options.formData.fields[n.name],delete n.attributes.accept,t.each(n.attributes,function(e,t){a+=" "+t+"='"+e+"'"}),s+=i.inputTemplate.uneditablefile({value:v,text:n.description,_attr:a})):u==="list"?s+="":s+=i.inputTemplate.uneditableinput({value:v})}else t.each(n.attributes,function(e,t){a+=" "+t+"='"+e+"'"}),u==="image"&&(u="file"),s+=typeof this.inputTemplate[u]!="undefined"?this.inputTemplate[u](t.extend({_attr:a},n)):"";return s},renderLabel:function(e,n){e.attributes=e.attributes||{},e.options=e.options||{};var r=typeof n!="undefined"&&n?' class="'+n+'"':"";return this.inputTemplate.label(t.extend({_cssClass:r},e))},renderButton:function(e){var t="";if(e.submitbutton||e.resetbutton)t+='<div class="form-actions">';return e.submitbutton&&!e.subForm?t+='<button type="submit" class="btn btn-primary btn-submit">'+e.submitbutton+"</button>":t+='<button type="button" class="btn btn-primary btn-submit">'+e.submitbutton+"</button>",e.resetbutton&&(t+='<button type="button" class="btn btn-cancel">'+e.resetbutton+"</button>"),t.length>0&&(t+="</div>"),t},attachSubFormEvent:function(n,r,i){r=t.extend(r,{validation:i}),e(this.el).on("click","#"+n+"_add_btn",{el:"#"+n+this.prefixedName.listdisplayid,formSchema:r,formId:n},this.displaySubForm).on(n+".close",this.closeSubForm).on(n+".add",this,this.addSubformData)},displaySubForm:function(n,r){r=r||{};var i,o=t.clone(n.data);e.isEmptyObject(r)?i="SubFormView"+n.data.formId:(o.model=r,i="SubFormViewEdit"+n.data.formId),require(["views/fields/list"],function(t){var n=s.create(this,i,t,o);n.render(),e(n.el).addClass("active").expose({closeOnEsc:!1,closeOnClick:!1,color:"#000",zIndex:1e3})}),e(this).parents("div.actions").fadeOut()},closeSubForm:function(t,n){n.$el.fadeOut(),e.mask.close(),e(".actions",n.$el.parent(".subform-container")).fadeIn("slow"),s.remove("SubFormView"+n.options.formId,!0),s.remove("SubFormViewEdit"+n.options.formId,!0)},addSubformData:function(e,t){var n=t.options.formSchema.view===""?"table":t.options.formSchema.view,r=t.options.formSchema.name;e.data.closeSubForm(e,t),e.data.model.get(r).add(t.model),require(["views/subform-layouts/"+n],function(n){var i={el:"#"+t.options.formId+e.data.prefixedName.collectiondisplayid,formSchema:t.options.formSchema,collection:e.data.model.get(r)},o=s.create(this,"CollectionView"+e.data.formId,n,i);o.render()})}})});