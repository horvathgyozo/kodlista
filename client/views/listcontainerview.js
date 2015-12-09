import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import FilterView from './filterview';
import ListView from './listview';

function makeFilteredCollection(coll, filterFn) {
    var FC = Backbone.Collection.extend({
        localStorage: coll.localStorage,
        url: coll.url,
        initialize: function () {
            filterFn = filterFn.bind(coll);
        },
        doFilter: function (filterText) {
            var filtered = filterFn(filterText);
            return this.reset(filtered);
        }
    });

    console.log(FC)

    var fc = new FC();

    fc.listenTo(coll, 'reset', fc.doFilter.bind(fc, ''));
        
    return (fc);
}

export default Marionette.LayoutView.extend({
    
    // el: '#list-container',
    // template: false,
    template: '#list-container-template',

    regions: {
        filter: '#filter',
        list:   '#list',
    },
	
	initialize() {
        this.filterView = new FilterView();
        this.collection = makeFilteredCollection(this.collection, function (filterText) {
            return this.filter(function (sn) {
                return sn.get('title').indexOf(filterText) > -1;
            });
        });
        this.collection.doFilter('');
                
        // this.filterView.on('filter:change', ...);
        this.listenTo(this.filterView, 'filter:change', this.updateCollection);
    },

    onBeforeShow() {
        this.getRegion('filter').show(this.filterView);
        this.getRegion('list').show(new ListView({
            collection: this.collection
        }));
    },
	
	updateCollection: function (filterText) {
        this.collection.doFilter(filterText);
    }
});
