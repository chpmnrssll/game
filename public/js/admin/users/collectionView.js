define([ "jquery", "underscore", "backbone", "marionette", "admin/users/itemView", "text!admin/users/collectionTemplate.html" ], function($, _, Backbone, Marionette, ItemView, Template) {
	return Backbone.Marionette.CompositeView.extend({
		itemView: ItemView,
		itemViewContainer: "tbody",
		template: _.template(Template),
		className: "container"
	});
});