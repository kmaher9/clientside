let Attachment  = require('../../../models/attachment')
let mongoose    = require('mongoose')
let fs          = require('fs')

// -----------------------------------------------------------------------------------------------------
exports.uploadAttachment = async (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('missing required field')

  if (!req.files.attachment)
    return res.status(400).send('invalid attachment name')
  
  if (!fs.existsSync((process.env.ATTACHMENT_DIR+req.params.id)))
    fs.mkdirSync((process.env.ATTACHMENT_DIR+req.params.id))

  req.files.attachment.mv(process.env.ATTACHMENT_DIR+req.params.id+'/'+req.files.attachment.name, (err) => {
    if (err)
      return res.status(500).send('unable to store, see: ' + err)

    let attachment = new Object
    attachment.name = req.files.attachment.name
    attachment.location = process.env.ATTACHMENT_DIR+req.params.id+'/'+req.files.attachment.name
    attachment.mimetype = req.files.attachment.mimetype
    attachment.size = req.files.attachment.size
    attachment.md5 = req.files.attachment.md5
    attachment.attachedTo = req.params.id
    attachment.uploadedName = req.user.profile.firstName + ' ' + req.user.profile.lastName
    attachment.uploadedID = req.user.profile._id
    attachment.deleted = false

    Attachment.create(attachment, (err, attachment) => {
      if (err)
        return res.status(500).send('error creating attachment, see: ' + err)

      return res.status(201).send(attachment)
    })
  })
}
