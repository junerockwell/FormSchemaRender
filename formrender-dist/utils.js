define(["jquery","underscore","backbone","vm","select2helper","bootstrap","jquery.select2","jquery.spinner","jquery.birthdaypicker","jquery.placeholder","jquery.expose","jquery.zclip","jquery.stupidtable","xdr"],function(e,t,n,r,i){function s(n,r,i){t.each(r,function(t){i.fields[t.name]&&(e(n).on("visibleOnRenderComplete",':input[name="'+t.name+'"]',function(){e(this).val(i.fields[t.name]).trigger("change")}),e(':input[name="'+t.options.visibleon.name+'"]').trigger("change"))})}return{renderError:function(e,t){e.html('<div class="alert alert-danger"><i class="icon-wrench"></i> <strong>Error: Please refresh this page and try again.</strong> <br> '+t+"</div>")},checkBrowser:function(){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var t=parseInt(RegExp.$1);t<7&&(t=7),e("body").addClass("ie"+t)}},setupOldBrowser:function(){Object.keys=Object.keys||function(e){var t=[],n;for(n in e)e.hasOwnProperty(n)&&t.push(n);return t},Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){for(var n=t||0,r=this.length;n<r;n++)if(this[n]===e)return n;return-1})},ucwords:function(e){return(e+"").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()})},parseTemplateString:function(e){var t=/\w+=\{\{(\w|\.)+\}\}/ig;return e.match(t)},parseTemplateStringGet:function(e){var t=/\w+=(\w|\.)+/ig;return e.match(t)},checkRequireFields:function(e,t){var n;switch(e.type.toLowerCase()){case"multifiles":n=e.name+"[]";if(typeof t[n]!="undefined"&&t[n].required)return!0;return!1;case"address":n=e.name+"_address_street";if(typeof t[n]!="undefined"&&t[n].required)return!0;n=e.name+"_address_city";if(typeof t[n]!="undefined"&&t[n].required)return!0;n=e.name+"_address_state";if(typeof t[n]!="undefined"&&t[n].required)return!0;n=e.name+"_address_zip";if(typeof t[n]!="undefined"&&t[n].required)return!0;n=e.name+"_address_country";if(typeof t[n]!="undefined"&&t[n].required)return!0;return!1;case"fullname":n=e.name+"_fullname_middle_name";if(typeof t[n]!="undefined"&&t[n].required)return!0;n=e.name+"_fullname_first_name";if(typeof t[n]!="undefined"&&t[n].required)return!0;n=e.name+"_fullname_last_name";if(typeof t[n]!="undefined"&&t[n].required)return!0;return!1}return typeof t[e.name]!="undefined"&&t[e.name].required?!0:!1},preValidate:function(t,n){var r=e(t.currentTarget),i=r.attr("name"),s=r.is(":file"),o;o=s?r.val():e.trim(r.val()),s||(r.hasClass("tolowercase")&&(o=o.toLowerCase(),o=o.replace(/^([0-9]\w+)|\s+([0-9]\w+)/g,function(e){return e.toUpperCase()}),o=o.replace(/^(us\s)|\s+(us)\s/gi,function(e){return e.toUpperCase()})),r.hasClass("toucwords")?o=this.ucwords(o):r.hasClass("touppercase")&&o.toUpperCase&&(o=o.toUpperCase()),r.hasClass("allowedonespace")&&o.replace&&(o=o.replace(/ +(?= )/g,"")),r.val(o).trigger("change")),n.set(i,o),n.isValid(i,o)?r.removeClass("invalid"):r.addClass("invalid")},setupPlaceHolder:function(t){e("input, textarea",t).placeholder()},setupFileInput:function(t){e(":file",t).trigger("change")},setupEmailInput:function(t){e(".emailpicker",t).each(function(){var t=e(".emailpicker_server",this),n=e(".emailpicker_username",this),r=e(':input[type="hidden"]',this),i=e(".not_sending",this);typeof t.attr("data-value")!="undefined"&&t.attr("data-value")&&t.val(t.attr("data-value")).trigger("change");if(r.val()!==""){var s=r.val().split("@");s.length===2&&(n.val(s[0]).trigger("change"),t.val(s[1]).trigger("change"))}e(".emailpicker_server, .emailpicker_username",this).on("change",this,function(i){n.val()!==""&&t.val()!==""?r.val(e.trim(n.val()+"@"+t.val())).trigger("change"):r.val("").trigger("change")}).on("keydown",function(e){if(e.keyCode===32)return e.preventDefault(),!1})})},setupBDateInput:function(t,n){e(".birthdaypicker",t).each(function(){e(this).birthdaypicker(e(this).attr("data-options"));var t=e(':input[type="hidden"]',this),r,i,s,o,u=t.val();u!==""&&n.get(t.attr("name"))!==""&&(r=u.split("/"),r.length===3&&(r[0][0]==="0"&&(r[0]=r[0].substr(1)),r[1][0]==="0"&&(r[1]=r[1].substr(1)),i=e(".birth-month",this).val(r[0]),s=e(".birth-day",this).val(r[1]),o=e(".birth-year",this).val(r[2]),n.set(i.attr("name"),r[0]),n.set(s.attr("name"),r[1]),n.set(o.attr("name"),r[2])))})},setHiddenField:function(t){e(':hidden[data-value!=""]',t).each(function(){var t=e(this);typeof t.attr("data-value")!="undefined"&&t.attr("data-value")&&t.val(t.attr("data-value")).trigger("change")})},getBDateinput:function(t,n){e("fieldset.birthday-picker",t).each(function(){var t=/NaN/i,r=e(':input[type="hidden"]',this),i=e(".not_sending.birth-day",this),s=e(".not_sending.birth-month",this),o=e(".not_sending.birth-year",this),u=parseInt(i.val()),a=parseInt(s.val()),f=parseInt(o.val()),l=!1,c;String(u).match(t)&&(i.val(""),l=!0),String(a).match(t)&&(s.val(""),l=!0),String(f).match(t)&&(o.val(""),l=!0),l?r.val(""):(a<10&&(a+=0+a),u<10&&(u+=0+u),c=a+"/"+u+"/"+f,r.val()),n.set(r.attr("name"),r.val())})},getUserId:function(t,n){var r=e(".select2-offscreen",t);r.each(function(){var t=e(this);n.set(t.attr("name"),t.val()).trigger("change")})},getDefaultValues:function(t){e(".has-default-val",t).each(function(){var t=e(this);if(t.is(":disabled"))return;t.val()===""?t.trigger("change"):t.hasClass("data-clean")&&t.trigger("change").removeClass("data-clean")})},setupDateInput:function(t){e(".datepicker",t).each(function(){var t={},n,r,i=e(this);if(i.attr("data-maxdate"))switch(i.attr("data-maxdate").toLowerCase()){case"today":r=new Date,n=new Date(r.getFullYear(),r.getMonth(),r.getDate(),0,0,0,0),t.onRender=function(e){return e.valueOf()>n.valueOf()?"disabled":""}}if(i.attr("data-mindate"))switch(i.attr("data-mindate").toLowerCase()){case"today":r=new Date,n=new Date(r.getFullYear(),r.getMonth(),r.getDate(),0,0,0,0),t.onRender=function(e){return e.valueOf()<n.valueOf()?"disabled":""}}i.datepicker(t).on("changeDate",function(t){var n=e(t.currentTarget).removeClass("invalid").trigger("change");n.datepicker("hide")}).on("click",function(t){e("div.datepicker.dropdown-menu").css("display","none"),e(t.currentTarget).datepicker("show")})})},setupSpinner:function(t,n){n=n||null,e(".spinner",t).each(function(){var t=e(":input.spinner-input",this),r=t.attr("data-default-value")!==undefined?t.attr("data-default-value"):1,i=t.val()!==""?t.val():r;n&&n==="create"&&i==="0"&&(i="1");var s={value:parseInt(i,10),min:r};e(this).spinner(s)})},preventSpace:function(e){if(e.keyCode===32)return e.preventDefault(),!1},allowNumber:function(t){var n=e(t.currentTarget).val();if(t.keyCode===8||t.keyCode===37||t.keyCode===39||t.keyCode===46||t.keyCode===9)return!0;(t.shiftKey||(t.keyCode!==46&&t.keyCode!==190&&t.keyCode!==110||n.indexOf(".")!==-1)&&(t.keyCode<48||t.keyCode>57&&t.keyCode<96||t.keyCode>105))&&t.preventDefault()},allowRational:function(t){var n=e(t.currentTarget).val();if(t.keyCode===8||t.keyCode===37||t.keyCode===39||t.keyCode===46||t.keyCode===9)return!0;(t.keyCode!==45&&t.keyCode!==109&&t.keyCode!==189||n!=="")&&(t.shiftKey||(t.keyCode!==46&&t.keyCode!==190&&t.keyCode!==110||n.indexOf(".")!==-1)&&(t.keyCode<48||t.keyCode>57&&t.keyCode<96||t.keyCode>105))&&t.preventDefault()},allowNaturalNumber:function(t){if(t.keyCode===8||t.keyCode===37||t.keyCode===39||t.keyCode===46||t.keyCode===9)return!0;(t.shiftKey||t.keyCode!==46&&t.keyCode!==110&&(t.keyCode<48||t.keyCode>57&&t.keyCode<96||t.keyCode>105)||t.keyCode===48&&e(t.currentTarget).val().length===0)&&t.preventDefault()},allowZipCode:function(e){if(e.keyCode===8||e.keyCode===37||e.keyCode===39||e.keyCode===46||e.keyCode===9)return!0;(e.shiftKey||e.keyCode<48||e.keyCode>57&&e.keyCode<96||e.keyCode>105)&&e.preventDefault()},allowZipCodePlusFour:function(t){var n=e(t.target),r=n.val(),i="";if(t.type==="keydown"&&t.keyCode>=48&&t.keyCode<=57||t.keyCode>=96&&t.keyCode<=105){switch(r.length){case 0:if(t.keyCode===48||t.keyCode===105){t.preventDefault();return}break;case 5:n.val(r+"-")}t.update&&n.val(n.val()+String.fromCharCode(t.keyCode))}else{for(var s=0,o=r.length;s<o;s++)isNaN(parseInt(r[s]))||(i+=r[s]);r="";for(var s=0,o=i.length;s<o;s++){switch(s){case 5:o>6&&(r+="-")}r+=i[s]}n.val(r)}},getHumanTime:function(e){var t=typeof e!="object"?new Date(e*1e3):new Date(e.$date),n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=t.getFullYear(),i=n[t.getMonth()],s=t.getDate(),o=t.getHours(),u=t.getMinutes(),a=t.getSeconds(),f="AM";return o>=12&&(o-=12,o===0&&(o=12),f="PM"),o<10&&(o="0"+o),u<10&&(u="0"+u),a<10&&(a="0"+a),i+" "+s+", "+r+" "+o+":"+u+":"+a+" "+f},getSpecialFieldsName:function(e,t){var n=[];switch(t.toLowerCase()){case"fullname":n.push(e+"_fullname_first_name"),n.push(e+"_fullname_middle_name"),n.push(e+"_fullname_last_name");break;case"address":n.push(e+"_address_street"),n.push(e+"_address_city"),n.push(e+"_address_state"),n.push(e+"_address_zip"),n.push(e+"_address_country");break;default:n.push(e)}return n},setFieldsValues:function(n,r,i,s){s=s||!1,t.each(i,function(t,i){var o=s&&s[i]?s[i]:"",u=e(':input[name="'+t+'"]',n).val(o).trigger("change");r.set(t,o),r.isValid(t)&&u.removeClass("invalid")})},setupClassAttr:function(e,t){e=e||!1,t=t||"",t.toLowerCase();if(e){e=e.toLowerCase();var n=new RegExp(t,"i");return n.test(e)?e:e+" "+t}return t},finalSetup:function(n){var i=this,o=e("select.has-default-val",n.el),u=e(n.el);n.options.mode==="update"&&n._visibleOn.length>0&&n.options.formData&&s(n.el,n._visibleOn,n.options.formData),n.options.mode==="create"&&o.length>0&&o.each(function(){var t=e('option[selected=""],option[selected="selected"]',this);t.length>0&&t.val()!==""?e(this).val(t.val()):e(this).hasClass("us-state")?e(this).val("NV"):e(this).hasClass("us-country")&&e(this).val("US")}),n._multiFiles.length>0&&t.each(n._multiFiles,function(e){require(["views/file-upload/multifiles"],function(t){var s=r.create(i,"MultiFilesView"+e.name,t,{field:e,name:n.el,model:n.model,validation:n.options.formSchema.validation});s.render()})}),e("a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]").each(function(){var t=e(this);e("<img>",{src:t.attr("href"),error:function(){t.hide(),t.next(".btn").show()}})}),n._ajaxDataCall.length>0&&this.setupAjaxCall(n,u),n._hasUserId&&this.setupUserIdAjaxCall(u),n._hasBooleanInput&&this.setupBooleanInput(u,n),n._hasRadioBtnGroup&&(this.setupRadioBtnGroup(u),this.setupRadioBtnGroupValue(u)),(n._hasSelectAllCheckBox||n._hasClearAllCheckBox)&&this.setupCheckBoxSelectAndClear(u),n._hasOtherTextBox&&this.setupCheckBoxOtherTextBox(u),n._radioFieldName.length&&this.setupRadioButtonsValue(n),n._buttonDecision.length>0&&t.each(n._buttonDecision,function(s){var o=e("a#"+s.name,n.el),a='<input type="hidden" name="'+s.name+'" id="'+s.name+'_btn_condition"/>';if(!s.url||!s.data)throw"ButtonDecision require Url and Data options!";n.options.mode==="update"&&(o.after(a),n.options.formData.fields[s.name]&&o.next('input[type="hidden"]').val(n.options.formData.fields[s.name]).trigger("change"));if(n.options.internal===!0){var f=o.parents(".control-group");return f.length>0?f.hide():o.hide(),!0}o.click(function(o){o.preventDefault();var f=e(o.currentTarget);if(f.attr("disabled"))return!1;var l=s.url+"?",c={},h=!1,p,d=[],v=s.options.datacanempty?s.options.datacanempty:[],m=s.options.events||function(t){var o=e("#"+s.name+"_btn_condition",u);if(t.status&&t.status==="error")return f.attr("disabled",!1).popover("destroy"),f.next(".popover").remove(),p={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> Error',content:t.error_message},f.attr("disabled",!0).popover(p).popover("show"),window.setTimeout(function(){f.attr("disabled",!1).popover("destroy"),f.next(".popover").remove()},3e3),!1;if(!t.value)throw'Result JSON must have "value" key';o.length===0&&f.after(a),s.options.renderresult&&t.data?(n.model.set(s.name,""),require(["views/subform-layouts/buttondecision"],function(e){var o=r.create(i,s.name+"View",e,{model:n.model,el:f,name:s.name});o.render(t.data)})):(f.parent().find("div.btn-decision-data-wrapper").remove(),n.model.set(s.name,t.value)),window.setTimeout(function(){f.attr("disabled",!1).popover("destroy"),f.next(".popover").remove()},1e3)};t.each(s.data,function(e,r){if(typeof e!="string"){typeof h=="boolean"&&(h=[]);var s;t.each(e,function(e,t){s=i.setUpButtonDecision(e,t,c,n.el,v,d)}),h.push(s)}else h=i.setUpButtonDecision(e,r,c,n.el,v)}),typeof h!="boolean"&&h.indexOf(!1)>-1&&(h=!1);if(h)return p={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> Error',content:"Please correct the form"},f.attr("disabled",!0).popover(p).popover("show"),window.setTimeout(function(){f.attr("disabled",!1).popover("destroy"),f.next(".popover").remove()},2e3),!1;t.each(d,function(e){e.removeClass("invalid")}),l+=e.param(c);var g,y;switch(n.options.lang){case"sp":g="Por Favor Espere",y="Bajando Informaci&oacute;n";break;default:g="Please wait",y="Loading data"}p={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-time"></i> '+g+".",content:'<i class="icon-spinner icon-spin icon-large"></i> '+y+" ..."},f.attr("disabled",!0).popover(p).popover("show"),e.getJSON(l,m)})})},isRenderVisibleOn:function(e,n,r){if(n.options.visibleon&&r!=="html"){var i=n.options.visibleon.name;i.match(/\[\]$/gi)&&(i=i.substr(0,i.length-2));if(t.isArray(e.options.formData.fields[i])){var s=!1;t.each(e.options.formData.fields[i],function(e){if(s)return;s=n.options.visibleon.values.indexOf(e)!==-1});if(!s)return!1}else{var o;e._lookupValues&&e._lookupValues[i]?o=e._lookupValues[i].value:o=e.options.formData.fields[i];if(n.options.visibleon.values.indexOf(o)===-1)return!1}}return!0},finalReadSetup:function(n){var r=e(n.el);n._buttonClipboards.length>0&&t.each(n._buttonClipboards,function(n){e("button#"+n.name).zclip({path:"//public.southernnevadahealthdistrict.org/assets/js/apps/formrender/libs/copy/ZeroClipboard.swf",copy:function(){var r="";return t.each(n.values,function(t){r+=e("#"+t).text()+"\r\n"}),r}})}),e("a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]").each(function(){var t=e(this);e("<img>",{src:t.attr("href"),error:function(){t.hide(),t.next(".btn").show()}})});var i=e('[data-popover-confirm^="{"]',n.el);i.length&&(r.on("click",".btn-confirmed",function(t){t.preventDefault();var n=e(this);_yes=n.attr("data-href")||!1;if(!_yes){i.each(function(t){e(this).popover("hide")});return}i.each(function(t){e(this).popover("destroy")}),window.location=_yes}),i.each(function(t){var n=e(this),r=e.parseJSON(n.attr("data-popover-confirm"));n.popover(r).click(function(n){n.preventDefault(),i.each(function(n){if(n===t)return;e(this).popover("hide")})})})),r.on("click",".btn-auto-refresh",function(t){var n=e(t.target).attr("data-refresh-delay");t.stopPropagation(),setTimeout(function(){location.reload()},n)});var s=e("table.stupidtable").stupidtable();s.length&&s.on("aftertablesort",function(t,n){var r=e(this).find("th");r.find(".dir-icon").remove();var i=n.direction==="asc"?"icon-arrow-up":"icon-arrow-down";r.eq(n.column).append('<i class="dir-icon '+i+'" style="position:relative; left: 10px; top: -3px;"></i>')}),e(".select-tags").each(function(){var t=e(this),n=0;t.find("li").each(function(){var t=e(this),r=t.width();r>n&&(n=r)}).width(n)})},isRenderReadMode:function(e,n){var r=n.type.toLowerCase();if(n.options.internal&&n.options.internal!==e.options.internal)return!1;if(r==="buttonclipboard")return!0;if(e.options.formData.fields[n.name]==="")return!1;if(r==="fullname"){var i=this.getSpecialFieldsName(n.name,n.type),s=!1;return t.each(i,function(t){!s&&e.options.formData.fields[t]&&e.options.formData.fields[t]!==""&&(s=!0)}),s}if(typeof e.options.formData.fields[n.name]=="undefined")switch(r){case"fieldsetstart":case"fieldsetend":case"html":case"action":case"submit":case"clear":case"address":break;case"button":var o=n.description.toLowerCase();if(e.options.internal&&e.options.mode==="read"&&o==="delete"&&e.options.formSchema.deleteenabled){if(!e.options.formData.createddate.$date)throw'In order to used "DeleteEnabled", form data must have "CreatedDate".';if(e.options.formSchema.deleteenabled.fieldexists){var u=e.options.formSchema.deleteenabled.fieldexists;if(!e.options.formData.fields[u])return!1}if(e.options.formSchema.deleteenabled.afterxdays){var a=new Date,f=new Date(e.options.formData.createddate.$date),l=this.calculateDateDiffByDays(a,f);if(l<e.options.formSchema.deleteenabled.afterxdays)return!1}}break;default:return!1}return!0},resetPlaceHolderValue:function(t){_isSetting=e(":input.placeholder",t),_isSetting.each(function(){var t=e(this);t.attr("placeholder")===t.val()&&t.val("")})},createHiddenForm:function(e){require(["views/hiddenForm"],function(t){var n=r.create({},"FormView",t);n.render(e)})},setupAjaxCall:function(n,r){t.each(n._ajaxDataCall,function(n){var i=n.type.toLowerCase(),s=[],o={};if(typeof n.options.data=="undefined")throw"In order to use ajax call, we need Options.Data.";t.each(n.options.data,function(e){t.each(e,function(e){o[e]=""})});switch(i){case"fullname":s.push(n.name+"_fullname_first_name"),s.push(n.name+"_fullname_middle_name"),s.push(n.name+"_fullname_last_name");break;default:s.push(n.name)}t.each(s,function(i){r.on("change",':input[name="'+i+'"]',function(r){var s=e(this),u=s.val(),a=!1;u!==""&&(o[i]=u),t.each(o,function(e,t){e===""&&(a=!0)});if(!a){var f={},l=n.options.url+"?";t.each(n.options.data,function(e){t.each(e,function(e,t){f[t]=o[e]})}),e.getJSON(l+e.param(f),function(n){n.data&&t.each(n.data,function(t,n){if(typeof o[n]=="undefined"){var r=e(':input[name="'+n+'"]').val(t).trigger("change"),i;if(r.attr("type")==="hidden"){i=r.parent(".emailpicker");if(i.length>0){var s=t.split("@");e(":input.not_sending",i).each(function(t,n){e(n).val(s[t])})}}}})})}})})})},setUpButtonDecision:function(n,r,i,s,o,u){o=o||[],u=u||!1;var a=e("#"+n),f=a.parent(".birthday-picker"),l,c=!1,h;f.length>0&&(l=e(".not_sending",f).trigger("change"));var p=a.val();if(p!==""&&p.search(/NaN/)===-1||o.indexOf(r)>-1)i[r]=p;else{c=!0,h=e(':input[name="'+n+'"]',s).addClass("invalid"),u&&u.push(h);if(f.length>0){var d=p.split("/");t.each(d,function(t,n){t==="NaN"&&(h=e(l[n]).addClass("invalid"),u&&u.push(h))})}}return c},setupUrlAjaxCall:function(i,s,o){s=s||null,o=o||null;var u=s?s:e(":input[data-url]"),a=this;if(u.length===0||!u.attr("data-url"))return;u.each(function(){var s=e(this),f=s.attr("data-url"),l=a.parseTemplateString(f);if(l){var c=a.parseTemplateStringGet(f);if(c){var h={};t.each(c,function(e){var t=e.split("=");if(t.length!==2)return;h[t[0]]=t[1]})}if(!s.select2)throw'Error: select2 is not yet loaded. Please refresh this page again! (Setup "'+s.attr("id")+'"")';if(o){var p=o.get(s.attr("name"));p&&p!==""&&s.attr("data-select-value",p)}var d='<input type="hidden" name="'+s.attr("name")+'" id="'+s.attr("id")+'" class="'+s.attr("class")+' has-select2-dynamic" />',v=s.attr("data-select-key-value"),m=s.attr("data-select-key-text"),g=s.attr("data-select-value");s.replaceWith(d),s=e(':input[name="'+s.attr("name")+'"]'),g&&s.val(g);var y={url:f.match(/^(\w|\.|\/|:)+\(?/ig).shift(),data:function(n,r){var i=h||{};return t.each(l,function(t){var r=t.split("="),s=r.pop().replace(/(\{\{|\}\})/ig,""),o;switch(s){case"this":o=n;break;default:var u=e(':input[name="'+s+'"]');o=u.val()}i[r]=o}),i},results:function(e,n){if(v||m){var r=[];t.each(e,function(e){var n={};v&&m?(n.id=e[v],n.text=e[m]):v?(n.id=e[v],n.text=e.text):m&&(n.id=e.id,n.text=e[m]),t.isEmpty(n)||(s.hasClass("tolowercase")&&n.id&&n.text&&n.id.toLowerCase&&n.text.toLowerCase&&(n.id=n.id.toLowerCase()),r.push(n))}),e=r}return{more:!1,results:e}}},b={placeholder:"--- Please Select ---",minimumInputLength:3,initSelection:function(t,n){g&&e.ajax({url:y.url,data:y.data(g),success:function(e,t,r){if(e.length===1){var i=e.pop(),s={};v&&m?(s.id=i[v],s.text=i[m]):v?(s.id=i[v],s.text=i.text):m&&(s.id=i.id,s.text=i[m]),n(s)}else n({id:g,text:g})},error:function(e,t,r){n({id:g,text:g})}})},ajax:y};s.select2(b)}else e.ajax({url:f,dataType:"json",success:function(o,f){if(f==="success"){var l='<option value="">--- Please Select ---</option>',c=u.prop("type"),h=[];t.each(o,function(t){switch(c){case"select-one":l+='<option value="'+t+'">'+t+"</option>",s.find("option").remove(),s.append(l),s.select2({containerCssClass:"span12"}),e("#s2id_"+s.attr("id")+" .select2-drop",i).hide();break;default:h.push(t[s.attr("id")])}});if(h.length){s.attr({autocomplete:"off"}),s.typeahead({minLength:3,source:h});var p=function(u){var f=s.val(),l=t.find(o,function(e){if(f===e[s.attr("id")])return!0}),c=!0;l&&t.each(l,function(o,u){if(o==="")return;if(typeof o=="object"){if(o.length){var f;t.some(o[0],function(e,t){return f=t.split("_").shift(),!0}),e("#subform_"+f,i).trigger("subform_"+f+".ajaxUpdate",[o])}else if(o.data&&o.view&&o.title){var f;t.some(o.data[0],function(e,t){return f=t.split("_").shift(),!0}),c=!1,require(["views/"+o.view+"AjaxView"],function(e){var t={$form:i,collection:new n.Collection(o.data),id:u+"_AjaxView",$input:s,input_callback:p,title:o.title,listName:f},l=r.create(a,"AjaxView",e,t);l.render()})}}else{var l=e(':input[name="'+u+'"]',i);l&&l.val(o).trigger("change")}}),c&&s.one("change",p)};s.one("change",p)}s.trigger("dataloaded")}},error:function(e,t,n){alert('Error: when trying to request AJAX data to "'+f+'" for "'+s.attr("id")+'".')}})})},setupSelect2:function(t){e(t.el+" .selecttwo-render").each(function(){var n=e(this);n.hasClass("tags")&&i.renderTags(n,t)})},setupCheckBoxSelectAndClear:function(t){t.on("click",".checkbox-container button",function(t){t.preventDefault();var n=e(t.target),r=n.closest(".checkbox-container"),i=r.find("input:checkbox");n.hasClass("btn-primary")?(i.prop("checked",!0),i.filter(".checkbox-other").click().prop("checked",!0)):(i.prop("checked",!1),i.filter(".checkbox-other").click().prop("checked",!1))})},setupCheckBoxOtherTextBox:function(t){t.on("click",'.checkbox-container input[type="checkbox"].checkbox-other',function(t){var n=e(t.target),r=n.parent().next(".other-textbox");n.is(":checked")?r.removeClass("not_sending").show("slow"):r.addClass("not_sending").hide("slow")})},setupBooleanInput:function(t,n){t.on("click",".form-render_booleaninput button",function(t){var n=e(this),r=n.attr("data-value"),i=n.attr("data-id"),s;e("#"+i,n.parent()).removeClass("invalid").val(r).trigger("change"),s='<span class="text-'+(r==="true"?"success":"error")+'">'+n.html()+"<span>",n.parent().next().html(s).show("slow")});var r=e('.form-render_booleaninput input[type="hidden"]',t);r.each(function(){var t=e(this),n=t.val();if(n==="")return;switch(n){case"true":t.parent().find("button.btn-yes").click();break;case"false":t.parent().find("button.btn-no").click()}})},setupRadioBtnGroup:function(t){t.on("click",".radio-container button",function(t){t.preventDefault();var n=e(t.target),r=n.attr("value"),i=n.closest(".radio-container"),s=i.find('input[type="hidden"]');s.val(r).trigger("change"),i.find(".radio-value-render").html(r).show("slow")});var n=t.find(".radio-container");n.each(function(){var t=e(this),n=t.find('input[type="hidden"]'),r=e.trim(n.val());if(r==="")return;t.find('button[value="'+r+'"]').trigger("click")})},setupRadioBtnGroupValue:function(t){var n=e(".radio-container input.has-default-val",t);n.each(function(){var t=e(this),n=t.closest(".radio-container").find('button[value="'+t.val()+'"]');n?n.addClass("active"):t.val(""),t.removeClass("has-default-val")})},setupUserIdAjaxCall:function(n){var r="/user?$filter=Username eq ",i=e(":input.userid-lookup",n),s=this;i.each(function(){var n=e(this);n.is("select")?n.is("[data-url]")?e.getJSON(n.attr("data-url"),function(e,r){if(r==="success"){var i="";t.each(e,function(e){i+='<option value="'+e.Id+'">'+e.Username+"</option>"}),n.append(i),n.select2({containerCssClass:"span12"}).on("change",function(e){e.val&&e.val!==""&&n.removeClass("invalid")})}else s.setUpErrorNotice(n,"Please refresh this page!",1e4)}):n.select2({containerCssClass:"span12"}):e(this).change(function(n){var i=e(this),o=i.val(),u=i.attr("data-url")||r,a={dataType:"json",complete:function(t,n){i.removeAttr("data-send");if(i.hasClass("invalid"))return;if(n==="success"){var r=e.parseJSON(t.responseText);switch(typeof r){case"boolean":r&&(i.addClass("invalid").val(""),s.setUpErrorNotice(i,'Username "'+i.val()+'" is already existed!'))}}else s.setUpErrorNotice(i,"Could not get information!")}};if(o==="")return;u.search(/\?/)===-1&&(u+="?"),typeof username!="undefined"&&(a.username=username,a.password=password);if(i.is("[data-url-data]")){var f="",l=e.parseJSON(i.attr("data-url-data"));t.each(l,function(t,n){f+=n+"="+e(':input[name="'+t+'"]').val()+"&"}),f=encodeURI(f.substr(0,f.length-1)),u+=f}a.url=u,i.is("[data-send]")||(i.attr("data-send",!0),e.ajax(a))})})},setupAddressEvent:function(t,n){var r=e("form",t);r.on("change",".country",function(t){t.preventDefault();var n=e(this),r=n.parentsUntil("form","div.address-fieldset"),i=r.find("select.us-state"),s=r.find("input.us-state"),o=r.find("input.postal-code");_val=n.val();if(_val===n.attr("data-value"))return;n.attr("data-value",_val);switch(_val){case"":case"US":i.is(":hidden")&&s.attr("disabled",!0).hide("slow",function(){i.attr("disabled",!1).show("slow")}),o.hasClass("allowzipcodeplusfour")||o.addClass("allowzipcode").attr("maxlength",5);break;default:s.is(":hidden")&&i.attr("disabled",!0).hide("slow",function(){s.attr("disabled",!1).val("").show("slow"),s.is("[data-default-value]")&&s.val(s.attr("data-default-value")).removeAttr("data-default-value")}),o.removeClass("allowzipcode").removeAttr("maxlength")}});if(n.options.mode==="update"){var i=e("div.address-fieldset",r);i.each(function(){var t=e(this);e(".country",this).trigger("change")})}},setUpErrorNotice:function(e,t,n,r){r=r||"en",n=n||3e3,t=t||"";var i,s;switch(r){case"sp":i="Error",s="Por favor, vuelve a intentarlo";break;default:i="Error",s="Please try again."}_opt={html:!0,placement:"top",trigger:"manual",title:'<i class="icon-edit"></i> '+i+".",content:'<i class="icon-spinner icon-spin icon-large"></i> '+s+" ..."+(t!==""?"<br>"+t:"")},e.attr("disabled",!0).popover(_opt).popover("show"),window.setTimeout(function(){e.attr("disabled",!1).popover("destroy"),e.next(".popover").remove()},n)},parseInternalFieldsBeforeSubmit:function(n,r){var i;if(!r.length)return;t.each(r,function(t){var r=e(':input[name="'+t+'"]',n);if(!r.length)return;i=t.match(/\[\]$/gi),i?i=t.substr(0,t.length-2)+"_internal[]":i=t+"_internal",r.attr("name",i)})},setupPopover:function(t){var n=e('[data-toggle="popover"]',t);n.popover()},destroyPopover:function(t){var n=e('[data-toggle="popover"]',t);n.popover("destroy")},calculateDateDiffByDays:function(e,t){var n=864e5,r=e.getTime(),i=t.getTime(),s=Math.abs(r-i);return Math.round(s/n)},convertDataToArrayString:function(n){var r=["value-as-array"];t.each(r,function(t){var r=e(":input."+t,n);r.each(function(){var t=e(this),n=r.val();n&&n!==""?n=n.split(","):n=[],t.val(JSON.stringify(n))})})},convertNumberToDecimal:function(t){t.find(":input[data-decimal]").each(function(){var t=e(this),n=t.val(),r=parseInt(t.attr("data-decimal"),10);n*=Math.pow(10,r),t.val(parseInt(n,10))})},setupRadioButtonsValue:function(n){if(!n.options.formData||!n.options.formData.fields)return;t.each(n._radioFieldName,function(t){if(!n.options.formData.fields[t])return;e(':radio[value="'+n.options.formData.fields[t]+'"]').attr("checked",!0).trigger("change")})},setModelRadioValues:function(t,n){n=n||null;var r=t.find(":radio:checked");if(!r.length)return;r.each(function(){var t=e(this);t.attr("checked",!0).trigger("change");if(n.model){var r=t.attr("name"),i=t.val();n.model.set(r,i)}})},setModelCheckValues:function(t,n){n=n||null;var r=t.find(":checkbox:checked");if(!r.length)return;r.each(function(){var t=e(this);t.attr("checked",!0).trigger("change");if(n.model){var r=t.attr("name"),i=t.val();n.model.set(r,i)}})},formatAMPM:function(e){var t=e.getHours(),n=e.getMinutes(),r=t>=12?"PM":"AM";t%=12,t=t?t:12,n=n<10?"0"+n:n;var i=t+":"+n+" "+r;return i},addFormSubmittedData:function(e,t){if(e.name&&e.name==="LogEntries"&&t.options.formData.fields){var n={LogMessage:"Form submitted",LogTime:t.options.formData.createddate.$date/1e3,LogUser:t.options.formData.createduser};t.options.formData.fields[e.name]||(t.options.formData.fields[e.name]=[]),t.options.formData.fields[e.name].unshift(n)}}}});