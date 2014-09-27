define([ "jquery", "underscore", "backbone", "marionette", "text!admin/pages/itemTemplate.html" ], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),
		tagName: "tr"
	});
});