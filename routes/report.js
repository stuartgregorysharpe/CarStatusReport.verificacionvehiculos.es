const router = require('express').Router()
const { reportPost } = require('../controllers/report')
const multerUpload = require('../middlewares/multerUpload')

router.post('/', multerUpload.any(), reportPost)

module.exports = router
