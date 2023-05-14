const { ROOT_PATH } = require('../config')
const generateRandomFilename = require('../helpers/generateRandomFilename')
const path = require('node:path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(ROOT_PATH, 'reportes', req.reportId))
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, generateRandomFilename() + extension)
  }
})
const multerUpload = multer({ storage })

module.exports = multerUpload
