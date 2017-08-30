var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MachineSchema = new Schema({
    name: String,
    description: String,
    location: String,
    isActive: Boolean,
    companyID: Schema.Types.ObjectId,
    created: Date

});

MachineSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.machineID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Machine', MachineSchema);