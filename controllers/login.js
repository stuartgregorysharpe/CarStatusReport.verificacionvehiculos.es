const { SALT } = require('../config')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const hashPassword = require('../helpers/hashPassword')

const loginGet = (req, res) => {
  res.render('pages/login')
}

const loginPost = async (req, res, next) => {
  try {
    let { password, isAdmin } = await Users.findOne({ username: req.body.username }, 'password isAdmin').exec()
    if (!isAdmin) { isAdmin = false }
    const hashedPassword = await hashPassword(req.body.password, SALT)

    if (password !== hashedPassword) { return res.redirect('/login') }

    const maxAge = 15 * 24 * 60 * 60 * 1000
    const token = jwt.sign({ isAdmin }, SALT, { expiresIn: maxAge })
    res.cookie('jwt', token, { httpOnly: true, maxAge })
    res.redirect('/')
  } catch (error) {
    res.redirect('/login')
    next(error)
  }
}

module.exports = {
  loginGet,
  loginPost
}
