angular.module('trainings-portal.archive', [])

.controller('ArchiveController', function ($scope, $location, $route, Tickets) {
  $scope.data = {};

  $scope.getTickets = function() {
    Tickets.getArchive()
    .then(function(archivedTickets) {
      $scope.data.tickets = archivedTickets;
    })
    .catch(function(error) {
      if (error.status == 401) {
        console.log('$route: ', $route);
        $location.path('/login');
      } else {
        console.error("Error: ", error);
      }
    });
  };


  $scope.getTickets();

  $scope.openTicket = function(ticket) {
    ticket.archive = false;
    
    Tickets.updateTicket(ticket)
      .then(function() {
        $route.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.deleteTicket = function(ticket) {
    Tickets.deleteTicket(ticket)
      .then(function() {
        $route.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.name = 'ArchiveController';
});