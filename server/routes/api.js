var router = require('express').Router();
var User = require('./../models/user');
var jwt = require('jwt-simple');
var config = require('./../config/config');

module.exports = function() {

    router.post('/signup', function(req, res) {
        if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname) {
            return res.json({success: false, msg: 'Firstname, lastname, email and password are required'});
        } else {
            var newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            });
    
            newUser.save(function(err) {
                if (err) {
                    return res.json({
                        success: false,
                        msg: "User with given email already exists."
                    });
                }
                return res.json({
                    success: true,
                    msg: "Successful created new user."
                });
            });
        }
    });

    router.post('/authenticate', function(req, res) {
        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.send({ success: false, msg: 'Authentiation failed.'});
            } else {
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        return res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        return res.send({ success: false, msg: 'Authentication failed' });
                    }
                });
            }
        });
    });

    router.isUserAllowed = function(req, res, next) {
        console.log('Arrived at isUserAllowed');
        return next();
    };

    return router;
};