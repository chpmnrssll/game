define([], function () {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "" : "loadView",
            "mainMenu" : "loadView",
            "options" : "loadView",
            "optionsAudio" : "loadView",
            "optionsVideo" : "loadView",
            "optionsControl" : "loadView",
            "login" : "loadView",
            "register" : "loadView",
            "*actions" : "error"
        },
        loadView : function () {
            require(["views/" + (Backbone.history.fragment || "mainMenu")], function (View) {
                window.App.content.show(new View());
            });
        },
        error : function () {
            console.log("Route: " + Backbone.history.fragment + " not found");
        }
    });
});
