import Marionette from 'backbone.marionette';

export default Marionette.ItemView.extend({
	template: '#snippet-edit-template',
	tagName: 'form',
	ui: {
		'save': '#snippet-save',
		'title': '#snippet-title',
		'code': '#snippet-code'
	},
	events: {
		'click @ui.save': 'onSave'
	},
	modelEvents: {
		'change': 'render',
	},
	initialize: function () {
		this._hide();
	},
	onSave: function (e) {
		this.model.save({
			'title': this.ui.title.val(),
			'code':  this.ui.code.val()
		});
		this.trigger('snippet:saved');
	},
	_show: function () {
		this.$el.show();
	},
	_hide: function () {
		this.$el.hide();
	},
});
