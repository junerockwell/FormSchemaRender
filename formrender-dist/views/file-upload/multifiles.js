define(["jquery","lodash","backbone","models/model","modelbinder","validation","vm","utils","events","text!templates/file-upload/template-upload.html","text!templates/file-upload/template-download.html"],function(e,i,t,n,l,o,a,s,d,m,p){return t.View.extend({initialize:function(){if(this.el="#"+this.options.field.name+"_multifiles_wrapper",this.template=i.template(m),this.collection=new t.Collection([]),this._validation=i.clone(this.options.validation[this.options.field.name+"[]"])||!1,this._init=!1,this._ie7=!1,this.options.field.options.visibleon&&delete this.model.validation[this.options.field.name+"[]"],e.isEmptyObject(this.options.field.options.visibleon)){var n={data:{view:this}};this.addEvents(n)}else e(this.options.name).on("visibleOnRenderComplete",this.el,{view:this},this.addEvents)},render:function(){var i=e("#"+this.options.field.name+"_multifiles_table .files",this.el);i.html(this.template({collection:this.collection.toJSON(),convertFileSize:this.convertFileSize})),this._init&&0===this.collection.length&&this._validation&&(this.model.validation[this.options.field.name+"[]"]=this._validation),this._init=!0},events:{},convertFileSize:function(e){for(var i,t=["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],n=0,l=e/1024;l>1;l/=1024,n++)i=l.toFixed(3)+" "+t[n];return i},setupEvents:function(i,t){t.model.validation[t.options.field.name+"[]"]=t._validation,e(".delete",i).on("click",{view:this},function(i){var t=i.data.view||!1,n=t.model.has(t.options.field.name+"[]")?t.options.field.name+"[]":t.options.field.name;t.collection.reset(),t._ie7?(e("#"+t.options.field.name+"_multifiles_wrapper :input.hidden-multi-files").remove(),e("button.cancel, span","#"+t.options.field.name+"_file_upload_inputs").remove()):e("#"+t.options.field.name+"_multifiles_wrapper :input.hidden-multi-files").remove(),t.render(),t.model.has(n)&&t.model.set(n,"")}),e("#"+t.options.field.name+"_multifiles",i).on("change",{view:this},t.changeFileInput),e("body").hasClass("ie7")?(t._ie7=!0,e("#"+t.options.field.name+"_file_upload_inputs",i).on("click","button.cancel",{view:this},t.removeFile)):e("#"+t.options.field.name+"_multifiles_table",i).on("click","button.cancel",{view:this},t.removeFile)},addEvents:function(e){var i=e.data.view||!1;i.setupEvents(this.el,i)},clickFileUploadButton:function(i){var t=e(i.currentTarget),n=i.data.view||!1;e("#"+n.options.field.name+"_multifiles",t.parent()).focus().trigger("click")},changeFileInput:function(t){var n=t.data.view||!1,l=t.target.value,o=e(this);if(o.get(0).files)i.each(o.get(0).files,function(i){if("undefined"==typeof n.collection.findWhere({name:i.name,size:i.size})){n.collection.add(i);var t=n.collection.at(n.collection.length-1),l=e("#"+n.options.field.name+"_multifiles").removeClass("not_sending").attr("id",n.options.field.name+"_"+t.cid).addClass("hidden-multi-files"),o='<input type="file" name="'+n.options.field.name+'[]" id="'+n.options.field.name+'_multifiles" class="not_sending">';l.parent().append(o),e("#"+n.options.field.name+"_multifiles").on("change",{view:n},n.changeFileInput),delete n.model.validation[n.options.field.name+"[]"]}});else if("undefined"==typeof n.collection.findWhere({name:l})){n.collection.add({name:l});var a=e("body").hasClass("ie8")?" hideInputFile":e("body").hasClass("ie7")?" showInputFile":"",s=n.collection.at(n.collection.length-1),d=e("#"+n.options.field.name+"_multifiles").removeClass("not_sending hideInputFile").attr("id",n.options.field.name+"_"+s.cid).addClass("hidden-multi-files"),m='<input type="file" name="'+n.options.field.name+'[]" id="'+n.options.field.name+'_multifiles" class="not_sending'+a+'">';n._ie7&&(d.off("change").addClass("hideInputFile"),m=" <span>"+d.val()+'</span><button class="btn btn-danger cancel" type="button" data-name="'+l+'"><i class="icon-trash icon-white"></i><span>Remove</span></button>'+m),d.parent().append(m),e("#"+n.options.field.name+"_multifiles").on("change",{view:n},n.changeFileInput),delete n.model.validation[n.options.field.name+"[]"]}n.render()},removeFile:function(i){var t=i.data.view||!1,n=e(this);if(t._ie7)l=t.collection.findWhere({name:n.attr("data-name")}),t.collection.remove(l),n.prev().remove(),n.prev().remove(),n.remove();else{var l,o=e(this).parents(".template-upload"),a=o.find(".size"),s={name:o.find(".name").text()};a.length>0&&(s.size=parseInt(a.attr("data-size"))),l=t.collection.findWhere(s),t.collection.remove(l),e("#"+t.options.field.name+"_"+l.cid).remove(),t.render()}if(!t.collection.length){var d=t.model.has(t.options.field.name+"[]")?t.options.field.name+"[]":t.options.field.name;t.model.has(d)&&t.model.set(d,"")}}})});