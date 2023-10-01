(function () {
  'use strict';

  angular
    .module('MenuApp')
    .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['categoriesData'];
  function CategoriesListController(categoriesData) {
    const categoriesList = this;

    categoriesList.categories = categoriesData.data;
  }
})();
