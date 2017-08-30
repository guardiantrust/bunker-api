var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const CompanySchema = new Schema({
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
});

CompanySchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.companyID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Company', CompanySchema);