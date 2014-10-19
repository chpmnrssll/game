define(["text!templates/register.html"], function (Template) {
    "use strict";
    
    return Backbone.Marionette.CompositeView.extend({
        template: _.template(Template),
        ui: {
            formRegister: "#formRegister",
            groupUsername: "#groupUsername",
            groupPassword: "#groupPassword",
            groupPasswordCheck: "#groupPasswordCheck",
            groupEmail: "#groupEmail",
            inputUsername: "#inputUsername",
            inputPassword: "#inputPassword",
            inputPasswordCheck: "#inputPasswordCheck",
            inputEmail: "#inputEmail",
            alertUsername: "#alertUsername",
            alertPassword: "#alertPassword",
            alertPasswordCheck: "#alertPasswordCheck",
            alertEmail: "#alertEmail",
            alertError: "#alertError"
        },
        events: {
            "click #btnRegister": function (e) {
                e.preventDefault();
                var self = this;
                var data = {
                    username: self.ui.inputUsername.val(),
                    password: self.ui.inputPassword.val(),
                    passwordCheck: self.ui.inputPasswordCheck.val(),
                    email: self.ui.inputEmail.val()
                }
                
                if(data.username.length === 0) {
                    self.ui.groupUsername.addClass("has-error");
                    self.ui.alertUsername.removeClass("hidden");
                    self.ui.inputUsername.focus();
                    return false;
                } else {
                    self.ui.groupUsername.removeClass("has-error");
                    self.ui.alertUsername.addClass("hidden");
                }
                
                if(data.password.length === 0) {
                    self.ui.groupPassword.addClass("has-error");
                    self.ui.alertPassword.removeClass("hidden");
                    self.ui.inputPassword.focus();
                    return false;
                } else {
                    self.ui.groupPassword.removeClass("has-error");
                    self.ui.alertPassword.addClass("hidden");
                }
                
                if(data.password !== data.passwordCheck) {
                    self.ui.groupPasswordCheck.addClass("has-error");
                    self.ui.alertPasswordCheck.removeClass("hidden");
                    self.ui.groupPassword.addClass("has-error");
                    self.ui.inputPasswordCheck.focus();
                    return false;
                } else {
                    self.ui.groupPasswordCheck.removeClass("has-error");
                    self.ui.alertPasswordCheck.addClass("hidden");
                    self.ui.groupPassword.removeClass("has-error");
                }
                
                if(data.email.length === 0) {
                    self.ui.groupEmail.addClass("has-error");
                    self.ui.alertEmail.removeClass("hidden");
                    self.ui.inputEmail.focus();
                    return false;
                } else {
                    self.ui.groupEmail.removeClass("has-error");
                    self.ui.alertEmail.addClass("hidden");
                }
                
                self.ui.formRegister.removeClass("has-error");
                self.ui.alertError.addClass("hidden");
                
                $.ajax({
                    type: "POST",
                    url: window.App.apiUrl + "register/",
                    data: data,
                    dataType: "application/json",
                    statusCode: {
                        200: function(data) {
                            self.ui.formRegister.removeClass("has-error");
                            window.App.routers.mainMenu.navigate("login", { trigger: true });
                            //console.log(JSON.parse(data.responseText));
                        },
                        401: function(data) {
                            self.ui.groupUsername.addClass("has-error");
                            self.ui.inputUsername.focus();
                            self.ui.formRegister.addClass("has-error");
                            self.ui.alertError.removeClass("hidden");
                            //console.log(JSON.parse(data.responseText));
                        }
                    }
                });
            }
        }
    });
});