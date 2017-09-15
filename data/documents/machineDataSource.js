var mongoose = require("../documents/mongodbInstance");
var Machine = require("../../app/models/machine");

module.exports = {
    GetMachine: async function (machineID) {
        try {
            let machine = await Machine.findById(machineID);
            if (!machine) {
                console.log("Could not find machine by id:" + machineID);
            }

            return machine;
        } catch (err) {
            console.log("Error in machineDataSource - GetMachine: " + err);
        }
    },
    GetMachines: async function (companyID) {
        try {
            var machines = await Machine.find({ 'companyID': companyID });
            return machines;
        } catch (err) {
            console.log("Error in machineDataSource - GetMachines: " + err);
        }
    },
    SaveMachine: async function (machine) {
        try {
            await machine.save(function(err) {
                if(err) {
                    console.log("Error in SaveMachine " + err);
                }
            });
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
    },
    UpdateMachine: async function (machine) {
        try {
            await Machine.findOneAndUpdate({ _id: machine.machineID }, 
                { $set: { name: machine.name, description: machine.description, location: machine.location, isActive: machine.isActive } });

        } catch (err) {
            console.error("Erorr in machineDataSource - UpdateMachine: " + err);
        }
    }

}