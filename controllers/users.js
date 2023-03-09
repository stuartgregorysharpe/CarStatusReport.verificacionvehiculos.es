const usuarios = require('../classes/Users')

const usersPost = async (req, res, next) => {
  try {
    await usuarios.load()
    await usuarios.addUser(req.body)
    res.redirect('/admin')
  } catch (error) {
    next(error)
  }
}

const usersDelete = async (req, res, next) => {
  try {
    await usuarios.load()
    await usuarios.deleteUser(req.body.username)
    res.redirect('/admin')
  } catch (error) {
    next(error)
  }
}

const usersPut = async (req, res, next) => {
  try {
    await usuarios.load()
    await usuarios.updateUser(req.body)
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
