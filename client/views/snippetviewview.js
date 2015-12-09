import Marionette from 'backbone.marionette';

export default Marionette.ItemView.extend({
	template: '#snippet-view-template',
	modelEvents: {
		'change': 'render',
	},
	_show: function () {
		this.$el.show();
	},
	_hide: function () {
		this.$el.hide();
	},

});
