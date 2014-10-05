define(["text!templates/users/item.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.ItemView.extend({
        template : _.template(Template),
        tagName : "tr"
    });
});
