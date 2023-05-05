require('dotenv').config()
const { PORT } = require('./config')
const app = require('./server')

const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/pdfReport')
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`report-pdf listening on port ${PORT}`)
    })
  })
  .catch(error => console.log(error))
