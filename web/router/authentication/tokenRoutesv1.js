var express = require('express');
var router = express.Router();
var date = require('time');
var Login = require('../../../app/models/login');
var authToken = require('../../router/authentication/tokenMethods');

router.get('/validate', function(req, res) {
    try {
        var token = req.get('authToken');
        let decodedToken = authToken.ParseToken(token).then(function(decodedToken) {

            if (!decodedToken) {
                res.status(401).send();
            } else {
                res.status(200).send(decodedToken);
            }
        });

    } catch (err) {
        res.status(401);
        console.log(err);
    }
});

// authentication token request
router.post('/token', function(req, res) {

    if (req.body.username && req.body.password) {
        var login = new Login({ userName: req.body.username, password: req.body.password });
        if (!login) {
            res.status(401).send('Token not found');
        }
    } else {
        res.status(401);
    }

    // Attempt to get token
    try {

        authToken.GetToken(login).then(function(token) {
            if (token) {
                res.status(200).send(token);
            } else {
                res.status(403).send('Not Authorized');
            }
        });
    } catch (err) {
        console.log("Danger Will Robinson!" + err);
        res.status(401).send(err);
    }
});

module.exports = router;