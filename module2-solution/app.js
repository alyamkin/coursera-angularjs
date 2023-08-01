(function () {
  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ShoppingListFirstController', ShoppingListFirstController)
    .factory('ShoppingListServiceFactory', ShoppingListServiceFactory)
    .provider('ShoppingListService', ShoppingListServiceProvider)
    .config(Config);

  Config.$inject = ['ShoppingListServiceProvider'];

  function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.defaults.maxItems = 7;
  }

  ShoppingListFirstController.$inject = ['ShoppingListService'];
  function ShoppingListFirstController(ShoppingListService) {
    const shoppingList = this;
    // const maxItems = 2;

    const service = ShoppingListService;
    shoppingList.itemName = '';
    shoppingList.itemQuantity = '';

    shoppingList.items = service.getShoppingItems();

    shoppingList.addItem = function () {
      try {
        service.addShoppingItem(
          shoppingList.itemName,
          shoppingList.itemQuantity
        );
      } catch (error) {
        shoppingList.errorMessage = error.message;
      }
    };

    shoppingList.removeItem = function (index) {
      service.removeItem(index);

      if (shoppingList.errorMessage && service.clearErrorMessage()) {
        shoppingList.errorMessage = '';
      }
    };
  }

  function ShoppingListServiceProvider() {
    provider = this;

    provider.defaults = {
      maxItems: 5,
    };

    provider.$get = function () {
      const shoppingListService = new ShoppingListService(
        provider.defaults.maxItems
      );

      return shoppingListService;
    };
  }

  function ShoppingListService(maxItems) {
    const service = this;
    const shoppingItems = [];

    service.getShoppingItems = function () {
      return shoppingItems;
    };

    service.addShoppingItem = function (name, quantity) {
      if (
        maxItems === undefined ||
        (maxItems && shoppingItems.length < maxItems)
      ) {
        const item = {
          name,
          quantity,
        };
        shoppingItems.push(item);
      } else {
        throw new Error('Max items (' + maxItems + ') reached.');
      }
    };

    service.removeItem = function (index) {
      shoppingItems.splice(index, 1);
    };

    service.clearErrorMessage = function () {
      return maxItems && shoppingItems.length < maxItems;
    };
  }

  function ShoppingListServiceFactory() {
    return function (maxItems) {
      return new ShoppingListService(maxItems);
    };
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    const toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    const bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    const service = this;

    const toBuyItems = [
      {
        name: 'cookies',
        quantity: 5,
      },
      {
        name: 'milk',
        quantity: 1,
      },
      {
        name: 'chocolate',
        quantity: 2,
      },
    ];
    const boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.buyItem = function (index) {
      const [item] = toBuyItems.splice(index, 1);
      boughtItems.push(item);
    };
  }
})();
