define([],function(){var e='<%if (options.javaupload == undefined || ! options.javaupload) {%><input id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>" name="<%= name %>" type="file"<%= _attr %>/><%} else {var _id = (typeof attributes.id !== \'undefined\') ? attributes.id: name;%><div id="<%= _id %>_accordion" class="accordion"><div class="accordion-group"><div class="accordion-heading"><a href="#<%= _id %>_java-upload" data-parent="#<%= _id %>_accordion" data-toggle="collapse" class="accordion-toggle">Upload Files and Folders</a></div><div id="<%= _id %>_java-upload" class="accordion-body collapse in"><div class="accordion-inner" id="<%= _id %>_java-upload-applet"></div></div></div><div class="accordion-group"><div class="accordion-heading"><a href="#<%= _id %>_upload-zip" data-parent="#<%= _id %>_accordion" data-toggle="collapse" class="accordion-toggle">Upload a Zip File</a></div><div class="accordion-body collapse" id="<%= _id %>_upload-zip"><div class="accordion-inner"><input id="<%= _id %>" name="<%= name %>" type="file" disabled="disabled"<%= _attr %>/></div></div></div></div><% }%>';return e});