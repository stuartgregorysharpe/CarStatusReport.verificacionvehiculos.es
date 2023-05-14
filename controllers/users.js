const Users = require('../models/Users')
const hashPassword = require('../helpers/hashPassword')
const { SALT } = require('../config')

const usersPost = async (req, res, next) => {
  try {
    let { username, password, isAdmin } = req.body

    username = username.replace(/\s+/g, '')
    password = await hashPassword(password, SALT)

    await Users.create({ username, password, isAdmin })

    res.redirect('/admin')
  } catch (error) {
    next(error)
  }
}

const usersDelete = async (req, res, next) => {
  try {
    await Users.findByIdAndDelete(req.body._id)
    res.redirect('/admin')
  } catch (error) {
    next(error)
  }
}

const usersPut = async (req, res, next) => {
  try {
    let { _id, password } = req.body

    password = await hashPassword(password, SALT)

    await Users.findByIdAndUpdate(_id, { password })

    res.redirect('/admin')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  usersPost,
  usersDelete,
  usersPut
}
