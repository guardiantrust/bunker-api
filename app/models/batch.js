var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Batch', new Schema({
    CompanyID: Schema.Types.ObjectId,
    name: String,
    description: String,
    created: Date,
    attributes: [BatchAttribute]
}));