define([], function () {
    "use strict";

    return Backbone.Model.extend({
        defaults: {
            current: "",
            keyboard: {}
        },
        initialize: function() {
            var that = this;
            window.addEventListener("keydown", function(event) {
                //event.preventDefault();
                var _pressed = that.get("keyboard");
                _pressed[event.keyCode] = true;
                that.set("keyboard", _pressed);
            }, false);
            window.addEventListener("keyup", function(event) {
                //event.preventDefault();
                var _pressed = that.get("keyboard");
                delete _pressed[event.keyCode];
                that.set("keyboard", _pressed);
            }, false);
        }
    });
});