const { ROOT_PATH } = require('../config')
const path = require('node:path')
const fs = require('fs').promises
const ejs = require('ejs')
const extractFrame = require('ffmpeg-extract-frame')
const createPDF = require('../helpers/createPDF')
const generateRandomFilename = require('../helpers/generateRandomFilename')
const createSmallImage = require('../helpers/createSmallImage')
const getFirstFrameFromVideo = require('../helpers/getFirstFrameFromVideo')

const reportPost = (req, res, next) => {
  const baseURL = req.protocol + '://' + req.get('host')
  const randomFileName = generateRandomFilename()
  const temporalHTMLFilePath = path.join(ROOT_PATH, `/public/${randomFileName}.html`)

  const data = { ...req.body, files: { ...req.files } }

  let reportHasVideo = false

  Object.keys(data.files).forEach(key => {
    const file = data.files[key];
    (async (file) => {
      try {
        const fileType = file.mimetype.split('/')[0]
        if (fileType === 'image') {
          await createSmallImage(file.path, file.filename)
        } else if (fileType === 'video') {
          // await getFirstFrameFromVideo(file.path, file.filename)
          // await extractFrame({
          //   input: file.path,
          //   output: `poster-${file.path}.jpg`,
          //   offset: 0,
          //   quality: 31,
          // })
          // reportHasVideo = true
        }
      } catch (error) {
        next(error)
      }
    })(file)
  })

  ejs.renderFile('views/pages/report.ejs', { data }, {}, function (error, html) {
    (async (error, html) => {
      try {
        if (error) throw error
        if (reportHasVideo) {
          // wait 1 sec for ffmpeg to load all image posters
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
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
