var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('LoginUser', new Schema({
    userName: String,
    password: String,
    lastLogin: Date
}));