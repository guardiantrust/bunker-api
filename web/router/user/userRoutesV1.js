var express = require('express');
var router = express.Router();
var date = require('time');
var User = require('../../../app/models/user');
var userMethods = require('./userMethods');

// user GET request
router.get('/:userID', function (req, res) {
    try {

        var id = req.params.userID;

        userMethods.GetUser(id).then(function (user) {
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(401).send();
            }
        });
    } catch (err) {
        console.log("Error in getting Company by Id - " + err);
        res.status(401).send();
    }
});

router.post('/', function (req, res) {
    try{
        if (req.body) {
            var reqBody = req.body;
            var created = date.Date();
            var user = new User({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                phoneNumber: reqBody.phoneNumber,
                username: reqBody.username,
                userLevel: reqBody.userLevel,
                isActive: reqBody.isActive,
                sMS: reqBody.sMS,
                created: created,
                companyID: reqBody.companyID
            });
            userMethods.CreateUser(user).then(function (user) {
                if(user) {
                    res.status(200).send(user);
                } else {
                    res.status(401).send();
                }
            })
        } else {
            res.status(401).send();
        }
    } catch(err) {
        console.log("Error in Creating user - "  + err);
        res.status(401).send();
    }
});

router.delete('/:userID', function (req, res) {
    try {
        var id = req.params.userID;
        userMethods.DeleteUser(id).then(function () {
            res.status(200).send();
        });
    } catch(err) {
        console.log("Error in Deleting user - " + err);
        res.status(401).send();
    }
});
router.put('/userID', function (req, res) {
    try{
        if (req.body) {
            var id = req.params.userID;
            var reqBody = req.body;
            var created = date.Date();
            var user = new User({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                phoneNumber: reqBody.phoneNumber,
                username: reqBody.username,
                userLevel: reqBody.userLevel,
                isActive: reqBody.isActive,
                sMS: reqBody.sMS,
                created: created,
                companyID: reqBody.companyID,
                userID: id
            });

            userMethods.UpdateUser(user).then(function (user) {
                if(user) {
                    res.status(200).send();
                } else {
                    res.status(401).send();
                }
            })
        } else {
            res.status(401).send();
        }
    }catch(err) {
        console.log("Error in Updating user - " + err);
        res.status(500).send();
    }
});