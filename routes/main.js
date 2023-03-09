const router = require('express').Router()
const { mainGet } = require('../controllers/main')

router.get('/', mainGet)

module.exports = router
