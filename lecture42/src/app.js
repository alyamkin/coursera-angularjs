(function () {
  angular.module('SimpleFormsApp', []);

  angular
    .module('SimpleFormsApp')
    .controller('RegistrationController', RegistrationController);

  function RegistrationController() {
    var reg = this;

    // $scope.regForm = '';

    reg.submit = function () {
      reg.completed = true;
    };
  }
})();
