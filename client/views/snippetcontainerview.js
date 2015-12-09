import Marionette from 'backbone.marionette';
import NavigationView from './navigationview';
import SnippetViewView from './snippetviewview';
import SnippetEditView from './snippeteditview';
import Radio from 'backbone.radio';

var mainChannel = Radio.channel('main');

export default Marionette.LayoutView.extend(
// {
// 	template: '#snippet-container-template',
// 	regions: {
// 		'nav': '#nav',
// 		'snippet': '#snippet',
// 	},
// 	initialize: function () {  },
// 	onBeforeShow: function () {
// 		this.getRegion('snippet').show(new SnippetViewView({
// 			model: this.model
// 		}));
// 	}
// }

{
	template: '#snippet-container-template',
	regions: {
		'nav': '#nav',
		'snippetView': '#snippetView',
		'snippetEdit': '#snippetEdit',
	},
	initialize: function () {
		this.navigationView = new NavigationView();

		this.snippetViewView = new SnippetViewView({
			model: this.model
		});

		this.snippetEditView = new SnippetEditView({
			model: this.model
		});

		this.listenTo(this.navigationView, 'nav:viewSnippet', this.onViewSnippet);
		this.listenTo(this.navigationView, 'nav:editSnippet', this.onEditSnippet);
		this.listenTo(this.navigationView, 'nav:deleteSnippet', this.onDeleteSnippet);

		this.listenTo(this.snippetEditView, 'snippet:saved', this.onViewSnippet);
	},
	onBeforeShow: function () {
		this.getRegion('nav').show(this.navigationView);
		this.getRegion('snippetView').show(this.snippetViewView);
		this.getRegion('snippetEdit').show(this.snippetEditView);
	},
	onEditSnippet: function () {
		this.snippetViewView._hide();
		this.snippetEditView._show();
	},
	onDeleteSnippet: function () {
		if (confirm("Delete snippet?")) {
	    	this.model.destroy();
	    	mainChannel.trigger('nav:back');
	    }
	},
	onViewSnippet: function () {
		this.snippetEditView._hide();	
		this.snippetViewView._show();
	},

}

);



