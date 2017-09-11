var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LoginSchema = new Schema({
    userName: String,
    password: String,
    lastLogin: Date,
    userID: Schema.Types.ObjectId
});

LoginSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.loginID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('LoginUser', LoginSchema);