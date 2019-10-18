let Client  = require('../../models/client')
let Company = require('../../models/company')
let Feed    = require('../../models/feed')
let Note    = require('../../models/note')
let mongoose = require('mongoose')

// -----------------------------------------------------------------------------------------------------
exports.removeClient = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let client = await Client.findById(req.params.id)

    if (!client)
        return res.status(404).send('client not found')

    client.deleted = true
    let updated = client.save()

    await Feed.updateMany({attachedTo: req.params.id}, { "$set": {deleted: true}})

    if (!updated)
        return res.status(500).send('could not delete client')
    else
        return res.status(200).send('client soft deleted')
}

// -----------------------------------------------------------------------------------------------------
exports.removeCompany = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let company = await Company.findById(req.params.id)

    if (!company)
        return res.status(404).send('company not found')

    company.deleted = true
    let updated = await company.save()
    if (!updated)
        return res.status(500).send('could not delete company')
        
    await Client.updateMany({company: company.name}, { "$set": {deleted: true}})

    return res.status(200).send('company soft deleted')
}

// -----------------------------------------------------------------------------------------------------
exports.removeFeed = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let feed = await Feed.findById(req.params.id)

    if (!feed)
        return res.status(404).send('feed not found')

    feed.deleted = true
    feed.deletedBy = req.user._id

    let updated = await feed.save()
    if (!updated)
        return res.status(500).send('could not remove feed')

    return res.status(200).send()
}

// -----------------------------------------------------------------------------------------------------
exports.removeNote = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Object ID')

    let note = await Note.findById(req.params.id)

    if (!note)
        return res.status(404).send('note not found')

    note.deleted = true
    note.deletedBy = req.user._id

    let updated = await note.save()
    if (!updated)
        return res.status(500).send('could not remove note')

    return res.status(200).send()
}