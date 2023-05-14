const { ROOT_PATH } = require('../config')
const path = require('node:path')
const { rename } = require('fs').promises
const Reports = require('../models/Reports')

const renamePDF = async (reportId, newFilename) => {
  const { filename: currentFilename } = await Reports.findById(reportId, 'filename').exec()
  const reportFolderPath = path.join(ROOT_PATH, 'reportes', reportId)

  await rename(`${reportFolderPath}/${currentFilename}.pdf`, `${reportFolderPath}/${newFilename}.pdf`)
  await Reports.findByIdAndUpdate(reportId, { filename: newFilename}) 
}

module.exports = renamePDF