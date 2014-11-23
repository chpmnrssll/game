define(["text!templates/profile.html", "models/user"], function (Template, userModel) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
        ui : {
            formProfile : "#formProfile",
            groupUsername : "#groupUsername",
            groupPassword : "#groupPassword",
            groupPasswordCheck : "#groupPasswordCheck",
            groupEmail : "#groupEmail",
            inputUsername : "#inputUsername",
            inputPassword : "#inputPassword",
            inputPasswordCheck : "#inputPasswordCheck",
            inputEmail : "#inputEmail",
            alertUsername : "#alertUsername",
            alertPassword : "#alertPassword",
            alertPasswordCheck : "#alertPasswordCheck",
            alertEmail : "#alertEmail",
            alertError : "#alertError"
        },
        model : new userModel({ id : window.App.session.get("userId") }),
        onRender : function () {
            var self = this;
            
            this.model.fetch({
                headers : {
                    "Authorization" : window.App.session.get("tokenType") + " " + window.App.session.get("accessToken")
                },
                success : function (model, response, options) {
                    self.ui.inputUsername.val(model.get("name"));
                    self.ui.inputEmail.val(model.get("email"));
                }
            });
            this.ui.inputUsername.val(this.model.get("name"));
            this.ui.inputEmail.val(this.model.get("email"));
        },
        events : {
            "click #btnUpdate" : function (e) {
                e.preventDefault();
                var self = this;
                var data = {
                    name : self.ui.inputUsername.val(),
                    password : self.ui.inputPassword.val(),
                    passwordCheck : self.ui.inputPasswordCheck.val(),
                    email : self.ui.inputEmail.val()
                }

                if (data.name.length === 0) {
                    self.ui.groupUsername.addClass("has-error");
                    self.ui.alertUsername.removeClass("hidden");
                    self.ui.inputUsername.focus();
                    return false;
                } else {
                    self.ui.groupUsername.removeClass("has-error");
                    self.ui.alertUsername.addClass("hidden");
                }

                if (data.password !== data.passwordCheck) {
                    self.ui.groupPasswordCheck.addClass("has-error");
                    self.ui.alertPasswordCheck.removeClass("hidden");
                    self.ui.groupPassword.addClass("has-error");
                    self.ui.inputPasswordCheck.focus();
                    return false;
                } else {
                    self.ui.groupPasswordCheck.removeClass("has-error");
                    self.ui.alertPasswordCheck.addClass("hidden");
                    self.ui.groupPassword.removeClass("has-error");
                    delete data.passwordCheck;
                    if (data.password.length === 0) {
                        delete data.password;
                    }
                }

                if (data.email.length === 0) {
                    self.ui.groupEmail.addClass("has-error");
                    self.ui.alertEmail.removeClass("hidden");
                    self.ui.inputEmail.focus();
                    return false;
                } else {
                    self.ui.groupEmail.removeClass("has-error");
                    self.ui.alertEmail.addClass("hidden");
                }

                self.ui.formProfile.removeClass("has-error");
                self.ui.alertError.addClass("hidden");
                $.ajax({
                    type : "PUT",
                    url : window.App.apiUrl + "users/" + window.App.session.get("userId"),
                    headers : {
                        "Authorization" : window.App.session.get("tokenType") + " " + window.App.session.get("accessToken")
                    },
                    data : data,
                    success : function (data, status, req) {
                        self.ui.formProfile.removeClass("has-error");
                        window.App.routers.mainMenu.navigate("mainMenu", {
                            trigger : true
                        });
                    },
                    error : function (req, status, error) {
                        self.ui.groupUsername.addClass("has-error");
                        self.ui.inputUsername.focus();
                        self.ui.formProfile.addClass("has-error");
                        self.ui.alertError.removeClass("hidden");
                    }
                });
            }
        }
    });
});
