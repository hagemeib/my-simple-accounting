TrainingsPortal.directive('pageHeader', function(AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/pageHeader.directive.html',
        scope: {},
        link: function(scope) {
            scope.isOutside = function() {
                return !AuthService.isAuthenticated();
            }
        }
    }
});