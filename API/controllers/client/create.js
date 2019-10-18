let Client      = require('../../models/client')
let Company     = require('../../models/company')
let Feed        = require('../../models/feed')
let Note        = require('../../models/note')
let mongoose    = require('mongoose')

// -----------------------------------------------------------------------------------------------------
exports.newClient = async (req, res) => {
    let client = req.body
    client.deleted = false
    client.status = 'Uncontacted'

    if (!client.email || !client.name || !client.company)
        return res.status(400).send('missing required field')

    Client.create(client, (err, client) => {
        if (err)
            return res.status(500).send('error creating client, see: ' + err)

        Feed.create({
            createdByID: req.user.profile._id,
            createdByName: req.user.profile.firstName + ' ' + req.user.profile.lastName,
            attachedTo: client._id,
            action: `created the client '${client.email}'`
        })

        return res.status(201).send(client)
    })
}

// -----------------------------------------------------------------------------------------------------
exports.newCompany = async (req, res) => {
    let company = req.body
    company.deleted = false

    if (!company.name)
        res.status(400).send('missing required field')

    Company.create(company, (err, company) => {
        if (err)
            return res.status(500).send('error creating company, see: ' + err)
        else
            return res.status(201).send(company)
    })
}

// -----------------------------------------------------------------------------------------------------
exports.newFeed = async (req, res) => {
    let feed = req.body
    feed.createdByName = req.user.firstName + ' ' + req.user.lastName
    feed.createdByID = req.user._id
    
    Feed.create(feed, (err) => {
        if (err)
            return res.status(500).send('internal error, see: ' + err)
        
        return res.status(201).send()
    })
}

// -----------------------------------------------------------------------------------------------------
exports.newNote = async (req, res) => {
    let note = req.body
    note.createdByName = req.user.profile.firstName + ' ' + req.user.profile.lastName
    note.createdByID = req.user.profile._id
    note.deleted = false
    
    Note.create(note, (err, note) => {
        if (err)
            return res.status(500).send('internal error, see: ' + err)
        
        return res.status(201).send(note)
    })
}