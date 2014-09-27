define([], function () {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "" : "home",
            "*actions" : "error"
        },
        home : function () {
            require(["views/home"], function (View) {
                window.App.navbarModel.set("active", "home");
                window.App.content.show(new View());
            });
        },
        error : function () {
            console.log("Route: " + Backbone.history.fragment + " not found");
        }
    });
});
