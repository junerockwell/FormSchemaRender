define(function() { var str ='<% if( typeof options.autocomplete !== \'undefined\' && options.autocomplete ) { %><div class="controls-row emailpicker"><input id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>_username" name="<%= name %>_username" type="text" placeholder="username" class="not_sending emailpicker_username"/><span class="add-on">@</span><input id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>_server" name="<%= name %>_server" type="text" placeholder="example.com"<%= _attr %>/><input id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>" type="hidden" name="<%= name %>"></div><% } else { %><input id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>" name="<%= name %>" type="email"<%= _attr %>/><% } %>';return str;});