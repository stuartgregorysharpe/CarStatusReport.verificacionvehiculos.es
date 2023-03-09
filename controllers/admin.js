const usuarios = require('../classes/Users')

const mainGet = async (req, res, next) => {
  try {
    await usuarios.load()
    res.render('pages/admin', { data: { usernames: usuarios.getUsernames() } })
  } catch (error) {
    next(error)
  }
}

module.exports = { mainGet }
