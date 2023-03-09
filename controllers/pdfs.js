const { ROOT_PATH } = require('../config')
const path = require('node:path')

const pdfsFilenameGet = (req, res) => {
  const filename = req.params.filename
  res.sendFile(path.join(ROOT_PATH, `/reportes/${filename}.pdf`))
}

module.exports = { pdfsFilenameGet }
