var mongoose = require('mongoose');

var ticketScheema = mongoose.Schema({
    author: String,
    subject: String,
    issue: String,
    chatUrl: String,
    archive: Boolean,
    status: Boolean
});

module.exports = mongoose.model('Ticket', ticketScheema);