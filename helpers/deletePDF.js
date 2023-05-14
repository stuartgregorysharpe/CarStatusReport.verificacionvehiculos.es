const { ROOT_PATH } = require('../config')
const path = require('node:path')
const { rm } = require('fs').promises
const Reports = require('../models/Reports')

const deletePDF = async (reportId) => {
  const reportFolderPath = path.join(ROOT_PATH, 'reportes', reportId)

  await Reports.findByIdAndRemove(reportId)
  await rm(reportFolderPath, { recursive: true})
}

module.exports = deletePDF