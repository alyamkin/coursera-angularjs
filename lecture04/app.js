(function () {
  'use strict';
  angular
    .module('myFirstApp', [])
    .controller('MyFirstController', function ($scope) {
      $scope.name = 'Andrey';
      $scope.sayHello = function () {
        return 'Hello coursera';
      };
    });
})();
