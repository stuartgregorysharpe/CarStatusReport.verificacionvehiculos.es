const router = require('express').Router()
const { mailPost } = require('../controllers/mail')

router.post('/', mailPost)

module.exports = router
