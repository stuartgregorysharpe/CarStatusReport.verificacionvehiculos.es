const path = require('path')
const express = require('express')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'archivos/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    cb(null, uniqueSuffix + extension)
  }
})
const upload = multer({ storage: storage })

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', {data:{isAdmin: true}})
})
app.post('/report', upload.any(), (req, res) => {
  const data = {isAdmin: true, ...req.body, files:{...req.files}}
  res.render('pages/report', {data})
})

app.listen(port, ["192.168.1.37", "localhost" ], () => {
  console.log(`Example app listening on port ${port}`)
})