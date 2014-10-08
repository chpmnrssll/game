define(["text!templates/login.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
        ui: {
            loginForm : "#loginForm",
            username : "#inputUsername",
            password : "#inputPassword"
        },
        events: {
            "click #btnLogin": function (e) {
                var that = this;
				e.preventDefault();
				$.ajax({
					type: "POST",
					url: window.App.apiUrl + "login/",
					beforeSend: function(xhr) {
						xhr.setRequestHeader("AUTH_USER", that.ui.username.val());
						xhr.setRequestHeader("AUTH_PW", that.ui.password.val());
					},
					success: function(data) {
						that.ui.loginForm.removeClass("has-error");
						window.App.routers.main.navigate("", { trigger: true });
					},
					statusCode: {
						403: function() {
                            that.ui.loginForm.addClass("has-error");
						}
					}
				});
			}
        }
    });
});