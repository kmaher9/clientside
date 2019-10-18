let jwt = require('jsonwebtoken')

exports.authenticated = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {

    jwt.verify(token, 'itg', function (err, decoded) {       
      if (err)
        return res.status(403).send('Failed to authenticate bearer token') 
      else {
        req.user = decoded

        next()
      }
    })
  } else {
    return res.status(403).send('No x-access-token provided')
  }
}