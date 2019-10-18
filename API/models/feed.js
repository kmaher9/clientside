let mongoose    = require('mongoose')

// -----------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema({
    createdByName:  { type: String },
    createdByID:    { type: String },
    attachedTo:     { type: String },
    action:         { type: String },
    deletedBy:      { type: String },
    deleted:        { type: Boolean }
}, { timestamps: true })

// -----------------------------------------------------------------------------------------------------
module.exports = mongoose.model('Feed', schema)