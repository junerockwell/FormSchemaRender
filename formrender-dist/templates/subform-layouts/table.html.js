define([],function(){var e='<%var _model = (typeof modelId !== \'undefined\') ? true : false,_tableClass = (mode)  ? \' stupidtable\': \'\';if (heading) {%><fieldset class="table-view"><legend><%= heading %></legend><% } %><table class="table table-striped table-bordered table-hover <%= _tableClass %>"><thead><tr><% _.each( labels, function(element, index) { %><%var _sortBy = (typeof sortBy !== \'undefined\' && sortBy[index]) ? sortBy[index]: \'data-sort="string"\';_sortBy = (mode) ? _sortBy : \'\';%><th <%= _sortBy %>><%= element %></th><% }); %><% if(_model) { %><th>Action</th><% } %></tr></thead><tbody><% _.each( values, function(element1, index) { %><tr><% _.each( element1, function(element2, index2) { %><% var _sortByVal = (mode && typeof sortByVal !== \'undefined\' && sortByVal[index][index2]) ? sortByVal[index][index2]: \'\' %><td <%= _sortByVal %>><%= element2 %></td><% }); %><% if(_model) { %><td class="subform-actions"><button class="btn btn-info subform-edit-model" data-id="<%= modelId[index] %>"><i class="icon-edit"></i> Edit</button><button class="btn btn-danger subform-remove-model" data-id="<%= modelId[index] %>"><i class="icon-remove"></i> Remove</button></td><% } %></tr><% }); %></tbody></table><% if (heading) { %></fieldset><% } %>';return e});