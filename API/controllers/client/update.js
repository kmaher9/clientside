let Client  = require('../../models/client')
let Company = require('../../models/company')
let Feed     = require('../../models/feed')

// -----------------------------------------------------------------------------------------------------
exports.updateClient = async (req, res) => {
    let client = await Client.findById(req.params.id)

    if (req.body.status !== 'Uncontacted') {
        req.body.contactID = req.user.profile._id
        req.body.contactName = req.user.profile.firstName + ' ' + req.user.profile.lastName
    } else if (req.body.status === 'Uncontacted') {
        req.body.contactID = ''
        req.body.contactName = ''
    }

    if (!client)
        return res.status(404).send('unable to find client')

    Client.findByIdAndUpdate(client._id, req.body, (err) => {
        if (err)
            return res.status(500).send('unable to update client, see: ' + err)
        
        Feed.create({
            createdByID: req.user.profile._id,
            createdByName: req.user.profile.firstName + ' ' + req.user.profile.lastName,
            attachedTo: client._id,
            action: `updated the client '${client.email}' details`
        })
        return res.status(200).send('client updated')
    })
}

// -----------------------------------------------------------------------------------------------------
exports.updateCompany = async (req, res) => {
    let company = await Company.findById(req.params.id)

    if (!company)
        return res.status(404).send('unable to find company')

    Company.findByIdAndUpdate(company._id, req.body, (err) => {
        if (err)
            return res.status(500).send('unable to update company, see: ' + err)
        
        Feed.create({
            createdByID: req.user.profile._id,
            createdByName: req.user.profile.firstName + ' ' + req.user.profile.lastName,
            attachedTo: client._id,
            action: `updated the company '${client.email}' details`
        })
        return res.status(200).send('company updated')
    })
}