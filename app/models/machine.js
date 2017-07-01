var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Machine', new Schema({
    name: String,
    description: String,
    location: String,
    isActive: Boolean,
    companyID: Schema.Types.ObjectId,
    created: Date

}));