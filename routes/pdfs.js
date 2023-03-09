const router = require('express').Router()
const { pdfsFilenameGet } = require('../controllers/pdfs')

router.get('/:filename', pdfsFilenameGet)

module.exports = router
