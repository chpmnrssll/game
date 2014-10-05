define(["views/users/item", "text!templates/users/collection.html"], function (ItemView, Template) {
    "use strict";

    return Backbone.Marionette.CompositeView.extend({
        itemView : ItemView,
        itemViewContainer : "tbody",
        template : _.template(Template),
        className : "container"
    });
});
