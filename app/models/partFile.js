var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PartFileSchema = new Schema({
    machineID: Schema.Types.ObjectId,
    fileExtension: String,
    fileName: String,
    created: Date,
    processed: Date
});

PartFileSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.partFileID = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('PartFile', PartFileSchema);