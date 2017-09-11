var express = require('express');
var router = express.Router();
var date = require('time');
var Machine = require('../../../app/models/machine');
var machineMethods = require('./machineMethods');

router.get('/:machineID', function(req, res) {
    try {
        var machineID = req.params.machineID;
        var machine = machineMethods.GetMachine(machienID);
        if (!machine) {
            res.status(400);
        } else {
            res.status(200).send(machine);
        }
    } catch (err) {
        res.status(500).send('Machine not found!');
        console.log('Error GETTING macine :' + err);
    }
});

router.get('/', function(req, res) {
    try {
        var machines = machineMethods.GetMachines();

        if (!machines) {
            res.status(400);
        } else {
            res.status(200).send(machines);
        }

    } catch (err) {
        res.status(500).send('No Machines Found!');
        console.log('Error GETTING all Machines: + err');
    }
});

router.delete('/:machineID', function(req, res) {
    try {
        var machineID = req.params.machineID;
        machineMethods.DeleteMachine(machineID);
        res.status(204);
    } catch (err) {
        res.status(500).send('Machine Not Found!');
        console.log('Error DELETING machine : ' + err);
    }
});

router.post('/', function(req, res) {
    try {
        var companyID = 1;
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
        machineMethods.SaveMachine(machine);
        res.status(204);
    } catch (err) {
        res.status(500).send('Update unsuccessful');
        console.log('Error POSTING machine: ' + err);
    }
});

router.put('/:machineID', function(req, res) {
    try {

    } catch (err) {

    }
});