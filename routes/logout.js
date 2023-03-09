const router = require('express').Router()
const { logoutGet } = require('../controllers/logout')

router.get('/', logoutGet)

module.exports = router
