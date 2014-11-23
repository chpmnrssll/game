define(["text!templates/mainMenu.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
        ui : {
            linkOptions : "#linkOptions",
            linkLogin : "#linkLogin",
            linkRegister : "#linkRegister",
            linkProfile : "#linkProfile",
            linkAdmin : "#linkAdmin",
            linkLogout : "#linkLogout"
        },
        onRender : function () {
            if (window.App.session.get("loggedIn")) {
                this.ui.linkLogin.addClass("hidden");
                this.ui.linkRegister.addClass("hidden");
                this.ui.linkProfile.removeClass("hidden");
                this.ui.linkAdmin.removeClass("hidden");
                this.ui.linkLogout.removeClass("hidden");
            }
        }
    });
});
