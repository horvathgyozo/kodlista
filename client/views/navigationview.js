import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

var mainChannel = Radio.channel('main');

export default Marionette.ItemView.extend({
	template: '#navigation-template',
	ui: {
		'snippetBack': '#snippet-back',
		'snippetEdit': '#snippet-edit',
		'snippetDelete': '#snippet-delete',
		'snippetView': '#snippet-view',
	},
	events: {
		'click @ui.snippetView': 'onClickView',
		'click @ui.snippetEdit': 'onClickEdit',
		'click @ui.snippetDelete': 'onClickDelete',
		'click @ui.snippetBack': 'onClickBack',
	},
	onClickView: function (e) {
		this.trigger('nav:viewSnippet');
	},
	onClickEdit: function (e) {
		this.trigger('nav:editSnippet');
	},
	onClickDelete: function (e) {
		this.trigger('nav:deleteSnippet');
	},
	onClickBack: function (e) {
		mainChannel.trigger('nav:back');
	},
});
