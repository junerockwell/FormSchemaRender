define([],function(){var e='<% if(href === null) { %><span class="input-xlarge uneditable-input">File has been removed.</span><% } else { %><!-- For LightBox --><a id="<%= id %>_lightbox" data-lightbox="<%= id %>" href="<%= href %>" title="<%= text %>"><img class="uneditable-input-image" alt="<%= text %>"<%= _attr %>/></a><!-- If this is not Images type file will render this --><a href="<%= href %>" title="<%= text %>" target="_blank" class="btn btn-primary" style="display: none" id="<%= id %>_render_file">View File</a><% } %>';return e});