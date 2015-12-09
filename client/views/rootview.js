import Marionette from 'backbone.marionette';

export default Marionette.LayoutView.extend({
    el: 'body',
    regions: {
        'main': '#main'
    }
});
