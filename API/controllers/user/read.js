let User    = require('../../models/user')

// -----------------------------------------------------------------------------------------------------
exports.getCurrentUser = async (req, res) => {
    let user = await User.findOne({_id: req.user.profile._id}).limit(1)
    
    if (!user)
        return res.status(404).send('unable to retrieve from token')
    
    return res.status(200).send(user)
}

exports.getUser = async (req, res) => {
    let user = await User.find({_id: req.params.id}).limit(1).select('-password')

    if (!user)
        return res.status(404).send('user not found')
    else 
        return res.status(200).send(user)
}

exports.getUsers = async (req, res) => {
    let users = await User.find({})

    if (!users)
        return res.status(500).send('unable to retrieve users')
    else
        return res.status(200).send(users)
}