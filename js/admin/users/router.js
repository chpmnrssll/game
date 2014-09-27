define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin/users": "users",
			"admin/users/create": "createUser",
			"admin/users/update/:id": "updateUser",
			"admin/users/delete/:id": "deleteUser",
		},
		users: function () {
			require([ "admin/users/collectionView" ], function (View) {
				window.App.models.adminNav.set({ active: "users" });
				window.App.navbar.show(window.App.views.adminNav);
				
				//update collection first
				window.App.collections.users.fetch({
					success: function (collection, response, options) {
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		createUser: function () {
			require([ "admin/users/model", "admin/users/updateView" ], function (Model, View) {
				window.App.models.adminNav.set({ active: "users" });
				window.App.navbar.show(window.App.views.adminNav);
				
				var user = new Model();
				window.App.content.show(new View({ model: user }));
			});
		},
		updateUser: function (id) {
			require([ "admin/users/updateView" ], function (View) {
				window.App.models.adminNav.set({ active: "users" });
				window.App.navbar.show(window.App.views.adminNav);
				
				//update collection first
				window.App.collections.users.fetch({
					success: function (collection, response, options) {
						var user = collection.findWhere({ id: id });
						window.App.content.show(new View({ model: user }));
					}
				});
			});
		},
		deleteUser: function (id) {
			if(confirm("Delete User?")) {
				var model = window.App.collections.users.findWhere({ id: id });
				model.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/users", { trigger: true });
					}
				});
			}
		}
	});
});