define(["jquery","lodash","backbone","vm","utils","events","text!templates/layout.html","jquery.ajaxsubmit","jquery.datepicker","jquery.placeholder","jquery.lightbox","jquery.expose","bootstrap","jquery.select2","jloader"],function(e,t,n,r,i,s,o){var u=n.View.extend({template:t.template(o),el:"#app",initialize:function(){if(typeof this.options.formSchema=="undefined")throw"formSchema is not in the options parameters"},render:function(){var t=this,n="view"in this.options.formSchema?this.options.formSchema.view:"default",s={formSchema:t.options.formSchema,formData:t.options.formData,mode:t.options.mode,internal:t.options.internal,hideButtons:t.options.hideButtons,lang:t.options.lang};this.$el.html(this.template(this.options.formSchema)),typeof this.options.mode!="undefined"&&this.options.mode==="read"?(e("#"+t.options.formSchema.name,t.el).addClass("read-mode"),require(["views/readonly/"+n],function(e){var n=r.create(t,"ReadView",e,s);n.render(),i.finalReadSetup(n)})):require(["views/form-layouts/"+n],function(n){try{t.formView=r.create(t,"FormView",n,s),t.formView.render()}catch(o){i.renderError(t.$el,o)}t.formView._hasDate&&t.setupDateInput(),t.formView._hasBDate&&t.setupBDateInput(),t.formView._hasEmailPicker&&t.setupEmailInput(),i.setupAddressEvent(t.el,t),i.setupSpinner(t.el),i.setupPlaceHolder(t.el),i.setupFileInput(t.el),i.finalSetup(t.formView),e("#"+t.options.formSchema.name,t.el).trigger(t.options.formSchema.name+".renderCompleted",t);var u=e(t.el).find("form.form-render");t.options.formActionUrl&&u.attr("action",t.options.formActionUrl);var a=e("div.form-actions",u);t.formView._javaUpload.length>0&&t.setupJavaUpload(t.formView._javaUpload),i.setupUrlAjaxCall(e("form.form-render"))})},setupBDateInput:function(){i.setupBDateInput(this.el,this.formView.model)},getBDateinput:function(e,t){i.getBDateinput(e,t)},setupEmailInput:function(){i.setupEmailInput(this.el)},setupDateInput:function(){i.setupDateInput(this.el)},preventSpace:function(e){i.preventSpace(e)},allowNumber:function(e){i.allowNumber(e)},allowRational:function(e){i.allowRational(e)},allowNaturalNumber:function(e){i.allowNaturalNumber(e)},allowZipCode:function(e){i.allowZipCode(e)},formatTelephoneNumber:function(t){var n=e(t.currentTarget),r=n.val(),i="";if(t.type==="keydown"&&t.keyCode>=48&&t.keyCode<=57||t.keyCode>=96&&t.keyCode<=105){switch(r.length){case 0:if(t.keyCode===48||t.keyCode===105){t.preventDefault();return}n.val("("+r);break;case 4:n.val(r+") ");break;case 9:n.val(r+"-")}t.update&&n.val(n.val()+String.fromCharCode(t.keyCode))}else{for(var s=0,o=r.length;s<o;s++)isNaN(parseInt(r[s]))||(i+=r[s]);r="";for(var s=0,o=i.length;s<o;s++){switch(s){case 0:r+="(";break;case 3:r+=") ";break;case 6:r+="-"}r+=i[s]}n.val(r)}},formatZipCodePlusFour:function(e){i.allowZipCodePlusFour(e)},events:{"submit form.form-render":"submitForm","click .form-actions .btn-clear-form":"clearForm","click .form-actions .btn-render-form":"setupForm","blur :input:not(:button)":"preValidate","change :file":"preValidate",'keydown :input[type="email"]':"preventSpace","keydown :input.number":"allowNumber","keydown :input.rational":"allowRational","keydown :input.natural":"allowNaturalNumber","keydown :input.allowzipcode, :input.integer":"allowZipCode","keydown :input.telephone":"formatTelephoneNumber","blur :input.telephone":"formatTelephoneNumber","keydown :input.allowzipcodeplusfour":"formatZipCodePlusFour","blur :input.allowzipcodeplusfour":"formatZipCodePlusFour"},submitForm:function(n){var r=e("#"+this.options.formSchema.name,this.el),s=e('.form-actions button[type="submit"]',this.el),o,u;if(r.hasClass("form_submitted"))return;r.addClass("form_submitted").removeClass("validation_pass validation_error"),this.getBDateinput(this.el,this.formView.model),i.getUserId(this.el,this.formView.model),e(".not_sending",r).attr("disabled",!0),this.formView.model.appendSubFormInput(this.options.formSchema.name,this.formView._internalFields);if(this.formView.model.isValid(!0)&&this.formView.model.isSubformValid()){r.find(":input:hidden[data-value]").each(function(){var t=e(this);t.val()===""&&t.val(t.attr("data-value"))}),r.addClass("validation_pass"),this.options.token!==""&&r.prepend('<input type="hidden" name="token" value="'+this.options.token+'"/>'),this.options.mode==="create"&&r.prepend('<input type="hidden" name="form_name" value="'+this.options.formSchema.name+'"/>'),u={beforeSubmit:this.showRequest,success:this.showResponse},i.resetPlaceHolderValue(this.el);if(this.formView._javaUpload.length){var a=!1,f=!1;t.each(this.formView._javaUpload,function(t){var n=e("#"+t.id+"_java-upload");if(n.hasClass("in")){a=!0;var r=document.getElementById(t.id);if(e("#"+t.id+"_java-upload-applet",n).hasClass("required")&&!r.getFiles().size()){f=!0;return}e(':input[name="'+t.id+'"]').remove(),r.startUpload()}});if(a){f&&(r.addClass("validation_error").removeClass("validation_pass"),r.removeClass("form_submitted"),e(".not_sending",r).attr("disabled",!1),e(':input[name="form_name"]',r).remove(),e(':input[name="token"]',r).remove()),n.preventDefault();return}}i.parseInternalFieldsBeforeSubmit(r,this.formView._internalFields),this.formView._ajaxSubmit?(n.preventDefault(),r.ajaxSubmit(u)):r.trigger(r.attr("id")+".preSubmit");if(this.formView.options.formSchema.view!=="wizard"){var l,c;switch(this.formView.options.lang){case"sp":l="Enviando la forma; por favor espere",c="Cargando Informaci&oacute;n";break;default:l="Submitting form; please wait.",c="Sending data"}o={html:!0,placement:"top",trigger:"manual",title:l,content:'<i class="icon-spinner icon-spin icon-large"></i> '+c+" ..."},s.attr("disabled",!0).popover(o).popover("show").next(".popover").addClass("success")}}else n.preventDefault(),r.addClass("validation_error"),r.removeClass("form_submitted"),e(".not_sending",r).attr("disabled",!1),this.formView.options.formSchema.view!=="wizard"&&(o={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> Validation Error',content:"Please correct the form"},s.attr("disabled",!0).popover(o).popover("show"),window.setTimeout(function(){e(".invalid:first",r).focus(),s.attr("disabled",!1).popover("destroy"),s.next(".popover").remove()},2e3));r.trigger(this.options.formSchema.name+".validated")},showRequest:function(e,t,n){t.trigger(t.attr("id")+".preSubmit",[e,t,n]);if(t.attr("data-stopSubmit"))return t.removeAttr("data-stopSubmit"),!1},showResponse:function(n,r,i,s){var o=t.isString(n)?e.parseJSON(n):n;t.each(o,function(e,n){typeof e=="string"&&(o[n]=t.unescape(e))}),e(':hidden[name="token"], :hidden[name="form_name"]',s).remove(),s.removeClass("form_submitted"),e(".not_sending",s).attr("disabled",!1),s.trigger(s.attr("id")+".postSubmit",[n,o,r,i,s]),window.setTimeout(function(){e('.form-actions button[type="submit"]',s).attr("disabled",!1).popover("destroy").next(".popover").removeClass("success").remove()},3e3)},preValidate:function(e){i.preValidate(e,this.formView.model)},clearForm:function(){var n=this;t.each(this.formView.model.attributes,function(t,r){typeof t.reset=="function"?n.formView.model.get(r).reset():(e(':input[name="'+r+'"]',n.el).val("").trigger("change"),n.formView.model.set(r,""))})},setupForm:function(t){var n=this,i=e(t.currentTarget);return t.preventDefault(),e.getJSON(i.attr("href"),{},function(e,t){t==="success"?require(["views/hiddenForm"],function(t){var i=r.create(n,"FormView",t);i.render(e)}):location.refresh()}),!1},setupJavaUpload:function(n){var r=e(this).get(0),i=this.formView.options.formSchema.jserialnumber?this.formView.options.formSchema.jserialnumber:window.jSerialNumber;if(i==undefined)throw"Please set jSerialNumber to match with your purchase number.";var s={progressbar:"true",boxmessage:"Loading File Uploader Applet ...","Common.SerialNumber":window.jSerialNumber,"Common.UploadMode":"true","Common.UseLiveConnect":"true","Common.ProgressArea.DownloadButton.Visible":"false","Common.SkinLF.ThemepackURL":"//public.southernnevadahealthdistrict.org/assets/assets/jar/jupload/themepack.zip","Common.Language.AutoDetect":"true","Upload.UploadUrl":e(this.formView.el).attr("action"),"Upload.Compress.Enabled":"true","Upload.Compress.ArchiveFileName":"#UNIQUEID#","Upload.Compress.Format":"ZIP","Upload.Compress.Level":"DEFAULT","Upload.HttpUpload.FieldName.FilePath":"SelectedPath_#COUNTER#","Upload.HttpUpload.FormName":this.formView.el.replace("#",""),"Upload.HttpUpload.AddFormValuesToPostFields":"true","Upload.HttpUpload.AddFormValuesToHeaders":"false","Upload.HttpUpload.AddFormValuesToQueryString":"false","Upload.HttpUpload.FieldName.FileBody":"FileBody_#COUNTER#","Upload.HttpUpload.SendBrowserCookie":"true"},o="1.5.1",u=document.write,a="";document.write=function(e){a+=e},t.each(n,function(t){a="",s["Upload.HttpUpload.FieldName.FileBody"]=t.id,deployJava.runApplet(t,s,o);var n=e("#"+t.id+"_java-upload-applet").html(a);r.options.formSchema&&r.options.formSchema.validation&&r.options.formSchema.validation[t.id]&&(r.formView.model.validation[t.id].required&&n.addClass("required"),r.formView.model.validation[t.id]={}),e("#"+t.id+"_accordion").on("click",".accordion-heading",function(){var n=e(this),i=n.next(),s=n.closest(".accordion-group");i.find("applet").length?(r.formView.model.validation[t.id]={},s.next().find("input").attr("disabled",!0)):(i.find("input").attr("disabled",!1),r.options.formSchema&&r.options.formSchema.validation&&r.options.formSchema.validation[t.id]&&(r.formView.model.validation[t.id]=r.options.formSchema.validation[t.id]))})}),document.write=u,window.JavaPowUpload_onUploadFinish=function(){window.jRedirect?location.replace(window.jRedirect):location.reload(!0)}}});return u});