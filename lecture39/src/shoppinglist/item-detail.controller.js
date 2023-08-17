(function () {
  'use strict';

  angular
    .module('ShoppingList')
    .controller('ItemDetailController', ItemDetailController);

  ItemDetailController.$inject = ['item'];
  function ItemDetailController(item) {
    var itemDetail = this;
    itemDetail.name = item.name;
    itemDetail.description = item.description;
    itemDetail.quantity = item.quantity;
  }
})();
