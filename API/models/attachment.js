let mongoose    = require('mongoose')

// -----------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema({
    name:           { type: String },
    location:       { type: String },
    mimetype:       { type: String },
    size:           { type: String },
    md5:            { type: String },
    attachedTo:     { type: String },
    uploadedName:   { type: String },
    uploadedID:     { type: String },
    deleted:        { type: Boolean }
}, { timestamps: true })

// -----------------------------------------------------------------------------------------------------
module.exports = mongoose.model('Attachment', schema)