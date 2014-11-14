define(["text!templates/options.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template)
    });
});
