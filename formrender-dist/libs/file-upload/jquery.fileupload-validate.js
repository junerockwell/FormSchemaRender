/*
 * jQuery File Upload Validation Plugin 1.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function(e){typeof define=="function"&&define.amd?define(["jquery","./jquery.fileupload-process"],e):e(window.jQuery)})(function(e){e.blueimp.fileupload.prototype.options.processQueue.push({action:"validate",always:!0,acceptFileTypes:"@",maxFileSize:"@",minFileSize:"@",maxNumberOfFiles:"@",disabled:"@disableValidation"}),e.widget("blueimp.fileupload",e.blueimp.fileupload,{options:{getNumberOfFiles:e.noop,messages:{maxNumberOfFiles:"Maximum number of files exceeded",acceptFileTypes:"File type not allowed",maxFileSize:"File is too large",minFileSize:"File is too small"}},processActions:{validate:function(t,n){if(n.disabled)return t;var r=e.Deferred(),i=this.options,s=t.files[t.index],o=i.getNumberOfFiles();return o&&e.type(n.maxNumberOfFiles)==="number"&&o+t.files.length>n.maxNumberOfFiles?s.error=i.i18n("maxNumberOfFiles"):n.acceptFileTypes&&!n.acceptFileTypes.test(s.type)&&!n.acceptFileTypes.test(s.name)?s.error=i.i18n("acceptFileTypes"):n.maxFileSize&&s.size>n.maxFileSize?s.error=i.i18n("maxFileSize"):e.type(s.size)==="number"&&s.size<n.minFileSize?s.error=i.i18n("minFileSize"):delete s.error,s.error||t.files.error?(t.files.error=!0,r.rejectWith(this,[t])):r.resolveWith(this,[t]),r.promise()}}})});