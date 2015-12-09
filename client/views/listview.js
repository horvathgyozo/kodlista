import Marionette from 'backbone.marionette';
import ListItemView from './listitemview';

export default Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'list-group',
    childView: ListItemView
});