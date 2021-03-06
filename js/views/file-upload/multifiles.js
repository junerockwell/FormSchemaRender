/**
 * File-Upload Layout
 **/
define([
    'jquery',
    'lodash',
    'backbone',
    'models/model',
    'modelbinder',
    'validation',
    'vm',
    'utils',
    'events',
    'text!templates/file-upload/template-upload.html',
    'text!templates/file-upload/template-download.html'
], function($, _, Backbone, Model, Modelbinder, Validation, Vm, Utils, Events, uploadTmpl, downloadTmpl) {
    return Backbone.View.extend({
        /**
         * Init File Upload View
         **/
        initialize: function() {
            this.el = '#' + this.options.field.name + '_multifiles_wrapper';
            this.template = _.template(uploadTmpl);
            this.collection = new Backbone.Collection([]);
            this._validation = _.clone(this.options.validation[this.options.field.name + '[]']) || false;
            this._init = false;
            this._ie7 = false;

            if (this.options.field.options.visibleon) {
                delete this.model.validation[this.options.field.name + '[]'];
            }

            if (!$.isEmptyObject(this.options.field.options.visibleon)) {
                $(this.options.name).on('visibleOnRenderComplete', this.el, {
                    view: this
                }, this.addEvents);
            } else {
                // If this field already rendered
                var opt = {
                    data: {
                        view: this
                    }
                };
                this.addEvents(opt);
            }
        },
        render: function() {
            var $renderArea = $('#' + this.options.field.name + '_multifiles_table .files', this.el);
            $renderArea.html(this.template({
                collection: this.collection.toJSON(),
                convertFileSize: this.convertFileSize
            }));

            if (this._init && this.collection.length === 0 && this._validation) {
                this.model.validation[this.options.field.name + '[]'] = this._validation;
            }

            this._init = true;
        },
        /**
         * Events
         **/
        events: {

        },

        /**
         * Convert File Type
         **/
        convertFileSize: function(value) {
            var sOutput;
            for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = value / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
                sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple];
            }
            return sOutput;
        },

        /**
         * Setup Events
         **/
        setupEvents: function(el, view) {
            view.model.validation[view.options.field.name + '[]'] = view._validation;

            //$('.fileinput-button', el).on('click', { view : this }, view.clickFileUploadButton);
            $('.delete', el).on('click', {
                view: this
            }, function(e) {
                var view = e.data.view || false,
                    _field_name = (view.model.has(view.options.field.name + '[]')) ? view.options.field.name + '[]' : view.options.field.name;
                view.collection.reset();
                if (view._ie7) {
                    $('#' + view.options.field.name + '_multifiles_wrapper :input.hidden-multi-files').remove();
                    $('button.cancel, span', '#' + view.options.field.name + '_file_upload_inputs').remove();
                } else {
                    $('#' + view.options.field.name + '_multifiles_wrapper :input.hidden-multi-files').remove();
                }
                view.render();

                // Need to check for Files, if this is empty need to remove the model
                if (view.model.has(_field_name)) {
                    view.model.set(_field_name, '');
                }
            });
            $('#' + view.options.field.name + '_multifiles', el).on('change', {
                view: this
            }, view.changeFileInput);

            // If this is IE 7 will have these events
            if ($('body').hasClass('ie7')) {
                view._ie7 = true;

                $('#' + view.options.field.name + '_file_upload_inputs', el).on('click', 'button.cancel', {
                    view: this
                }, view.removeFile);

            } else {
                // Normal Browsers

                $('#' + view.options.field.name + '_multifiles_table', el).on('click', 'button.cancel', {
                    view: this
                }, view.removeFile);
            }
        },

        /**
         * Add all the event
         **/
        addEvents: function(e) {
            var view = e.data.view || false;

            view.setupEvents(this.el, view);
        },

        /**
         * Click Upload Button
         **/
        clickFileUploadButton: function(e) {
            var $currentTarget = $(e.currentTarget),
                view = e.data.view || false;
            $('#' + view.options.field.name + '_multifiles', $currentTarget.parent()).focus().trigger('click');
        },

        /**
         * File Upload Change
         **/
        changeFileInput: function(e) {
            var view = e.data.view || false,
                _fileName = e.target.value,
                $file = $(this);
            if ($file.get(0).files) {
                // Support File API
                _.each($file.get(0).files, function(element) {
                    if (typeof view.collection.findWhere({
                        name: element.name,
                        size: element.size
                    }) === 'undefined') {
                        view.collection.add(element);
                        var _model = view.collection.at(view.collection.length - 1),
                            $fileInput = $('#' + view.options.field.name + '_multifiles').removeClass('not_sending').attr('id', view.options.field.name + '_' + _model.cid).addClass('hidden-multi-files'),
                            newFileInput = '<input type="file" name="' + view.options.field.name + '[]" id="' + view.options.field.name + '_multifiles" class="not_sending">';

                        $fileInput.parent().append(newFileInput);

                        $('#' + view.options.field.name + '_multifiles').on('change', {
                            view: view
                        }, view.changeFileInput);
                        delete view.model.validation[view.options.field.name + '[]'];
                    }
                });
            } else {
                // IE 9 and Below
                if (typeof view.collection.findWhere({
                    name: _fileName
                }) === 'undefined') {
                    view.collection.add({
                        name: _fileName
                    });
                    var _class = ($('body').hasClass('ie8')) ? ' hideInputFile' : (($('body').hasClass('ie7')) ? ' showInputFile' : ''),
                        _model = view.collection.at(view.collection.length - 1),
                        $fileInput = $('#' + view.options.field.name + '_multifiles').removeClass('not_sending hideInputFile').attr('id', view.options.field.name + '_' + _model.cid).addClass('hidden-multi-files'),
                        newFileInput = '<input type="file" name="' + view.options.field.name + '[]" id="' + view.options.field.name + '_multifiles" class="not_sending' + _class + '">';

                    if (view._ie7) {
                        $fileInput.off('change').addClass('hideInputFile');
                        newFileInput = ' <span>' + $fileInput.val() + '</span><button class="btn btn-danger cancel" type="button" data-name="' + _fileName + '"><i class="icon-trash icon-white"></i><span>Remove</span></button>' + newFileInput;
                    }

                    $fileInput.parent().append(newFileInput);

                    $('#' + view.options.field.name + '_multifiles').on('change', {
                        view: view
                    }, view.changeFileInput);
                    delete view.model.validation[view.options.field.name + '[]'];
                }
            }
            view.render();
        },

        /**
         * Remove File
         **/
        removeFile: function(e) {
            var view = e.data.view || false,
                $currentTarget = $(this);

            if (view._ie7) {
                _model = view.collection.findWhere({
                    name: $currentTarget.attr('data-name')
                });
                view.collection.remove(_model);
                $currentTarget.prev().remove();
                $currentTarget.prev().remove();
                $currentTarget.remove();
            } else {
                var $parent = $(this).parents('.template-upload'),
                    $size = $parent.find('.size'),
                    _model, _opts = {
                        name: $parent.find('.name').text()
                    };

                if ($size.length > 0) {
                    _opts.size = parseInt($size.attr('data-size'));
                }
                _model = view.collection.findWhere(_opts);
                view.collection.remove(_model);
                $('#' + view.options.field.name + '_' + _model.cid).remove();
                view.render();
            }
            // Need to check for Files, if this is empty need to remove the model
            if (!view.collection.length) {
                var _field_name = (view.model.has(view.options.field.name + '[]')) ? view.options.field.name + '[]' : view.options.field.name;
                if (view.model.has(_field_name)) {
                    view.model.set(_field_name, '');
                }
            }
        }

    });
});