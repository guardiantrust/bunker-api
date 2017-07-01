var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    username: String,
    userLevel: Number,
    isActive: Boolean,
    sMS: String,
    created: Date,
    roles: [Role],
    companyID: Schema.Types.ObjectId
}));