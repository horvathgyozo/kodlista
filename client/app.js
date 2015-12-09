import Marionette from 'backbone.marionette';
import CodeSnippetCollection from './collections/codesnippetcollection';
import RootView from './views/rootview';
import ListContainerView from './views/listcontainerview';
import SnippetContainerView from './views/snippetcontainerview';
import snippets from './fixtures/snippets';

import Radio from 'backbone.radio';

var mainChannel = Radio.channel('main');

// var csc = new CodeSnippetCollection(snippets);
var csc = new CodeSnippetCollection();

var app = new Marionette.Application({
	showSnippet: function (data) {
		// console.log(data);
		this.rootView.getRegion('main').show(new SnippetContainerView({
			model: data
		}));
	},
	//később
	showSnippetList: function () {
		this.rootView.getRegion('main').show(new ListContainerView({
			collection: csc
		}));
	},
});
        
app.on('start', function () {
    this.rootView = new RootView();
    this.lcv = new ListContainerView({
        collection: csc
    });
    this.rootView.getRegion('main').show(this.lcv);
});

app.on('start', function () {
	this.listenTo(mainChannel, 'snippet:selected', this.showSnippet);
	//később
	this.listenTo(mainChannel, 'nav:back', this.showSnippetList);
});

app.on('start', function () {
	csc.fetch({reset: true});
});

export default app;