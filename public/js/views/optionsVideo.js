define(["text!templates/optionsVideo.html"], function (Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        template : _.template(Template)
    });
});
