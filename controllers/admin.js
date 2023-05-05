const Users = require('../models/Users')

const mainGet = async (req, res, next) => {
  try {
    const users = await Users.find({}, '_id username isAdmin')
    res.render('pages/admin', { data: { users } })
  } catch (error) {
    next(error)
  }
}

module.exports = { mainGet }
