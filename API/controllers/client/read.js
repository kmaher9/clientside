let Client      = require('../../models/client')
let Company     = require('../../models/company')
let Feed        = require('../../models/feed')
let Note        = require('../../models/note')
let Attachment  = require('../../models/attachment')
let mongoose    = require('mongoose')

// -----------------------------------------------------------------------------------------------------
exports.getClient = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let client = await Client.findById(req.params.id).limit(1)

    if (!client)
        return res.status(404).send('client not found')
    else 
        return res.status(200).send(client)
}

exports.getClients = async (req, res) => {
    let clients = await Client.find({deleted: false}).sort({createdAt: -1})

    if (!clients)
        return res.status(500).send('unable to retrieve clients')
    else
        return res.status(200).send(clients)
}

exports.getClientsDeleted = async (req, res) => {
    let clients = await Client.find({}).sort({createdAt: -1})

    if (!clients)
        return res.status(500).send('unable to retrieve clients')
    else
        return res.status(200).send(clients)
}

// -----------------------------------------------------------------------------------------------------
exports.getCompany = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let company = await Company.find({_id: req.params.id}).limit(1)

    if (!company)
        return res.status(404).send('company not be found')
    else
        return res.status(200).send(company)
}

exports.getCompanies = async (req, res) => {
    let companies = await Company.find({deleted: false}).select('name').sort({name: 1})

    if (!companies)
        return res.status(500).send('unable to retrieve companies')
    else
        return res.status(200).send(companies)
}

exports.getCompaniesDeleted = async (req, res) => {
    let companies = await Company.find({})

    if (!companies)
        return res.status(500).send('unable to retrieve companies')
    else
        return res.status(200).send(companies)
}

exports.getEmployees = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let company = await Company.findById(req.params.id)
    let clients = await Client.find({company: company.name})

    if (!clients)
        return res.status(500).send('unable to retrieve clients')
    else
        return res.status(200).send(clients)
}

// -----------------------------------------------------------------------------------------------------
exports.getFeed = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let feed = await Feed.find({attachedTo: req.params.id}).sort({createdAt: -1})

    if (!feed)
        return res.status(404).send()
    
    return res.status(200).send(feed)
}

// -----------------------------------------------------------------------------------------------------
exports.getNotes = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let notes = await Note.find({attachedTo: req.params.id, deleted: false}).sort({createdAt: 1})

    for (let i=0;i<notes.length;i++) {
        let attachment = await Attachment.findOne({attachedTo: notes[i]._id}).lean()
        if (attachment) {
            notes[i].attachment = attachment
        }
    }

    return res.status(200).send(notes)
}

exports.getNotesDeleted = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let notes = await Note.find({attachedTo: req.params.id}).sort({createdAt: 1})

    return res.status(200).send(notes)
}