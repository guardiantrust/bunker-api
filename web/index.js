var express = require('express');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var Login = require('../models/authentication/login');
var tokenizer = require('../web/router/authentication/token');
var app = express();

bodyParser.urlencoded({
    extended: true
});

// authentication token request
app.post('/auth/token', function (req, res) {
    if (req.body.username && req.body.password) {
        var login = new Login({ userName: req.body.username, password: passwordHash.generate(req.body.password) });
    } else {
        res.status(401);
    }

    // Attempt to get token
    try {
        var token = tokenizer.GetToken(login);
        if (token) {
            res.status(200).send(token);
        } else {
            res.status(401);
        }
    }
    catch (err) {
        res.status(401).send(err);
    }


});

app.listen(5000, function() {
    console.log("Express running");
});