define([ "jquery", "underscore", "backbone", "marionette", "text!auth/loginTemplate.html", "text!auth/controlsTemplate.html" ], function($, _, Backbone, Marionette, LoginTemplate, ControlsTemplate) {
	return Backbone.Marionette.ItemView.extend({
		tagName: "form",
		className: "form-inline auth",
		getTemplate: function() {
			return this.model.get("auth") ? _.template(ControlsTemplate) : _.template(LoginTemplate);
		},
		modelEvents: {
			"change:auth": function () {
				this.render();
			}
		},
		events: {
			"submit": function (e) {
				var that = this;
				e.preventDefault();
				$.ajax({
					type: "GET",
					url: window.App.apiUrl + "auth/",
					beforeSend: function(xhr) {
						xhr.setRequestHeader('AUTH_USER', $("#userName").val());
						xhr.setRequestHeader('AUTH_PW', $("#userPassword").val());
					},
					success: function(data) {
						that.model.set("auth", true);
						$(".auth").removeClass("has-error");
						window.App.router.navigate("admin", { trigger: true });
					},
					statusCode: {
						403: function() {
							$(".auth").addClass("has-error");
						}
					}
				});
			},
			"click #logout": function (e) {
				e.preventDefault();
				this.model.set("auth", false);
				window.App.router.navigate("", { trigger: true });
			}
		}
	});
});