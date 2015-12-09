import Backbone from 'backbone';

export default Backbone.Model.extend({

	idAttribute: '_id',

    defaults() {
        return {
            title: '',
            code: '',
            type: 'js',
        };
    },
});