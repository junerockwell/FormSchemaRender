define(["jquery","lodash","backbone","vm","utils","events","views/baseField","text!templates/subform-layouts/table.html","text!templates/notice/confirmation.html","bootstrap"],function(e,t,n,r,i,s,o,u,a){var f=n.View.extend({template:t.template(u),popTemplate:t.template(a),clean:function(){i.destroyPopover(this.$el)},initialize:function(){this.collection.on("reset",this.resetCollection,this)},render:function(){var n=this,r=[],s=new Array(this.collection.length),u=new Array(this.collection.length),a,f=this.options;t.each(this.options.formSchema.fields,function(l){switch(l.type.toLowerCase()){case"fieldsetstart":case"fieldsetend":return}if(!o.prototype.checkShowOnMode.call(n,l,f.options.mode,f.options.formData.status))return;l.options&&l.options.tabletitle?(a=l.options.tabletitle,a='<a data-content="'+e("<p>"+l.description+"</p>").text()+'" data-original-title="'+l.options.tabletitle+'" data-placement="top" data-toggle="popover" data-trigger="hover" data-html="true">'+a+"</a>"):a=l.description,r.push(a),t.each(n.collection.models,function(e,t){var n=e.toJSON(),o;typeof s[t]=="undefined"&&(s[t]=[],u[t]=e.cid);switch(l.type.toLowerCase()){case"timestamp":r[r.length-1]="Time",s[t].push(i.getHumanTime(n[l.name]));break;case"useraccount":r[r.length-1]="User",s[t].push(n[l.name]);break;case"fullname":o=n[l.name+"_fullname_first_name"],typeof n[l.name+"_fullname_middle_name"]!="undefined"&&(o+=" "+n[l.name+"_fullname_middle_name"]),o+=" "+n[l.name+"_fullname_last_name"],s[t].push(o);break;case"booleaninput":var a=n[l.name]===!0?"Yes":n[l.name]===!1?"No":"";s[t].push(a);break;default:s[t].push(n[l.name])}})}),e(this.el).html(this.template({labels:r,values:s,modelId:u,heading:typeof this.options.formSchema.options.readmodedescription!="undefined"?this.options.formSchema.options.readmodedescription:this.options.formSchema.name})),i.setupPopover(this.$el)},events:{"click .subform-edit-model":"editModel","click .subform-remove-model":"popoverConfirm","click .popover-action .popover-submit":"removeModel","click .popover-action .popover-cancel":"removePopover"},editModel:function(t){t.preventDefault();var n=e(t.currentTarget,this.el).attr("data-id");e(".actions .form-view",this.$el.parent(".subform-container")).trigger("click",this.collection.get(n))},popoverConfirm:function(t){t.preventDefault();var n={html:!0,placement:"bottom",trigger:"manual",title:"Do you want to remove this data?",content:this.popTemplate({id:e(t.currentTarget,this.el).attr("data-id")})};e(t.currentTarget,this.el).popover(n).popover("show")},removeModel:function(t){t.preventDefault();var n=e(t.currentTarget,this.el).attr("data-id");this.collection.remove(this.collection.get(n)),this.collection.length>0?this.render():this.$el.html("")},removePopover:function(t){e(".subform-remove-model",e(t.currentTarget,this.el).parents(".subform-actions")).popover("destroy").next(".popover").remove()},resetCollection:function(e){this.$el.html("")}});return f});