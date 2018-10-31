angular.module('trainings-portal.factories', [])

.factory('Tickets', function ($http) {

  var getOpen = function() {
    return $http({
      method: 'GET',
      url: '/ticket/open'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getArchive = function() {
    return $http({
      method: 'GET',
      url: '/ticket/archive'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var submitTicket = function(ticket) {
    return $http({
      method: 'POST',
      url: '/ticket/ticket',
      data: ticket
    });
  };

  var updateTicket = function(data) {
    return $http({
      method: 'PUT',
      url: '/ticket/ticket',
      data: data
    });
  };

  var deleteTicket = function(ticket) {
    return $http({
      method: 'POST',
      url: '/ticket/delete',
      data: ticket
    });
  };

  return {
    getOpen: getOpen,
    getArchive: getArchive,
    submitTicket: submitTicket,
    updateTicket: updateTicket,
    deleteTicket: deleteTicket
  };
});
