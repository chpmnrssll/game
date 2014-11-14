define(["text!templates/optionsControl.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template)
    });
});
