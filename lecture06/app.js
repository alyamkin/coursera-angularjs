(function () {
  'use strict';

  angular
    .module('nameCalculator', [])
    .controller('nameCalculatorController', function ($scope) {
      $scope.name = '';
      $scope.totalValue = 0;

      $scope.displayNumeric = function () {
        $scope.totalValue = calculateStringNumeric($scope.name);
      };

      const calculateStringNumeric = function (str) {
        console.log(str);
        let totalStringLength = 0;
        for (let char of str) {
          totalStringLength += char.charCodeAt(0);
        }

        return totalStringLength;
      };
    });
})();
