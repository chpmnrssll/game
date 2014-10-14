define([], function () {
    "use strict";

    return Backbone.Model.extend({
        defaults: {
            username: "",
            password: ""
        },
        validate: function(attrs) {
            var errors = [];
            if(!attrs.username) {
                errors.push({ message: "Username required." });
            }
            if(!attrs.password) {
                errors.push({ message: "Password required." });
            }
            return errors.length > 0 ? errors : false;
        }
    });
});