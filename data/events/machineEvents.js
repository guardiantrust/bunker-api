var producer = require("./kafkaProducer");
var env = require("../../config/index");
producer.Create("machine-API");

module.exports = {
    SettingsChanged: async function (machineID) {
        try {
            await producer.Send('settings-updated', machineID);
        } catch (err) {
            console.log("machineEvent - settings-updated: " + err);
        }
    },
    PartStarted: async function (partID) {
        try {
            await producer.Send('part-started', partID);
        } catch (err) {
            console.log("machineEvent - PartStarted: " + err)
        }
    },
    PartProcessed: async function (partID) {
        try {
            await producer.Send('part-processed', partID);
        } catch (err) {
            console.log("machineEvent - PartProcessed: " + err)
        }
    },
    MachineAdded: async function (machineID) {
        try {
            await producer.Send('machine-added', machineID);
        } catch (err) {
            console.log("machineEvent - MachineAdded: " + err);
        }
    },
    MachineDeleted: async function (machineID) {
        try {
            await producer.Send('machine-deleted', machineID);
        } catch (err) {
            console.log("machineEvent - MachineDeleted: " + err);
        }
    }
};