define(["text!templates/users/update.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
        className : "container",
        events : {
            "click #userSave" : function (event) {
                this.model.save({
                    name : $("#userName").val(),
                    password : $("#userPassword").val(),
                    email : $("#userEmail").val()
                }, {
                    success : function (model, response, options) {
                        window.App.collections.users.add(model);
                        window.App.router.navigate("auath/manage/users", {
                            trigger : true
                        });
                    }
                });
            },
            "click #userCancel" : function (event) {
                window.App.router.navigate("auth/manage/users", {
                    trigger : true
                });
            }
        }
    });
});
