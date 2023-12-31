(function () {
  'use strict';

  angular
    .module('ShoppingListComponentApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .component('shoppingList', {
      templateUrl: 'shoppingList.html',
      controller: ShoppingListComponentController,
      bindings: {
        items: '<',
        myTitle: '@title',
        onRemove: '&',
      },
    });

  ShoppingListComponentController.inject = ['$scope', '$element'];
  function ShoppingListComponentController($scope, $element) {
    const $ctrl = this;
    let totalItems;

    $ctrl.cookiesInList = function () {
      for (let i = 0; i < $ctrl.items.length; i++) {
        let name = $ctrl.items[i].name;
        if (name.toLowerCase().indexOf('cookie') !== -1) {
          return true;
        }
      }

      return false;
    };

    $ctrl.remove = function (myIndex) {
      $ctrl.onRemove({ index: myIndex });
    };

    $ctrl.$onInit = function () {
      console.log('We are in $onInit()');
      totalItems = 0;
      console.log(totalItems);
    };

    $ctrl.$onChanges = function (changeObj) {
      console.log('Changes: ', changeObj);
    };

    // $ctrl.$postLink = function () {
    //   $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
    //     const el = $element[0].querySelector('.error');
    //     if (newValue) {
    //       el.style.display = 'block';
    //     } else {
    //       el.style.display = 'none';
    //     }
    //   });
    // };

    $ctrl.$doCheck = function () {
      if ($ctrl.items.length !== totalItems) {
        totalItems = $ctrl.items.length;
        const el = $element[0].querySelector('.error');
        if ($ctrl.cookiesInList()) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      }
      console.log(totalItems);
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
      this.lastRemoved = 'Last item removed was ' + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title = origTitle + ' (' + list.items.length + ' items )';
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
