var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Part', new Schema({
    barCode: String,
    name: String,
    description: String,
    referenceID: String,
    batchID: Schema.Types.ObjectId,
    companyID: Schema.Types.ObjectId,
    partAttributes: [PartAttribute],
    files: [PartFile],
    created: Date
}));