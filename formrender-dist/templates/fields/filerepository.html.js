define([],function(){var e='<%var field = arguments[0];field.attributes = field.attributes || {};var _id = (field.attributes.id) ? field.attributes.id: field.name;var _date = new Date().getTime();%><div class="filerepository-wrapper"><div class="filerepository-form sub-fields-box"><label for="<%= field.name %>_<%= _date %>">File to Upload</label><input type="file" name="<%= field.name %>" id="<%= field.name %>_<%= _date %>"><label for="<%= field.name %>_description_<%= _date %>">Description</label><textarea name="<%= field.name %>_description" id="<%= field.name %>_description_<%= _date %>"></textarea></div></div>';return e});