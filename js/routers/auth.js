define([], function () {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "auth/manage(/:collection(/:document))" : "manage",
            "auth/settings" : "settings",
        },
        manage : function (collection, document) {
            if ((typeof collection == "string") && (!document)) {
                var url = "views/manage_" + collection;
                require([url], function (View) {
                    window.App.navbarModel.set("active", "manage");
                    window.App.content.show(new View());
                });
            }
        },
        settings : function () {
            require(["views/settings"], function (View) {
                window.App.navbarModel.set("active", "settings");
                window.App.content.show(new View());
            });
        }
    });
});
