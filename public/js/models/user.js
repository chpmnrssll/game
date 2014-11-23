define([], function () {
    "use strict";

    return Backbone.Model.extend({
        urlRoot : window.App.apiUrl + "users",
        defaults : {
            name : "",
            email : ""
        }
    });
});
