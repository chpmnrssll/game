define([], function () {
    "use strict";
    
    return Backbone.Router.extend({
        routes : {
            "" : "mainMenu",
            "mainMenu" : "mainMenu",
            "play": "mainMenu",
            "edit" : "mainMenu",
            "options" : "options",
            "login" : "login",
            "*actions" : "error"
        },
        mainMenu : function () {
            require(["views/mainMenu"], function (View) {
                window.App.gameState.set("current", "mainMenu");
                window.App.content.show(new View());
            });
        },
        options : function () {
            require(["views/options"], function (View) {
                window.App.gameState.set("current", "options");
                window.App.content.show(new View());
            });
        },
        login : function () {
            require(["views/login"], function (View) {
                window.App.gameState.set("current", "login");
                window.App.content.show(new View());
            });
        },
        error : function () {
            console.log("Route: " + Backbone.history.fragment + " not found");
        }
    });
});