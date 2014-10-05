define([ "jquery", "underscore", "backbone", "marionette", "text!admin/nav/template.html" ], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),
		tagName: "nav",
		className: "navbar navbar-default navbar-static-top"
	});
});