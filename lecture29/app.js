(function () {
  'use strict';

  angular
    .module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .controller(
      'ShoppingListDirectiveController',
      ShoppingListDirectiveController
    )
    .directive('shoppingList', ShoppingListDirective);

  function ShoppingListDirective() {
    var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        items: '<',
        title: '@',
      },
      controller: 'ShoppingListDirectiveController as list',
      // controller: ShoppingListDirectiveController,
      // controllerAs: 'list',
      bindToController: true,
    };

    return ddo;
  }

  function ShoppingListDirectiveController() {
    const list = this;

    list.cookiesInList = function () {
      const hasCookies = list.items.some(
        (item) => item.name.toLowerCase().indexOf('cookie') !== -1
      );

      return hasCookies;
    };
  }

  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory) {
    var list = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    list.items = shoppingList.getItems();
    var origTitle = 'Shopping List #1';
    list.title = origTitle + ' (' + list.items.length + ' items )';

    list.itemName = '';
    list.itemQuantity = '';

    list.addItem = function () {
      shoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + ' (' + list.items.length + ' items )';
    };

    list.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
      list.title = origTitle + ' (' + list.items.length + ' items )';
    };
  }

  // If not specified, maxItems assumed unlimited
  function ShoppingListService(maxItems) {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      if (
        maxItems === undefined ||
        (maxItems !== undefined && items.length < maxItems)
      ) {
        var item = {
          name: itemName,
          quantity: quantity,
        };
        items.push(item);
      } else {
        throw new Error('Max items (' + maxItems + ') reached.');
      }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }

  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };

    return factory;
  }
})();
