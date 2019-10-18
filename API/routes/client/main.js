let router  = require('express').Router()
let mid     = require('../../middleware/authenticated')
let create  = require('../../controllers/client/create')
let read    = require('../../controllers/client/read')
let update  = require('../../controllers/client/update')
let remove  = require('../../controllers/client/delete')

// -----------------------------------------------------------------------------------------------------
router.post('/create', mid.authenticated, create.newClient)
router.post('/create/company', mid.authenticated, create.newCompany)
router.post('/create/feed', mid.authenticated, create.newFeed)
router.post('/create/note', mid.authenticated, create.newNote)

router.get('/profile/:id', mid.authenticated, read.getClient)
router.get('/profiles', mid.authenticated, read.getClients)
router.get('/profiles/include-deleted', mid.authenticated, read.getClientsDeleted)
router.get('/company/:id', mid.authenticated, read.getCompany)
router.get('/companies', mid.authenticated, read.getCompanies)
router.get('/companies/include-deleted', mid.authenticated, read.getCompaniesDeleted)
router.get('/company/employees/:id', mid.authenticated, read.getEmployees)
router.get('/feed/:id', mid.authenticated, read.getFeed)
router.get('/notes/:id', mid.authenticated, read.getNotes)

router.put('/update/:id', mid.authenticated, update.updateClient)
router.put('/update/company/:id', mid.authenticated, update.updateCompany)

router.delete('/profile/:id', mid.authenticated, remove.removeClient)
router.delete('/company/:id', mid.authenticated, remove.removeCompany)
router.delete('/feed/:id', mid.authenticated, remove.removeFeed)
router.delete('/note/:id', mid.authenticated, remove.removeNote)
// -----------------------------------------------------------------------------------------------------
module.exports = router