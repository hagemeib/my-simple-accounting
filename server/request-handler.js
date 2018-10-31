
var Ticket = require('./models/ticket');
var mongoose = require('mongoose');

exports.submitTicket = function(req, res) {
  const ticket = req.body;

  var newTicket = new Ticket(ticket);
  newTicket.save(function (err) {
    if (err)
      throw err;
    return res.json(newTicket);
  });

};

exports.getOpenTickets = function(req, res) {
  Ticket.find({'archive': false}, function(err, tickets) {
    if (err)
      throw err;
    return res.json(tickets);
  });
};

exports.getArchivedTickets = function(req, res) {
    Ticket.find({'archive': true}, function(err, tickets) {
        if (err)
            throw err;
        return res.json(tickets);
    });
};

exports.updateTicket = function(req, res) {
    const id = req.body._id;
    const ticket = Object.assign({}, req.body);

    Ticket.findByIdAndUpdate(id, ticket, function(err, updatedTicket) {
      if (err) {
        throw err;
      }
      return res.json([]);
    });
};

exports.deleteTicket = function(req, res) {
  const id = req.body._id;

  Ticket.findByIdAndRemove(id, function(err, deletedTicket) {
    if (err) {
      throw err;
    }
    return res.json([]);
  });
};
