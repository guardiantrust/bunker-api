var express = require('express');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var Login = require('../models/authentication/login');
var authToken = require('../web/router/authentication/token');
var app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    }));

// authentication token request
app.post('/auth/token', function (req, res) {
    var token;
    if (req.body.username && req.body.password) {
        var pass = passwordHash.generate(req.body.password);
        console.log(pass);
        var login = new Login({ userName: req.body.username, password: pass });
    } else {
        res.status(401);
    }

    // Attempt to get token
    try {
        var t = authToken.GetToken(login);
        console.log(t);
        if (token) {
            res.status(200).send(token);
        } else {
            res.status(401).send();
        }
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