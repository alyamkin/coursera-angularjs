(function () {
  'use strict';

  angular
    .module('CounterApp', [])
    .controller('CounterController', CounterController);

  CounterController.$inject = ['$scope'];
  function CounterController($scope) {
    const ctr = this;

    ctr.onceCounter = 0;
    ctr.counter = 0;
    ctr.name = 'Andrey';

    ctr.showNumberOfWatchers = function () {
      console.log('# of watchers', $scope.$$watchersCount);
      console.log('# of watchers', $scope);
    };

    ctr.countOnce = function () {
      console.log('Call function');
      ctr.onceCounter = 1;
    };

    ctr.upCounter = function () {
      ctr.counter++;
    };

    $scope.$watch(function () {
      console.log('Digest Loop Fired!');
    });

    console.log($scope);

    document
      .querySelector('#upCounterBtn')
      .addEventListener('click', function (e) {
        $scope.$apply(function () {
          ctr.counter++;
          console.log(ctr.counter);
        });
      });

    // $scope.$watch('onceCounter', function (newValue, oldValue) {
    //   console.log('onceCounter old value: ', oldValue);
    //   console.log('onceCounter new value: ', newValue);
    // });

    // $scope.$watch('counter', function (newValue, oldValue) {
    //   console.log('counter old value: ', oldValue);
    //   console.log('counter new value: ', newValue);
    // });
  }
})();
