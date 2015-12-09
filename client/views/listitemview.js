import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

var mainChannel = Radio.channel('main');

export default Marionette.ItemView.extend({
	tagName: 'li',
	className: 'list-group-item',
	template: '#list-item-template',
	events: {
		'click': 'onClick'
	},
	onClick: function (e) {
		// console.log(this.model);
		mainChannel.trigger('snippet:selected', this.model);
	}
});
