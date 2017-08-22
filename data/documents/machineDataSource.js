var mongoose = require("../documents/mongodbInstance");
var Machine = require("../../app/models/machine");
moduels.exports = {
    GetMachine: async function (machineID) {
        try {
            var machine = await Machine.findById(machineID);
            if (!machine) {
                console.log("Could not find machine by id:" + machineID);
            }

            return machine;
        } catch (err) {
            console.log("Error in machineDataSource - GetMachine: " + err);
        }
    },
    GetMachines: async function (customerID) {
        try {
            var machines = await Machine.find({ 'companyID': companyID });
            return machines;
        } catch (err) {
            console.log("Error in machineDataSource - GetMachines: " + err);
        }
    },
    SaveMachine: async function (machine) {
        try {
            await machine.save();
        } catch (err) {
            console.log("Error in machineDataSource - SaveMachine: " + err);
        }
    },
    DeleteMachine: async function (machineID) {
        try {
            var machine = await Machine.findById(machineId);

            if (!machine) {
                console.log("Error trying to DELETE machine!  Machine not found by id: " + machineID);
            }
            machine.isActive = false;
            machine.save();
        } catch (err) {
            console.log("Error in machineDataSource - DeleteMachine: " + err);
        }
    }

}