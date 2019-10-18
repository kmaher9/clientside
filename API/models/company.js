let mongoose    = require('mongoose')

// -----------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema({
    name:           { type: String, unique: true },
    phone:          { type: String },
    deleted:        { type: Boolean }
}, { timestamps: true })

// -----------------------------------------------------------------------------------------------------
module.exports = mongoose.model('Company', schema)