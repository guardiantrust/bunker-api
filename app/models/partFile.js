var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('PartFile', new Schema({
    machineID: Schema.Types.ObjectId,
    fileExtension: String,
    fileName: String,
    created: Date,
    processed: Date
}));