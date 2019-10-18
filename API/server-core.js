const express           = require('express')
const expressValidator  = require('express-validator')
const mongoose          = require('mongoose')
const logger            = require('morgan')
const bodyParser        = require('body-parser')
const fileUpload        = require('express-fileupload')
const dotenv            = require('dotenv')
const app               = express()
dotenv.config()

// -----------------------------------------------------------------------------------------------------
const mongoURI = 'mongodb://localhost:27017/clientside'
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(mongoURI)
mongoose.connection.on('error', (err) => {
  console.log('unable to connect to DB')
  process.exit()
})

// -----------------------------------------------------------------------------------------------------
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(fileUpload())

// -----------------------------------------------------------------------------------------------------
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next()
})

// -----------------------------------------------------------------------------------------------------
app.use('/api', require('./routes/general'))
app.use('/api/general', require('./routes/general/main'))
app.use('/api/user', require('./routes/user/main'))
app.use('/api/client', require('./routes/client/main'))

// -----------------------------------------------------------------------------------------------------
app.listen(5151, () => console.log('API on 5151'))