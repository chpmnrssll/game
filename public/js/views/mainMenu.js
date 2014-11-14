define(["text!templates/mainMenu.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template),
    });
});
