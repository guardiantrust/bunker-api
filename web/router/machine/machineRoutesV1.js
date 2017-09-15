var express = require('express');
var router = express.Router();
var date = require('time');
var Machine = require('../../../app/models/machine');
var machineMethods = require('./machineMethods');
var authMethods = require("../authentication/tokenMethods");

router.get('/:machineID', function (req, res) {
    try {
        var machineID = req.params.machineID;
        machineMethods.GetMachine(machienID).then(function (machine) {
            if (!machine) {
                res.status(400).send();
            } else {
                res.status(200).send(machine);
            }
        });

    } catch (err) {
        res.status(500).send('Machine not found!');
        console.log('Error GETTING macine :' + err);
    }
});

router.get('/', function (req, res) {
    try {
        var token = req.headers['x-access-token'];
        var companyID = authMethods.GetCompanyIDFromToken(token);
        console.log(token);
        console.log('get machines for ' + companyID);
        machineMethods.GetMachines(companyID).then(function (machines) {
            if (!machines) {
                res.status(400).send();
            } else {
                res.status(200).send(machines);
            }
        });

    } catch (err) {
        res.status(500).send('No Machines Found!');
        console.log('Error GETTING all Machines: + err');
    }
});

router.delete('/:machineID', function (req, res) {
    try {
        var machineID = req.params.machineID;
        machineMethods.DeleteMachine(machineID).then(function (err) {
            if (err) {
                res.status(400).send();
            } else {
                res.status(204).send();
            }
        });
    } catch (err) {
        res.status(500).send('Machine Not Found!');
        console.log('Error DELETING machine : ' + err);
    }
});

router.post('/', function (req, res) {
    try {
        var token = req.headers['x-access-token'];
        var companyID = authMethods.GetCompanyIDFromToken(token);

        var reqBody = req.body;
        var created = date.Date();
        var machine = new Machine({
            name: reqBody.name,
            description: reqBody.description,
            location: reqBody.location,
            isActive: reqBody.isActive,
            companyID: companyID,
            created: created
        });
        console.log('starting to post machine');
        machineMethods.SaveMachine(machine).then(function (err) {

            if (err) {
                res.status(400).send();
            } else {
                res.status(204).send();
            }
        });
    } catch (err) {
        res.status(500).send('Update unsuccessful');
        console.log('Error POSTING machine: ' + err);
    }
});

router.put('/:machineID', function (req, res) {
    try {

    } catch (err) {

    }
});

module.exports = router;