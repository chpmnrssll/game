define(["text!templates/categories/update.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
        className : "container",
        events : {
            "click #categorySave" : function (event) {
                this.model.save({
                    name : $("#categoryName").val(),
                }, {
                    success : function (model, response, options) {
                        window.App.collections.categories.add(model);
                        window.App.router.navigate("auth/manage/categories", {
                            trigger : true
                        });
                    }
                });
            },
            "click #categoryCancel" : function (event) {
                window.App.router.navigate("admin/categories", {
                    trigger : true
                });
            }
        }
    });
});
