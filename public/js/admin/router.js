define([ "jquery", "underscore", "backbone", "marionette", "admin/users/router", "admin/categories/router", "admin/pages/router" ],
	function($, _, Backbone, Marionette, UsersRouter, CategoriesRouter, PagesRouter) {
	return Backbone.Router.extend({
		routes: {
			"admin": "admin",
		},
		initialize: function () {
			this._subRouters = {
				users: new UsersRouter(),
				categories: new CategoriesRouter(),
				pages: new PagesRouter()
			}
			
			require([ "admin/nav/model", "admin/nav/view" ], function (Model, View) {
				window.App.models.adminNav = new Model();
				window.App.views.adminNav = new View({ model: window.App.models.adminNav });
			});
		},
		admin: function () {
			require([ "admin/collectionView" ], function (View) {
				window.App.models.adminNav.set({ active: "admin" });
				window.App.navbar.show(window.App.views.adminNav);
				
				//update collection first
				window.App.collections.pages.fetch({
					success: function (collection, response, options) {
						collection.set(collection.filter(
							function (page) {
								return page.get("category") === "Admin";
							}
						));
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		}
	});
});