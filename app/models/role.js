var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Role', new Schema({
    description: String,
    isActive: Boolean,
    name: String
}));