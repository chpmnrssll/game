define([ 'jquery', 'underscore', 'backbone', 'marionette', 'admin/pages/model' ], function($, _, Backbone, Marionette, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: window.App.apiUrl + 'pages/'
	});
});