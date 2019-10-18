let User    = require('../../models/user')
let jwt     = require('jsonwebtoken')

// -----------------------------------------------------------------------------------------------------
exports.newUser = (req, res) => {
    if (req.user.profile.administrator != 'true')
        return res.status(403).send('user not authorised')

    let user = req.body
    if (!user.email || !user.firstName || !user.company || !user.administrator || !user.password)
        return res.status(400).send('missing required field')
    
    User.create(user, (err, user) => {
        if (err)
            return res.status(500).send('error creating user, see: ' + err)
        else
            return res.status(201).send(user)
    })
}

exports.loginUser = (req, res) => {
    let user = req.body

    if (!user.email || !user.password)
        return res.status(400).send('missing required field')
    
    User.compareCreds(user).then(profile => {
        if (!profile)
            return res.status(400).send('invalid credentials')
        else {
            let token = jwt.sign({ profile }, 'itg', { expiresIn: 86400 })
            return res.status(200).send(token)
        }
    })
}