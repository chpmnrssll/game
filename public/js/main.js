require.config({
    urlArgs : "bust=" + new Date().getTime(),
    paths : {
        "backbone" : "libs/backbone/backbone-min",
        "bootstrap" : "libs/bootstrap/bootstrap.min",
        "jquery" : "libs/jquery/jquery-2.0.3.min",
        "marionette" : "libs/marionette/backbone.marionette.min",
        "underscore" : "libs/underscore/underscore-min"
    },
    shim : {
        "backbone" : {
            deps : [ "jquery", "underscore" ],
            exports : "Backbone"
        },
        "bootstrap" : {
            deps : [ "jquery" ]
        },
        "jquery" : {
            exports : "$"
        },
        "marionette" : {
            deps : [ "jquery", "underscore", "backbone" ],
            exports : "Marionette"
        },
        "underscore" : {
            exports : "_"
        }
    }
});

require(
    [ "backbone", "bootstrap", "jquery", "marionette", "underscore"],
    function (Backbone, Bootstrap, $, Marionette, _) {
        "use strict";
        
        window.App = new Marionette.Application();
        window.App.addInitializer(function (options) {
            require([ "routers/mainMenu" ], function (mainMenuRouter) {
                window.App.apiUrl = "http://localhost/";
                
                window.App.routers = {
                    mainMenu : new mainMenuRouter()
                };
                
                window.App.addRegions({
                    content : "#content"
                });
                
                if (Backbone.history) {
                    Backbone.history.start();
                }
            });
        });
        
        /*
        require(["collections/pages"], function (PagesCollection) {
            window.App.collections = {
                pages : new PagesCollection()
            };

            _.each(window.App.collections, function (collection, key, list) {
                collection.fetch();
            });

            if (Backbone.history) {
                Backbone.history.start();
            }
        });
        */
    window.App.start();
});