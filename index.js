const { PORT } = require('./config')
const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const authMiddelware = require('./middlewares/auth')

const { adminRouter, loginRouter, logoutRouter, mailRouter, mainRouter, pdfsRouter, reportRouter, usersRouter } = require('./routes/index')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

// Middlewares
app.use(methodOverride('_method'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.all('*', authMiddelware)

// Routes
app.use('/', mainRouter)
app.use('/report', reportRouter)
app.use('/admin', adminRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/users', usersRouter)
app.use('/pdfs', pdfsRouter)
app.use('/mail', mailRouter)

app.listen(PORT, ['192.168.1.37', 'localhost'], () => {
  console.log(`Example app listening on port ${PORT}`)
})
