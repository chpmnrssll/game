define([ "jquery", "underscore", "backbone", "marionette", "text!admin/users/updateTemplate.html" ], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),
		className: "container",
		events: {
			"click #userSave": function (event) {
				this.model.save({
					name: $("#userName").val(),
					password: $("#userPassword").val(),
					email: $("#userEmail").val()
				}, {
					success: function (model, response, options) {
						window.App.collections.users.add(model);
						window.App.router.navigate("admin/users", { trigger: true });
					}
				});
			},
			"click #userCancel": function (event) {
				window.App.router.navigate("admin/users", { trigger: true });
			}
		}
	});
});