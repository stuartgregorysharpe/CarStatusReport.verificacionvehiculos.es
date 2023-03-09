const adminRouter = require('./admin')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
const mailRouter = require('./mail')
const mainRouter = require('./main')
const pdfsRouter = require('./pdfs')
const reportRouter = require('./report')
const usersRouter = require('./users')

module.exports = {
  adminRouter,
  loginRouter,
  logoutRouter,
  mailRouter,
  mainRouter,
  pdfsRouter,
  reportRouter,
  usersRouter
}
