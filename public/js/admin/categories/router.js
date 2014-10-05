define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin/categories": "categories",
			"admin/categories/create": "createCategory",
			"admin/categories/update/:id": "updateCategory",
			"admin/categories/delete/:id": "deleteCategory"
		},
		categories: function () {
			require([ "admin/categories/collectionView" ], function (View) {
				window.App.models.adminNav.set({ active: "categories" });
				window.App.navbar.show(window.App.views.adminNav);
				
				//update collection first
				window.App.collections.categories.fetch({
					success: function (collection, response, options) {
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		createCategory: function () {
			require([ "admin/categories/model", "admin/categories/updateView" ], function (Model, View) {
				window.App.models.adminNav.set({ active: "categories" });
				window.App.navbar.show(window.App.views.adminNav);
				
				var category = new Model();
				window.App.content.show(new View({ model: category }));
			});
		},
		updateCategory: function (id) {
			require([ "admin/categories/updateView" ], function (View) {
				window.App.models.adminNav.set({ active: "categories" });
				window.App.navbar.show(window.App.views.adminNav);
				
				//update collection first
				window.App.collections.categories.fetch({
					success: function (collection, response, options) {
						var category = collection.findWhere({ id: id });
						window.App.content.show(new View({ model: category }));
					}
				});
			});
		},
		deleteCategory: function (id) {
			if(confirm("Delete Category?")) {
				var category = window.App.collections.categories.findWhere({ id: id });
				category.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/categories", { trigger: true });
					}
				});
			}
		}
	});
});