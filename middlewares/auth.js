const { SALT } = require('../config')
const jwt = require('jsonwebtoken')

const authMiddelware = (req, res, next) => {
  if (req.path === '/login') { return next() }
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, SALT, (err, decodedToken) => {
      if (err || !decodedToken._id || !decodedToken.username) res.redirect('/login')
      res.locals.isAdmin = decodedToken.isAdmin
      next()
    })
  } else {
    res.redirect('/login')
  }
}

module.exports = authMiddelware
