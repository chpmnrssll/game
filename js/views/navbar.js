define(["text!templates/navbar_login.html", "text!templates/navbar.html"], function (LogInTemplate, LoggedInTemplate) {
    "use strict";

    return Backbone.Marionette.ItemView.extend({
        tagName : "nav",
        className : "navbar navbar-default navbar-static-top",
		getTemplate: function() {
			return this.model.get("auth") ? _.template(LoggedInTemplate) : _.template(LogInTemplate);
		},
        ui: {
            loginForm : "#loginForm",
            username : "#userName",
            password : "#userPassword"
        },
        modelEvents : {
            "change" : function () {
                this.render();
            }
        },
		events: {
			"click #login": function (e) {
				var that = this;
				e.preventDefault();
				$.ajax({
					type: "GET",
					url: window.App.apiUrl + "auth/",
					beforeSend: function(xhr) {
						xhr.setRequestHeader('AUTH_USER', that.ui.username.val());
						xhr.setRequestHeader('AUTH_PW', that.ui.password.val());
					},
					success: function(data) {
						that.model.set("auth", true);
						that.ui.loginForm.removeClass("has-error");
						window.App.routers.main.navigate("", { trigger: true });
					},
					statusCode: {
						403: function() {
                            that.ui.loginForm.addClass("has-error");
						}
					}
				});
			},
			"click #logout": function (e) {
				e.preventDefault();
				this.model.set("auth", false);
				window.App.routers.main.navigate("", { trigger: true });
			}
		}

    });
});
