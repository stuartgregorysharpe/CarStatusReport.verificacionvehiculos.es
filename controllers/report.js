const { ROOT_PATH } = require('../config')
const path = require('node:path')
const fs = require('fs').promises
const ejs = require('ejs')
const createPDF = require('../helpers/createPDF')
const generateRandomFilename = require('../helpers/generateRandomFilename')

const reportPost = (req, res, next) => {
  const baseURL = req.protocol + '://' + req.get('host')
  const randomFileName = generateRandomFilename()
  const temporalHTMLFilePath = path.join(ROOT_PATH, `/public/${randomFileName}.html`)

  const data = { ...req.body, files: { ...req.files } }

  ejs.renderFile('views/pages/report.ejs', { data }, {}, function (error, html) {
    (async (error, html) => {
      try {
        if (error) throw error
        await fs.writeFile(temporalHTMLFilePath, html)
        await createPDF(randomFileName, '/reportes', baseURL)
        await fs.unlink(temporalHTMLFilePath)
        res.render('pages/download', { data: { filename: randomFileName } })
      } catch (error) {
        next(error)
      }
    })(error, html)
  })
}

module.exports = { reportPost }
