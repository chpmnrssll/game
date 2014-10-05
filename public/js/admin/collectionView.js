define([ "jquery", "underscore", "backbone", "marionette", "admin/itemView", "text!admin/collectionTemplate.html" ], function($, _, Backbone, Marionette, ItemView, Template) {
	return Backbone.Marionette.CompositeView.extend({
		itemView: ItemView,
		itemViewContainer: "#adminContent",
		template: _.template(Template),
		className: "container"
	});
});