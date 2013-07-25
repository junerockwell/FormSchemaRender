define(["jquery","lodash","backbone","vm","utils","events","text!templates/layout.html","jquery.ajaxsubmit","jquery.datepicker","jquery.placeholder"],function(e,t,n,r,i,s,o){var u=n.View.extend({template:t.template(o),el:"#app",initialize:function(){if(typeof this.options.formSchema=="undefined")throw"formSchema is not in the options parameters"},render:function(){var t=this,n="view"in this.options.formSchema?this.options.formSchema.view:"default",s={formSchema:t.options.formSchema,formData:t.options.formData,mode:t.options.mode};this.$el.html(this.template(this.options.formSchema)),typeof this.options.mode!="undefined"&&this.options.mode==="read"?require(["views/readonly/"+n],function(e){var n=r.create(t,"ReadView",e,s);n.render()}):require(["views/form-layouts/"+n],function(n){t.formView=r.create(t,"FormView",n,s),t.formView.render(),t.formView._hasDate&&t.setupDateInput(),t.formView._hasBDate&&t.setupBDateInput(),t.formView._hasEmailPicker&&t.setupEmailInput(),i.setupPlaceHolder(t.el),e("#"+t.options.formSchema.name,t.el).trigger(t.options.formSchema.name+".renderCompleted",t)})},setupBDateInput:function(){i.setupBDateInput(this.el)},getBDateinput:function(e,t){i.getBDateinput(e,t)},setupEmailInput:function(){i.setupEmailInput(this.el)},setupDateInput:function(){i.setupDateInput(this.el)},preventSpace:function(e){i.preventSpace(e)},allowNumber:function(e){i.allowNumber(e)},allowZipCode:function(e){i.allowZipCode(e)},events:{"submit form.form-render":"submitForm","click .form-actions .btn-clear-form":"clearForm","blur :input:not(:button)":"preValidate",'keydown :input[type="email"]':"preventSpace",'keydown :input[type="number"], :input.number':"allowNumber","keydown :input.allowzipcode":"allowZipCode"},submitForm:function(t){var n=e("#"+this.options.formSchema.name,this.el),r=e('.form-actions button[type="submit"]',this.el),i,s;t.preventDefault();if(n.hasClass("form_submitted"))return;n.addClass("form_submitted").removeClass("validation_pass validation_error"),this.getBDateinput(this.el,this.formView.model),e(".not_sending",n).attr("disabled",!0),this.formView.model.isValid(!0)?(n.addClass("validation_pass"),this.options.token!==""&&n.prepend('<input type="hidden" name="token" value="'+this.options.token+'"/>'),n.prepend('<input type="hidden" name="form_name" value="'+this.options.formSchema.name+'"/>'),e("input.subform_before_submit",this.el).remove(),this.formView.model.appendSubFormInput(this.options.formSchema.name),s={beforeSubmit:this.showRequest,success:this.showResponse},n.ajaxSubmit(s),this.formView.options.formSchema.view!=="wizard"&&(i={html:!0,placement:"top",trigger:"manual",title:"Submitting Form, Please wait",content:'<i class="icon-spinner icon-spin icon-large"></i> Sending data...'},r.attr("disabled",!0).popover(i).popover("show").next(".popover").addClass("success"))):(n.addClass("validation_error"),n.removeClass("form_submitted"),e(".not_sending",n).attr("disabled",!1),this.formView.options.formSchema.view!=="wizard"&&(i={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> Validation Error',content:"Please correct the form"},r.attr("disabled",!0).popover(i).popover("show"),window.setTimeout(function(){e(".invalid:first",n).focus(),r.attr("disabled",!1).popover("destroy"),r.next(".popover").remove()},2e3))),n.trigger(this.options.formSchema.name+".validated")},showRequest:function(e,t,n){t.trigger(t.attr("id")+".preSubmit",[e,t,n]);if(t.attr("data-stopSubmit"))return t.removeAttr("data-stopSubmit"),!1},showResponse:function(t,n,r,i){e(':hidden[name="token"], :hidden[name="form_name"]',i).remove(),i.removeClass("form_submitted"),e(".not_sending",i).attr("disabled",!1),i.trigger(i.attr("id")+".postSubmit",[t,n,r,i]),window.setTimeout(function(){e('.form-actions button[type="submit"]',i).attr("disabled",!1).popover("destroy").next(".popover").removeClass("success").remove()},3e3)},preValidate:function(e){i.preValidate(e,this.formView.model)},clearForm:function(){var n=this;t.each(this.formView.model.attributes,function(t,r){typeof t.reset=="function"?n.formView.model.get(r).reset():(e(':input[name="'+r+'"]',n.el).val("").trigger("change"),n.formView.model.set(r,""))})}});return u});