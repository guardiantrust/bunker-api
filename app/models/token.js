var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Token', new Schema({
    userId: String,
    companyId: String,
    token: String,
    issuedAt: Number,
    expiresAt: Number

}));