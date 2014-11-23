define(["text!templates/login.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
        ui : {
            formLogin : "#formLogin",
            groupUsername : "#groupUsername",
            groupPassword : "#groupPassword",
            inputUsername : "#inputUsername",
            inputPassword : "#inputPassword",
            alertUsername : "#alertUsername",
            alertPassword : "#alertPassword",
            alertUnauthorized : "#alertUnauthorized"
        },
        events : {
            "click #btnLogin" : function (e) {
                e.preventDefault();
                var self = this;
                var data = {
                    username : self.ui.inputUsername.val(),
                    password : self.ui.inputPassword.val()
                };

                if (data.username.length === 0) {
                    self.ui.groupUsername.addClass("has-error");
                    self.ui.alertUsername.removeClass("hidden");
                    self.ui.inputUsername.focus();
                    return false;
                } else {
                    self.ui.groupUsername.removeClass("has-error");
                    self.ui.alertUsername.addClass("hidden");
                }

                if (data.password.length === 0) {
                    self.ui.groupPassword.addClass("has-error");
                    self.ui.alertPassword.removeClass("hidden");
                    self.ui.inputPassword.focus();
                    return false;
                } else {
                    self.ui.groupPassword.removeClass("has-error");
                    self.ui.alertPassword.addClass("hidden");
                }

                self.ui.formLogin.removeClass("has-error");
                self.ui.alertUnauthorized.addClass("hidden");

                window.App.session.set(data);
                window.App.session.getAccessToken({
                    success : function () {
                        window.App.session.set({
                            loggedIn : true
                        });
                        window.App.routers.mainMenu.navigate("mainMenu", {
                            trigger : true
                        });
                    },
                    error : function () {
                        self.ui.inputUsername.focus();
                        self.ui.formLogin.addClass("has-error");
                        self.ui.alertUnauthorized.removeClass("hidden");
                    }
                });
            }
        }
    });
});
