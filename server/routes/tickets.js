const router = require('express').Router();
const requestHandler = require('../request-handler.js');
var api = require('./api')();

module.exports = function(passport) {

    router.get('/open',
        passport.authenticate('jwt', { session: false }),
        api.isUserAllowed,
        requestHandler.getOpenTickets);

    router.get('/archive',
        passport.authenticate('jwt', { session: false }),
        api.isUserAllowed,
        requestHandler.getArchivedTickets);

    router.post('/ticket', 
        passport.authenticate('jwt', { session: false }),
        api.isUserAllowed,
        requestHandler.submitTicket);

    router.put('/ticket',
        passport.authenticate('jwt', { session: false }),
        api.isUserAllowed,
        requestHandler.updateTicket);

    router.post('/delete',
        passport.authenticate('jwt', { session: false }),
        api.isUserAllowed,
        requestHandler.deleteTicket);

    return router;
}
