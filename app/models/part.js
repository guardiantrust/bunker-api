var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PartSchema = new Schema({
    barCode: String,
    name: String,
    description: String,
    referenceID: String,
    batchID: Schema.Types.ObjectId,
    companyID: Schema.Types.ObjectId,
    partAttributes: [PartAttribute],
    files: [PartFile],
    created: Date
});

PartSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.partID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Part', PartSchema);