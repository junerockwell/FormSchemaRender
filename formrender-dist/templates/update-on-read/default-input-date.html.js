define([],function(){var e='<%var field = arguments[0];var _id = (field.attributes.id) ? field.attributes.id: field.name;%><div class="force-hide field-container"><input type="text" class="input-xlarge is-date-picker has-field-container" id="update_read_<%= _id %>" data-target-id="<%= _id %>" name="<%= field.name %>"/><div class="update-buttons"><a class="btn btn-info update-cancel">Cancel</a><a class="btn btn-success update-submit">Submit</a></div></div>';return e});