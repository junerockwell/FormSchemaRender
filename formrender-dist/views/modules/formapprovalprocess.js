define(["jquery","underscore","backbone","utils","text!templates/modules/formapprovalprocess.html"],function(e,s,i,t,n){function r(s,i){var t=(new Date,"_internal"),n='<form method="post" action="/form/edit?id='+s+'" novalidate id="module-form-update-approval"><input type="hidden" name="UserPermissions'+t+'" id="UserPermissions"/></form>',r=e("body").append(n),o=r.find("#module-form-update-approval");o.find("#UserPermissions").val(JSON.stringify(i)),o.submit()}function o(e,i){if(!s.isString(i))throw o+" expected action to be a string.";if(e.username){e._modal.find(".modal-body #module-approval-loader").show();var t=e.options.options.formData;t.InternalFields||(t.InternalFields={}),t.InternalFields.UserPermissions||(t.InternalFields.UserPermissions=[]),t.fields.UserPermissions&&(t.InternalFields.UserPermissions=t.fields.UserPermissions);var n=e.$("#approval-comment"),a=n.val();n.attr("disabled",!0);var l=t.InternalFields.UserPermissions,d={Username:e.username,Status:null,Comment:a&&""!==a?a:null,DecisionTime:{$date:(new Date).getTime()}};switch(i){case"deny":d.Status="Denied";break;default:d.Status="Approved"}var m=e.username.split("\\").pop();s.each(l,function(e,s){if(e.Username){var i=e.Username.toLowerCase();i===m&&(l[s].Status=d.Status,l[s].Comment=d.Comment,l[s].DecisionTime=d.DecisionTime)}}),r(t._id.$oid,l)}}var a=!1,l="frame";return i.View.extend({template:s.template(n),initialize:function(){var e=this.options.options.formData,i=this.options.options.mode,n=this;if("read"===i&&"undefined"!=typeof e&&s.isObject(e)&&e.fields){if(this.username=null,this.userId=t.getUserIdFormHtml(),this._btn=null,this._modal=null,this._submitted=!1,!this.userId||!this.userId.length)throw this.userId=null,"Could not be able to find userId in FormApprovalProcess module";var r=this.userId.split("\\");if(this.username=r.pop(),this.username.length&&""!==this.username){if(this.username=this.userId,a&&(this.username=l),this.username===e.createduser)return void(this.username=null);if(!(e.fields&&e.fields.UserPermissions&&e.fields.UserPermissions.length))return void(this.username=null);var o=s.pluck(e.fields.UserPermissions,"Username");if(s.indexOf(o,this.username)>-1)return void(this.username=null);var d=this.username.split("\\").pop();s.each(e.fields.UserPermissions,function(e){var s=e.Username.toLowerCase();if(d===s)return"pending"!==e.Status.toLowerCase()?void(n.username=null):void 0})}}},render:function(){if(this.username){var s=e(this.options.el),i=s.find(".form-actions");i.append(this.template()),this._btn=i.find("#module-approval-btn"),this._modal=i.find("#module-approval-modal").modal({backdrop:"static",show:!1,keyboard:!0})}},events:{"click #module-approval-btn":function(e){return e.preventDefault(),this._modal.modal("toggle"),!1},"click .modal-footer .btn-danger":function(e){return e.preventDefault(),!this._submitted&&(this._submitted=!0,o(this,"deny"),!1)},"click .modal-footer .btn-success":function(e){return e.preventDefault(),!this._submitted&&(this._submitted=!0,o(this,"approve"),!1)}}})});