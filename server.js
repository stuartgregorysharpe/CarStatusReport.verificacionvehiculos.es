const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const authMiddelware = require('./middlewares/auth')
const { adminRouter, loginRouter, logoutRouter, mainRouter, pdfsRouter, reportRouter, usersRouter, reportListRouter } = require('./routes/index')

const app = express()

if (process.env.ENVIRONMENT === 'development') {
  app.use('/archivos', express.static('archivos'))
  app.use('/reportes', express.static('reportes'))
}

app.use(express.static('public'))
app.set('view engine', 'ejs')

// Middlewares
app.use(helmet())
app.use(methodOverride('_method'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('combined'))
app.all('*', authMiddelware)

// Routes
app.use('/', mainRouter)
app.use('/report', reportRouter)
app.use('/admin', adminRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/users', usersRouter)
app.use('/pdfs', pdfsRouter)
app.use('/lista-reportes', reportListRouter)
// app.use('/mail', mailRouter)

module.exports = app 