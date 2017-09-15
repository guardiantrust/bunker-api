var machineDS = require('../../../data/documents/machineDataSource');
var machineCache = require("../../../data/cache/machineCache");
var env = require("../../../config/index");
var Company = require("../../../app/models/machine");

module.exports = {
     GetMachine: async function(machineID) {
         try{
            var machine = await machineDS.GetMachine(machineID);
            return machine;
         }
         catch(err) {
             console.error("Error in machineMethods - Getmachine: " + err);
         }
     },
     GetMachines: async function(companyID) {
         try {
             
            var machines = await machineDS.GetMachines(companyID);
            return machines;
         } catch(err) {
             console.error("Error in machineMethods - GetMachines: " + err);
         }
     },
     SaveMachine: async function(machine) {
         try {
            await machineDS.SaveMachine(machine);
         } catch (err) {
             console.error("Error in machineMethods - SaveMachine: " + err);
         }
     },
     DeleteMachine: async function(machineID) {
         try {
             await machineDS.DeleteMachine(machineID);
         } catch (err) {
             console.error("Error in machineMethods - DeleteMachine: " + err);
         }
     },
     UpdateMachine: async function(machine) {
         try {
            await machineDS.UpdateMachine()
         } catch (err) {
             console.error("Error in machineMethods - UpdateMachine: " + err);
         }
     }
}