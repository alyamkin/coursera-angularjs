(function () {
  'use strict';

  angular.module('MenuApp').config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/home.template.html',
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories-list.template.html',
        controller: 'CategoriesListController as categoriesList',
        resolve: {
          categoriesData: [
            'MenuDataService',
            function (MenuDataService) {
              return MenuDataService.getAllCategories();
            },
          ],
        },
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/items-list.template.html',
        controller: 'ItemsListController as itemsList',
        resolve: {
          itemsData: [
            'MenuDataService',
            '$stateParams',
            function (MenuDataService, $stateParams) {
              return MenuDataService.getItemsForCategory(
                $stateParams.categoryShortName
              );
            },
          ],
        },
      });
  }
})();
