var TrainingsPortal = TrainingsPortal || angular.module('trainings-portal', ['ui.router']);

TrainingsPortal.config(function ($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: '../views/welcome.html',
      requireLogin: false
    })
    .state('login', {
      url: '/login',
      templateUrl: '../views/welcome.login.html',
      requireLogin: false,
      controller: 'AuthenticationController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../views/welcome.signup.html',
      requireLogin: false,
      controller: 'SignupController'
    })
    .state('app', {
      url: '',
      abstract: true,
      requireLogin: true
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../views/dashboard.html',
      requireLogin: true
    });

  $urlRouterProvider.otherwise('/welcome');

})

.run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    var requireLogin = toState.requireLogin;
    if (requireLogin && !AuthService.isAuthenticated()) {
      event.preventDefault();
      $state.go('login');
    }
  });
});