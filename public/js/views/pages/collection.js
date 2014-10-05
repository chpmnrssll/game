define(["views/pages/item", "text!templates/pages/collection.html"], function (ItemView, Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        itemView : ItemView,
        template : _.template(Template)
    });
});
