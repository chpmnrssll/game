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
            "register" : "loadView",
            "profile" : "loadView",
            "login" : "loadView",
            "logout" : "logout",
            "*actions" : "error"
        },
        loadView : function () {
            require(["views/" + (Backbone.history.fragment || "mainMenu")], function (View) {
                window.App.content.show(new View());
            });
        },
        logout : function () {
            window.App.session.set({
                loggedIn : false
            });
            window.App.routers.mainMenu.navigate("mainMenu", {
                trigger : true
            });
        },
        error : function () {
            console.log("Route: " + Backbone.history.fragment + " not found");
        }
    });
});
