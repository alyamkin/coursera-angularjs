(function () {
  'use strict';

  angular.module('DIApp', []).controller('DIController', DIController);

  DIController.$inject = ['$scope', '$filter', '$injector'];

  function DIController($scope, $filter, $injector) {
    $scope.name = 'Yaakov';

    $scope.upper = function () {
      const upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
      console.log(upCase);
    };

    console.log($injector);
  }

  function annotateMe(name, job, blah) {
    return 'Blah!';
  }

  // console.log(annotateMe());
})();
