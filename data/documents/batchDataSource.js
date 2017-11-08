var mongoose = require("../documents/mongodbInstance");
var Batch = require("../../app/models/batch");
var BatchAttribute = require("../../app/models/batchAttribute");

module.exports = {
    GetBatch: async function(batchID) {
        try {
            let batch = await Batch.findById(batchID);
            return batch;
        } catch (err) {
            console.log("Error in batchDataSource - GetBatch :" + err);
        }
    },
    GetBatchByCompanyId: async function(companyID) {
        try {
            let batches = await Batch.find({ 'companyID': companyID });
            return batches;
        } catch (err) {
            console.log("Error in batchDataSource - GetBatchByCompanyId :" + err);
        }
    },
    GetBatchByAttribute: async function(companyID, name, value) {
        try {
            let batches = await Batch.find({'companyID':companyID}, {'attributes.name': name}, {'attributes.value':value});
            return batches;
        } catch (err) {
            console.log("Error in batchDataSource - GetBatchByAttribute :" + err);
        }
    },
    CreateBatch: async function(batch) {
        try {
            await batch.save(function (err) {
            });
            return batch;
        } catch (err) {
            console.log("Error in batchDataSource - CreateBatch :" + err);
        }
    },
    UpdateBatch: async function(batch) {
        try {
            await Batch.findOneAndUpdate(batch.batchID, batch, {upsert:true});
            
        } catch (err) {
            console.log("Error in batchDataSource - UpdateBatch :" + err);
        }
    }
}