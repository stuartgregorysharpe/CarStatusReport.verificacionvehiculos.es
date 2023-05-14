const router = require('express').Router()
const { reportPost, reportDelete, reportPutRename, reportPostEdit, reportPutEdit } = require('../controllers/report')
const multerUpload = require('../middlewares/multerUpload')
const createReportFolder = require('../middlewares/createReportFolder')

router.post('/', [createReportFolder, multerUpload.any()], reportPost)
router.delete('/', reportDelete)
router.put('/rename', reportPutRename)
router.post('/edit', reportPostEdit)
router.put('/edit', multerUpload.any() ,reportPutEdit)

module.exports = router
