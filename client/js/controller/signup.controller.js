TrainingsPortal.controller('SignupController', function($scope, AuthService, $state) {
    $scope.user = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    };

    $scope.signup = function() {
        AuthService.register($scope.user).then(function(msg) {
          $state.go('welcome.login');
          alert(msg);
        }, function(errMsg) {
          alert(errMsg);
        });
      };
})