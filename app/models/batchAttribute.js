var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('BatchAttribute', new Schema({
    name: String,
    value: String
}));