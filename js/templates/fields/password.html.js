define(function() { var str ='<input id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>" name="<%= name %>" type="password"<%= _attr %>/>';return str;});