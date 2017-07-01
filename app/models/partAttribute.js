var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('PartAttribute', new Schema({
    name: String,
    value: String,
    mappedTo: String
}));