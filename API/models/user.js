let mongoose    = require('mongoose')
let bcryptjs    = require('bcryptjs')

// -----------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema({
    email:          { type: String, unique: true, required: true },
    password:       { type: String },
    firstName:      { type: String },
    lastName:       { type: String },
    phone:          { type: String },
    title:          { type: String },
    company:        { type: String },
    administrator:  { type: String },
    deleted:        { type: Boolean }
}, { timestamps: true })

// -----------------------------------------------------------------------------------------------------
schema.pre('save', function(next) {
    var user = this
    if (!user.isModified('password')) 
      return next()
    bcryptjs.hash(user.password, 10, function(err, hash) {
      if (err) 
        return next(err)
      user.password = hash
      next()
    })
})

schema.statics.compareCreds = function (req) {
    return new Promise((resolve, reject) => {
      this.findOne({email: req.email}, (err, user) => {
        if (err)
          reject(err)
  
        if (!user)
          resolve(null)
        else {
          bcryptjs.compare(req.password, user.password, function(err, res) {
            if (res)
              resolve(user)
            
            resolve(null)
          })
        }
      })
    })
  }

// -----------------------------------------------------------------------------------------------------
module.exports = mongoose.model('User', schema)