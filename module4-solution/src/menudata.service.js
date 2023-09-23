(function () {
  angular.module('data').service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    const service = this;

    service.getAllCategories = function () {
      const response = $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json',
      });

      return response;
    };
    console.log('Hello world');
  }
})();
