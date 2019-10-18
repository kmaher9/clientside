let mongoose    = require('mongoose')

// -----------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema({
    email:          { type: String, unique: true },
    name:           { type: String },
    phone:          { type: String },
    title:          { type: String },
    company:        { type: String },
    country:        { type: String },
    status:         { type: String },
    contact:        { type: String },
    contactName:    { type: String },
    contactID:      { type: String },
    deleted:        { type: Boolean }
}, { timestamps: true })

// -----------------------------------------------------------------------------------------------------
module.exports = mongoose.model('Client', schema)