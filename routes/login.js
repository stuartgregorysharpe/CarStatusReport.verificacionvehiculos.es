const router = require('express').Router()
const { loginGet, loginPost } = require('../controllers/login')

router.get('/', loginGet)
router.post('/', loginPost)

module.exports = router
