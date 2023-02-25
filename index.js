const path = require('path')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const ejs = require('ejs')
const puppeteer = require('puppeteer')

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

app.use(cors())
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', {data:{isAdmin: true}})
})
app.post('/report', upload.any(), (req, res) => {
  const data = {isAdmin: true, ...req.body, files:{...req.files}}
  const firma64 = data.firma.split(',')[1]
  const firmaDecoded = Buffer.from(firma64, 'base64').toString('utf8') 

  data.firma = firmaDecoded
  ejs.renderFile('views/pages/report.ejs', {data}, {} ,function(err, str){
      if (err) {
        console.log(err)
      } else {
        const randomFileName = Date.now() + '-' + Math.round(Math.random() * 1E9)
        fs.writeFile(`./public/pdf/pdf.html`, str, (err) => {
          if (err) throw err;
          console.log('File is created successfully.');

          (async () => {
            const browser = await puppeteer.launch({executablePath: '/opt/homebrew/bin/chromium', args: [ '--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote' ]})
            const page = await browser.newPage()
            const website_url = 'http://localhost:3000/pdf/pdf.html'

            await page.goto(website_url, { waitUntil: 'networkidle0' });
            await page.emulateMediaType('screen');
            const pdf = await page.pdf({
              path: 'result.pdf',
              margin: { top: '50px', right: '50px', bottom: '50px', left: '50px' },
              printBackground: true,
              format: 'A4', 
            });
            await browser.close();

          })()


        })
      }
  });

  res.redirect('/')
})

app.listen(port, ["192.168.1.37", "localhost" ], () => {
  console.log(`Example app listening on port ${port}`)
})