define([], function () {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "admin" : "loadView",
        },
        loadView : function () {
            require(["views/" + (Backbone.history.fragment || "admin")], function (View) {
                window.App.content.show(new View());
            });
        }
    });
});
