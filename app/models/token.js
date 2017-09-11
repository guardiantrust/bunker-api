var mongoose = require('mongoose');
var Schema = mongoose.Schema;
TokenSchema = new Schema({
    userID: String,
    companyID: String,
    token: String,
    issuedAt: Number,
    expiresAt: Number

});

TokenSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.tokenID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Token', TokenSchema);