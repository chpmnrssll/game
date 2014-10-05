define(["text!templates/settings.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template)
    });
});
