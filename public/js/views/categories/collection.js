define(["views/categories/item", "text!templates/categories/collection.html"], function (ItemView, Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        itemView : ItemView,
        itemViewContainer : "tbody",
        template : _.template(Template),
        className : "container"
    });
});
