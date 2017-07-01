var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Company', new Schema({
    name: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postal: String,
    phoneNumber: String,
    contactEmail: String,
    created: Date,
    isSuspended: Boolean,
    isActive: Boolean
}));