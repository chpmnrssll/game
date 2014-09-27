define([ "jquery", "underscore", "backbone", "marionette" ], function($, _, Backbone, Marionette) {
	return Backbone.Router.extend({
		routes: {
			"admin/pages": "pages",
			"admin/pages/create": "createPage",
			"admin/pages/update/:id": "updatePage",
			"admin/pages/delete/:id": "deletePage"
		},
		pages: function () {
			require([ "admin/pages/collectionView" ], function (View) {
				window.App.models.adminNav.set({ active: "pages" });
				window.App.navbar.show(window.App.views.adminNav);
				
				//update collection first
				window.App.collections.pages.fetch({
					success: function (collection, response, options) {
						window.App.content.show(new View({ collection: collection }));
					}
				});
			});
		},
		createPage: function () {
			require([ "admin/pages/model", "admin/pages/updateView" ], function (Model, View) {
				window.App.models.adminNav.set({ active: "pages" });
				window.App.navbar.show(window.App.views.adminNav);
				
				var page = new Model();
				window.App.content.show(new View({ model: page }));
			});
		},
		updatePage: function (id) {
			require([ "admin/pages/updateView" ], function (View) {
				window.App.models.adminNav.set({ active: "pages" });
				window.App.navbar.show(window.App.views.adminNav);
				
				//update collection first
				window.App.collections.pages.fetch({
					success: function (collection, response, options) {
						var page = collection.findWhere({ id: id });
						window.App.content.show(new View({ model: page }));
					}
				});
			});
		},
		deletePage: function (id) {
			if(confirm("Delete Page?")) {
				var page = window.App.collections.pages.findWhere({ id: id });
				page.destroy({
					success: function (model, response, options) {
						window.App.router.navigate("admin/pages", { trigger: true });
					}
				});
			}
		}
	});
});