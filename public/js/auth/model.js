define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Model.extend({
		defaults: {
			username: "",
			password: "",
			auth: false
		},
		urlRoot: window.App.apiUrl + "auth/",
		parse: function (response, options) {
			response.id = response._id;		//stupid backbone.js->mongoDB id confusion!!!
			delete response._id;
			return response;
		}
	});
});