var machineDS = require('../../../data/documents/machineDataSource');
var machineCache = require("../../../data/cache/machineCache");
var env = require("../../../config/index");
var Company = require("../../../app/models/machine");

module.exports = {
     GetMachine: async function(machineID) {
         try{

         }
         catch(err) {
             console.error("Error in machineMethods - Getmachine: " + err);
         }
     },
     GetMachines: async function(companyID) {
         try {

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