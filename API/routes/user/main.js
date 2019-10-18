let router  = require('express').Router()
let mid     = require('../../middleware/authenticated')
let create  = require('../../controllers/user/create')
let read    = require('../../controllers/user/read')
let update  = require('../../controllers/user/update')
let remove  = require('../../controllers/user/delete')

// -----------------------------------------------------------------------------------------------------
router.post('/create', mid.authenticated, create.newUser)
router.post('/login', create.loginUser)

router.get('/profile', mid.authenticated, read.getCurrentUser)
router.get('/profile/:id', mid.authenticated, read.getUser)
router.get('/profiles', mid.authenticated, read.getUsers)

router.put('/update/:id', mid.authenticated, update.updateUser)

router.delete('/:id', mid.authenticated, remove.removeUser)
// -----------------------------------------------------------------------------------------------------
module.exports = router