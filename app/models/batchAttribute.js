var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BatchAttributeSchema = new Schema({
    name: String,
    value: String
});


BatchAttributeSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.batchAttributeID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('BatchAttribute', BatchAttributeSchema);