var express = require('express');
var bodyParser = require('body-parser');

var Login = require('../models/authentication/login');
var authToken = require('../web/router/authentication/token');
var app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    }));

// authentication token request
app.post('/auth/token', function (req, res) {
    if (req.body.username && req.body.password) {
        var login = new Login({ userName: req.body.username, password: req.body.password });

    } else {
        res.status(401);
    }

    // Attempt to get token
    try {

        authToken.GetToken(login).then(function (token) {
            if (token) {
                res.status(200).send(token);
            } else {
                res.status(401).send();
            }
        });
    }
    catch (err) {
        console.log("Danger Will Robinson!" + err);
        res.status(401).send(err);
    }
    console.log("Done");


});

app.listen(5000, function () {
    console.log("Express running");
});