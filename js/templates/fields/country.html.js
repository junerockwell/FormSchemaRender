define(function() { var str ='<%var optionValues = _.reduce(_optionsValue, function(carry, country, code) {var selected = code == \'US\' ? \'selected\': \'\';carry += \'<option value="\' + code + \'" \' + selected + \'>\' + country + \'</option>\';return carry;}, \'<option value="">--Select Country--</option>\');%><select id="<%= (typeof attributes.id !== \'undefined\') ? attributes.id: name %>" name="<%= name %>"<%= _attr %>><%= optionValues %></select>';return str;});