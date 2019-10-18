let User        = require('../../models/user')
let bcryptjs    = require('bcryptjs')

// -----------------------------------------------------------------------------------------------------
exports.updateUser = async (req, res) => {
    let user = await User.findById(req.params.id)

    if (!user)
        return res.status(404).send('unable to find user')

    if (req.body.password) 
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
        
    let updated = await User.findByIdAndUpdate(user._id, req.body)

    if (!updated)
        return res.status(500).send('unable to update user')
    else 
        return res.status(200).send('user updated')
}