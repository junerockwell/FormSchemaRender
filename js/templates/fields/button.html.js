define(function() { var str ='<% if (typeof _submit === \'undefined\' && typeof url !== \'undefined\') { %><a id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>" href="<%= url %>" <%= _attr %>><%= description %></a><% } else {var _btnType = (typeof _submit === \'undefined\') ? \'button\' : \'submit\';%><button type="<%= _btnType %>" id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>"<%= _attr %>><%= description %></button><% } %>';return str;});