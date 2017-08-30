var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PartAttributeSchema = new Schema({
    name: String,
    value: String,
    mappedTo: String
});

PartAttributeSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.partAttributeID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('PartAttribute', PartAttributeSchema);