(function () {
  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBaseUrl', 'https://coursera-jhu-default-rtdb.firebaseio.com');

  function foundItemsDirective() {
    return {
      templateUrl: 'foundItems.html',
      scope: {
        foundItemsList: '<',
        onRemove: '&',
      },
      controller: foundItemsController,
      controllerAs: 'foundList',
      bindToController: true,
    };
  }

  function foundItemsController() {}

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    const narrowItDown = this;

    narrowItDown.searchTerm = '';
    narrowItDown.getMatchedMenuItems = function () {
      if (!narrowItDown.searchTerm) {
        narrowItDown.found = [];
        return;
      }

      narrowItDown.isLoading = true;
      MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm)
        .then(function (result) {
          narrowItDown.found = result;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          narrowItDown.isLoading = false;
        });
    };
    narrowItDown.removeItem = function (index) {
      narrowItDown.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBaseUrl'];
  function MenuSearchService($http, ApiBaseUrl) {
    const service = this;

    service.getMatchedMenuItems = function (serachTerm) {
      return $http({
        url: `${ApiBaseUrl}/menu_items.json`,
        method: 'GET',
      }).then(function (result) {
        const resultFiltered = [];
        for ([menu, value] of Object.entries(result.data)) {
          const menuItems = result.data[menu].menu_items;
          const matches = menuItems.filter(function (menu_item) {
            return menu_item.description.includes(serachTerm);
          });

          resultFiltered.push(...matches);
        }
        return resultFiltered;
      });
    };
  }
})();
