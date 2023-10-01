(function () {
  'use strict';

  angular.module('MenuApp').component('items', {
    templateUrl: 'src/items.template.html',
    controller: ItemsComponentController,
    bindings: {
      items: '<',
    },
  });

  function ItemsComponentController() {
    const $ctrl = this;
  }
})();
