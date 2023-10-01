(function () {
  'use strict';

  angular
    .module('MenuApp')
    .controller('ItemsListController', ItemsListController);

  ItemsListController.$inject = ['itemsData'];
  function ItemsListController(itemsData) {
    const itemsList = this;

    itemsList.items = itemsData.data.menu_items;
  }
})();
