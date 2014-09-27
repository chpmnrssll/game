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
            deps : ["jquery", "underscore"],
            exports : "Backbone"
        },
        "bootstrap" : {
            deps : ["jquery"]
        },
        "jquery" : {
            exports : "$"
        },
        "marionette" : {
            deps : ["jquery", "underscore", "backbone"],
            exports : "Marionette"
        },
        "underscore" : {
            exports : "_"
        }
    }
});

require(
    [
        "backbone",
        "bootstrap",
        "jquery",
        "marionette",
        "underscore"
    ],
    function (Backbone, Bootstrap, $, Marionette, _) {
    "use strict";

    window.App = new Marionette.Application();
    //window.App.apiUrl = "http://chpmn-rssll.rhcloud.com/";
    window.App.apiUrl = "http://localhost/api/";
    window.App.addInitializer(function (options) {
        require(["routers/main", "routers/auth"], function (MainRouter, AuthRouter) {
            window.App.routers = {
                main : new MainRouter(),
                auth : new AuthRouter()
            };
        });
        
        require(["models/navbar","views/navbar"], function (NavbarModel, NavbarView) {
            window.App.addRegions({
                navbar : "#navbar",
                content : "#content"
            });

            window.App.navbarModel = new NavbarModel();
            window.App.navbarView = new NavbarView({ model : window.App.navbarModel })
            window.App.navbar.show(window.App.navbarView);
        });

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
        

        /*
        require(["auth/model", "auth/view" ], function (AuthModel, AuthView) {

            window.App.models = {
                auth : new AuthModel()
            };

            window.App.views = {
                auth : new AuthView({
                    model : window.App.models.auth
                })
            };

            window.App.navbar.show(window.App.views.auth);
            });

            //console.log("window.App.initialize");
        */
    });

    window.App.start();
});
