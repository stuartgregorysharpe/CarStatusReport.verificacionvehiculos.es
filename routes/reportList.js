const router = require('express').Router()
const { reportListGet } = require('../controllers/reportList')

router.get('/', reportListGet)

module.exports = router
