let User    = require('../../models/user')

exports.removeUser = async (req, res) => {
    if (req.user.profile.administrator != 'true')
        return res.status(403).send('user not authorised')

    let user = await User.findByIdAndDelete(req.params.id)

    if (!user)
        return res.status(500).send('unable to delete user')
    else
        return res.status(200).send('user deleted')
}