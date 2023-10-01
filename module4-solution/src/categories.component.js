(function () {
  'use strict';

  angular.module('MenuApp').component('categories', {
    templateUrl: 'src/categories.template.html',
    controller: CategoriesComponentController,
    bindings: {
      categories: '<',
    },
  });

  function CategoriesComponentController() {
    const $ctrl = this;
  }
})();
