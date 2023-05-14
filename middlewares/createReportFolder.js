const { mkdir } = require('fs/promises')
const path = require('path')
const { ROOT_PATH } = require('../config')
const { randomUUID } = require('crypto')

const createReportFolder = async (req, res, next) => {
  const reportId = randomUUID()
  const folderPath = path.join(ROOT_PATH, 'reportes', reportId)

  await mkdir(folderPath, { recursive: true })

  req.reportId = reportId
  next()
}

module.exports = createReportFolder