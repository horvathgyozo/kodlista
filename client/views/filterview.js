import Marionette from 'backbone.marionette';

export default Marionette.ItemView.extend({
    template: '#filter-template',
    ui: {
        'filterInput': '#text-filter'
    },
    events: {
        'keyup @ui.filterInput': 'onFilter',
        'submit': 'onSubmit',
    },
    onFilter(e) {
        var filterText = this.ui.filterInput.val();
        //console.log(filterText);
        this.trigger('filter:change', filterText);
    },
    onSubmit(e) {
        e.preventDefault();
    }
});
