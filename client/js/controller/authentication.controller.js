TrainingsPortal.controller('AuthenticationController', function($scope, AuthService, $state) {
    $scope.User = { 
        email: '',
        password: ''
    };

    $scope.login = function() {
        AuthService.login($scope.User).then(function(msg) {
            $state.go('dashboard');
        }, function(errMsg) {
            alert(errMsg);
        })
    };

    $scope.logout = function() {
        AuthService.logout().then(function(msg) {
            $state.go('welcome');
        }, function(errMsg) {
            alert(errMsg);
        });
    };
});