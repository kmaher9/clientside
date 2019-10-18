let router  = require('express').Router()
let mid     = require('../../middleware/authenticated')
let create  = require('../../controllers/general/attachment/create')

// -----------------------------------------------------------------------------------------------------
router.post('/upload/:id', mid.authenticated, create.uploadAttachment)
// -----------------------------------------------------------------------------------------------------
module.exports = router