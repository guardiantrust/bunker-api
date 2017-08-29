var express = require('express');
var bodyParser = require('body-parser');
var date = require('time');
var Login = require('../models/authentication/login');
var Company = require('../app/models/company');
var authToken = require('../web/router/authentication/token');
var companyMethods = require('../web/router/company/companyMethods');
var app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    }));

app.use(bodyParser.json());

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
});

// company GET request
app.get('/api/companies/:companyID', function (req, res) {
    try {

        var id = req.params.companyID;

        companyMethods.GetCompany(id).then(function (company) {
            if (company) {
                res.status(200).send(company);
            } else {

                res.status(401).send();
            }
        });


    } catch (err) {
        console.log("Error in getting Company by Id - " + err);
        res.status(401).send();
    }
});

app.get('/api/companies', function (req, res) {
    try {
        companyMethods.GetCompanies().then(function (companies) {
            if (companies) {
                res.status(200).send(companies);
            }
            else {
                res.status(401).send();
            }
        });
    }
    catch (err) {
        console.log("Error in getting Companies - " + err);
        res.status(500).send();
    }
});

app.delete('/api/companies/:companyID', function (req, res){
    try{
        var id = req.params.companyID;
        
        companyMethods.InactivateCompany(id).then(function () {
            res.status(200).send();
        });
        
    } catch(err)
    {
        console.error("Error deleting Company:" + err);
        res.status(500).send();
    }
});

app.post('/api/companies', function (req, res) {
    try {
        // create company schema
        if (req.body) {
            var reqBody = req.body;
            var created = date.Date();
            var company = new Company({
                name: reqBody.name,
                address1: reqBody.address1,
                address2: reqBody.address2,
                city: reqBody.city,
                state: reqBody.state,
                zipCode: reqBody.zipCode,
                postal: reqBody.postal,
                contactEmail: reqBody.contactEmail,
                phoneNumber: reqBody.phoneNumber,
                created: created,
                isActive: true,
                isSuspended: false
            });
            // Save Comapny
            companyMethods.CreateCompany(company);
            // send response
            res.status(200).send(company._id.toString());
        } else {
            res.status(401).send();
        }
    } catch (err) {
        console.log("Error in Creating Company: " + err);
        res.sendStatus(500).send();
    }
});


app.listen(5000, function () {
    console.log("Express running");
});