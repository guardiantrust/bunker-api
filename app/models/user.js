var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    username: String,
    userLevel: Number,
    isActive: Boolean,
    sMS: String,
    created: Date,
    roles: [Schema.Types.ObjectId],
    companyID: Schema.Types.ObjectId
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.userID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('User', UserSchema);