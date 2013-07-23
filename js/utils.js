/**
 * Utilities Functions
 * Events
 **/
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
	return {
		/**
		 * Prevalidation, on blur event
		 **/
		preValidate: function(e, model) {
			var $e = $(e.currentTarget)
			, _name = $e.attr('name')
			, _val = $.trim($e.val());
			$e.val(_val).trigger('change');
			model.set(_name, _val);
			if (model.isValid(_name, _val)) {
				$e.removeClass('invalid');
			} else {
				$e.addClass('invalid');
			}
		},
		setupEmailInput: function(el) {
			$('.emailpicker', el).each(function () {
				var $server = $('.emailpicker_server', this)
				, $notsending = $('.not_sending', this);
				$server.val($server.attr('data-value')).trigger('change');
				$notsending.on('change', this, function(e) {
					var $hidden = $(':hidden', e.data)
					, $username = $('.emailpicker_username', e.data)
					, $server = $('.emailpicker_server', e.data);
					if ($username.val() !== '' && $server.val() !== '') {
						$hidden.val($.trim($username.val()+'@'+$server.val())).trigger('change');
					} else {
						$hidden.val('').trigger('change');
					}
				})
				.on('keydown', function(e) {
					if (e.keyCode === 32) {
						e.preventDefault();
						return false;
					}
				});
			});
		},
		/**
		 * Init BDate
		 **/
		setupBDateInput: function(el) {
			$('.birthdaypicker', el).each(function () {
				$(this).birthdaypicker($(this).attr('data-options'));
			});
		},
		/**
		 * Get BDate Values
		 **/
		getBDateinput: function(el, model) {
			$('fieldset.birthday-picker', el).each(function() {
				$('.not_sending', this).trigger('change');
				var _nan =/NaN/i
				, $bdateInput = $(':hidden', this);
				if ($bdateInput.val().match(_nan)) {
					$(':hidden', this).val('');
				}
				model.set($bdateInput.attr('name'), $bdateInput.val());
			});
		},
		setupDateInput: function(el) {
			$('.datepicker', el).each(function () {
			var _options = {}, maxDate, nowTemp;
			if ($(this).attr('data-maxdate')) {
				switch ($(this).attr('data-maxdate').toLowerCase()) {
					case 'today':
					nowTemp = new Date();
					maxDate = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
					_options.onRender = function(date) {
						return date.valueOf() > maxDate.valueOf() ? 'disabled' : '';
					};
					break;
				}
			}
			$(this).datepicker(_options)
				.on('changeDate', function(e){
					var _dateInput = $(e.currentTarget).removeClass('invalid').trigger('change');
					_dateInput.datepicker('hide');
				})
				.on('click', function(e){
					$('div.datepicker.dropdown-menu').css('display', 'none');
					$(e.currentTarget).datepicker('show');
				});
			});
		},
		preventSpace: function(e) {
			if (e.keyCode === 32) {
				e.preventDefault();
				return false;
			}
		},
		allowNumber: function(e) {
			if (e.keyCode === 8 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 46
				|| e.keyCode === 9) {
				return true;
			} else if (( ! ( e.keyCode === 46 || e.keyCode === 190 ) || $(e.currentTarget).val().indexOf('.') != -1 )
				&& ( e.keyCode < 48 || e.keyCode > 57 ) ) {
				e.preventDefault();
			}
		}
	};
});