define([ 'jquery', 'underscore', 'backbone', 'marionette', 'admin/users/model' ], function($, _, Backbone, Marionette, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: window.App.apiUrl + 'users/'
	});
});