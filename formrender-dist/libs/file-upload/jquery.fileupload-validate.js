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

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./jquery.fileupload-process"],e):e(window.jQuery)}(function(e){"use strict";e.blueimp.fileupload.prototype.options.processQueue.push({action:"validate",always:!0,acceptFileTypes:"@",maxFileSize:"@",minFileSize:"@",maxNumberOfFiles:"@",disabled:"@disableValidation"}),e.widget("blueimp.fileupload",e.blueimp.fileupload,{options:{getNumberOfFiles:e.noop,messages:{maxNumberOfFiles:"Maximum number of files exceeded",acceptFileTypes:"File type not allowed",maxFileSize:"File is too large",minFileSize:"File is too small"}},processActions:{validate:function(i,l){if(l.disabled)return i;var r=e.Deferred(),s=this.options,t=i.files[i.index],o=s.getNumberOfFiles();return o&&"number"===e.type(l.maxNumberOfFiles)&&o+i.files.length>l.maxNumberOfFiles?t.error=s.i18n("maxNumberOfFiles"):!l.acceptFileTypes||l.acceptFileTypes.test(t.type)||l.acceptFileTypes.test(t.name)?l.maxFileSize&&t.size>l.maxFileSize?t.error=s.i18n("maxFileSize"):"number"===e.type(t.size)&&t.size<l.minFileSize?t.error=s.i18n("minFileSize"):delete t.error:t.error=s.i18n("acceptFileTypes"),t.error||i.files.error?(i.files.error=!0,r.rejectWith(this,[i])):r.resolveWith(this,[i]),r.promise()}}})});