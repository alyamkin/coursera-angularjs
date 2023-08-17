(function () {
  'use strict';

  angular
    .module('ShoppingList')
    .controller('ItemDetailController', ItemDetailController);

  ItemDetailController.$inject = ['$stateParams', 'items'];
  function ItemDetailController($stateParams, items) {
    const itemDetail = this;

    const item = items[$stateParams.itemId];
    console.log(item);
    itemDetail.name = item.name;
    itemDetail.description = item.description;
    itemDetail.quantity = item.quantity;
  }
})();
