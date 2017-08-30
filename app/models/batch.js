var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BatchSchema = new Schema({
    CompanyID: Schema.Types.ObjectId,
    name: String,
    description: String,
    created: Date,
    attributes: [BatchAttribute]
});

BatchSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.batchID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Batch', BatchSchema);