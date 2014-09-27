define(["models/page"], function (Model) {
    "use strict";

    return Backbone.Collection.extend({
        model : Model,
        url : window.App.apiUrl + "pages/"
    });
});
