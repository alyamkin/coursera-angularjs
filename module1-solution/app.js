(function () {
  'use strict';
  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.dishes = '';
    $scope.message = '';
    $scope.numDishes = 0;

    $scope.checkDishes = function () {
      $scope.numDishes = calculateDishes($scope.dishes);
      $scope.message = getMessage($scope.numDishes);
    };

    const calculateDishes = function (dishes) {
      return dishes.split(',').filter((dish) => dish).length;
    };

    const getMessage = function (items) {
      console.log(items);
      if (items === 0) {
        return 'Please enter data first';
      } else if (items <= 3) {
        return 'Enjoy!';
      } else {
        return 'Too much!';
      }
    };
  }
})();
